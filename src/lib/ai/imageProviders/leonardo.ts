/**
 * Leonardo AI Image Provider
 * 
 * Generates images via Leonardo AI API.
 * API docs: https://docs.leonardo.ai/reference/creategeneration
 */

const LEONARDO_BASE = "https://cloud.leonardo.ai/api/rest/v1";

export interface LeonardoGenParams {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  modelId?: string;
  numImages?: number;
  alchemy?: boolean;
  presetStyle?: string;
  seed?: number;
}

export interface LeonardoGenResult {
  generationId: string;
  status: string;
  images: Array<{
    id: string;
    url: string;
    width: number;
    height: number;
  }>;
}

function getApiKey(): string {
  const key = process.env.LEONARDO_API_KEY;
  if (!key) {
    throw new Error("LEONARDO_API_KEY environment variable is not set");
  }
  return key;
}

async function leonardoRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const apiKey = getApiKey();
  const url = `${LEONARDO_BASE}${endpoint}`;
  
  const res = await fetch(url, {
    ...options,
    headers: {
      "accept": "application/json",
      "authorization": `Bearer ${apiKey}`,
      "content-type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Leonardo API error ${res.status}: ${body}`);
  }

  return res.json();
}

/**
 * Create a new image generation
 */
export async function createGeneration(params: LeonardoGenParams): Promise<{ sdGenerationJob: { generationId: string } }> {
  const body: Record<string, unknown> = {
    prompt: params.prompt,
    width: params.width || 768,
    height: params.height || 1344,
    num_images: params.numImages || 1,
  };

  if (params.negativePrompt) body.negative_prompt = params.negativePrompt;
  if (params.modelId) body.modelId = params.modelId;
  if (params.alchemy !== undefined) body.alchemy = params.alchemy;
  if (params.presetStyle) body.presetStyle = params.presetStyle;
  if (params.seed) body.seed = params.seed;

  return leonardoRequest("/generations", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/**
 * Get generation status and results
 */
export async function getGeneration(generationId: string): Promise<{ generations_by_pk: { status: string; generated_images: Array<{ id: string; url: string; width: number; height: number }> } }> {
  return leonardoRequest(`/generations/${generationId}`);
}

/**
 * Generate an image and wait for completion
 */
export async function generateImage(params: LeonardoGenParams): Promise<LeonardoGenResult> {
  const { sdGenerationJob } = await createGeneration(params);
  const generationId = sdGenerationJob.generationId;
  
  console.log(`  Generation ID: ${generationId} (polling...)`);
  
  // Poll until complete
  const maxAttempts = 60;
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const { generations_by_pk } = await getGeneration(generationId);
    
    if (generations_by_pk.status === "COMPLETE") {
      console.log(`  ✓ Complete — ${generations_by_pk.generated_images.length} images`);
      
      return {
        generationId,
        status: "COMPLETE",
        images: generations_by_pk.generated_images.map(img => ({
          id: img.id,
          url: img.url,
          width: img.width,
          height: img.height,
        })),
      };
    }
    
    if (generations_by_pk.status === "FAILED") {
      throw new Error(`Generation ${generationId} failed`);
    }
    
    if (i % 5 === 0) {
      console.log(`  ... polling (${generations_by_pk.status})`);
    }
  }
  
  throw new Error(`Generation ${generationId} timed out`);
}
