#!/usr/bin/env python3
"""
Generate Lilo & Noa assets using Leonardo AI API.

Usage:
  python3 scripts/generate-leonardo-assets.py [--force]

Requires:
  LEONARDO_API_KEY environment variable

Assets generated:
  - public/assets/lilo-noa/home-background.png  (9:16 background)
  - public/assets/lilo-noa/logo.png             (sticker logo)
  - public/assets/lilo-noa/decorations.png       (decorative elements)
"""

import os, sys, time, json, argparse
import requests
from pathlib import Path

API_BASE = "https://cloud.leonardo.ai/api/rest/v1"
PROJECT_ROOT = Path(__file__).resolve().parent.parent
ASSETS_DIR = PROJECT_ROOT / "public" / "assets" / "lilo-noa"
POLL_INTERVAL = 3  # seconds
MAX_POLLS = 60

# ─── Asset definitions ─────────────────────────────────────────────

ASSETS = {
    "home-background": {
        "file": "home-background.png",
        "width": 768,
        "height": 1344,
        "alchemy": True,
        "presetStyle": "DYNAMIC",
        "prompt": (
            "Premium mobile educational game background for kids age 6-7, "
            "vertical 9:16 portrait, magical fantasy cartoon 3D style, "
            "bright soft blue sky with fluffy white cartoon clouds, "
            "pastel purple fairy-tale castle on distant green hills, "
            "rainbow path leading to castle, enchanted landscape, "
            "colorful large flowers in foreground, candy pieces scattered, "
            "sparkles and stars, soft warm sunlight, whimsical cheerful atmosphere, "
            "polished mobile game art, ultra detailed, vibrant saturated colors, "
            "clean composition with space in center and bottom for UI elements, "
            "no text, no logo, no UI buttons, no characters, no watermark"
        ),
        "negative_prompt": (
            "text, words, letters, logo, UI, buttons, menu, interface, "
            "character, mascot, person, people, watermark, blurry, low detail, "
            "photorealistic, realistic, dark mood, horror, gloomy, messy composition, "
            "cluttered center, bad composition, distorted perspective, flat, boring"
        ),
    },
    "logo": {
        "file": "logo.png",
        "width": 1024,
        "height": 512,
        "alchemy": True,
        "presetStyle": "DYNAMIC",
        "prompt": (
            "Playful premium mobile game logo reading 'Lilo & Noa', "
            "colorful rounded bubble letters, children educational app style, "
            "glossy 3D cartoon look, thick white outline, soft shadow, "
            "polished sticker style, bright cheerful colors, "
            "pink purple and blue gradient letters, cute golden stars around text, "
            "isolated on transparent background, centered, large and bold, "
            "no extra text, no watermark, no background scene"
        ),
        "negative_prompt": (
            "background scene, landscape, interface, phone screen, watermark, blurry, "
            "thin typography, realistic humans, dark colors, wrong text, misspelled, "
            "extra words, unreadable, small text, boring, flat design, minimalist"
        ),
    },
    "decorations": {
        "file": "decorations.png",
        "width": 1024,
        "height": 512,
        "alchemy": True,
        "presetStyle": "DYNAMIC",
        "prompt": (
            "Small collection of premium children mobile game decorative assets, "
            "cute golden stars, sparkles, colorful flowers, candy pieces, "
            "small clouds, magical dust, fantasy style, glossy cartoon 3D look, "
            "isolated elements spread across canvas on transparent background, "
            "polished, vibrant colors, no text, no logo, no UI, no watermark"
        ),
        "negative_prompt": (
            "text, logo, watermark, realistic, dark, blurry, messy, "
            "interface, buttons, characters, background scene, landscape"
        ),
    },
}


def get_api_key() -> str:
    key = os.environ.get("LEONARDO_API_KEY")
    if not key:
        print("ERROR: LEONARDO_API_KEY environment variable is not set")
        sys.exit(1)
    return key


def leonardo_post(endpoint: str, data: dict) -> dict:
    api_key = get_api_key()
    resp = requests.post(
        f"{API_BASE}{endpoint}",
        headers={
            "accept": "application/json",
            "authorization": f"Bearer {api_key}",
            "content-type": "application/json",
        },
        json=data,
        timeout=30,
    )
    if resp.status_code != 200:
        print(f"  ERROR {resp.status_code}: {resp.text[:500]}")
        resp.raise_for_status()
    return resp.json()


def leonardo_get(endpoint: str) -> dict:
    api_key = get_api_key()
    resp = requests.get(
        f"{API_BASE}{endpoint}",
        headers={
            "accept": "application/json",
            "authorization": f"Bearer {api_key}",
        },
        timeout=30,
    )
    if resp.status_code != 200:
        print(f"  ERROR {resp.status_code}: {resp.text[:500]}")
        resp.raise_for_status()
    return resp.json()


def generate_asset(name: str, config: dict, force: bool) -> bool:
    """Generate a single asset. Returns True on success."""
    filepath = ASSETS_DIR / config["file"]
    
    if filepath.exists() and not force:
        print(f"  ⏭  {config['file']} already exists (use --force to overwrite)")
        return True
    
    print(f"\n  ▶ Creating generation for {name}...")
    print(f"    Size: {config['width']}x{config['height']}")
    print(f"    Style: {config['presetStyle']}, Alchemy: {config['alchemy']}")
    
    body = {
        "prompt": config["prompt"],
        "negative_prompt": config.get("negative_prompt", ""),
        "width": config["width"],
        "height": config["height"],
        "num_images": 1,
        "alchemy": config.get("alchemy", False),
        "presetStyle": config.get("presetStyle", "DYNAMIC"),
    }
    
    try:
        result = leonardo_post("/generations", body)
        gen_id = result["sdGenerationJob"]["generationId"]
        print(f"    Generation ID: {gen_id}")
    except Exception as e:
        print(f"    ✗ Failed to create generation: {e}")
        return False
    
    # Poll for completion
    for attempt in range(MAX_POLLS):
        time.sleep(POLL_INTERVAL)
        try:
            gen = leonardo_get(f"/generations/{gen_id}")
            status = gen["generations_by_pk"]["status"]
            
            if status == "COMPLETE":
                images = gen["generations_by_pk"]["generated_images"]
                if not images:
                    print("    ✗ No images returned")
                    return False
                
                img_url = images[0]["url"]
                print(f"    ✓ Generation complete, downloading...")
                
                # Download
                img_resp = requests.get(img_url, timeout=60)
                img_resp.raise_for_status()
                
                ASSETS_DIR.mkdir(parents=True, exist_ok=True)
                filepath.write_bytes(img_resp.content)
                size_kb = len(img_resp.content) // 1024
                print(f"    ✓ Saved: {filepath} ({size_kb} KB)")
                return True
            
            if status == "FAILED":
                print(f"    ✗ Generation failed")
                return False
            
            if attempt % 5 == 0 and attempt > 0:
                print(f"    ... still {status} ({attempt * POLL_INTERVAL}s)")
                
        except Exception as e:
            print(f"    ✗ Error polling: {e}")
            return False
    
    print(f"    ✗ Timed out after {MAX_POLLS * POLL_INTERVAL}s")
    return False


def main():
    parser = argparse.ArgumentParser(description="Generate Lilo & Noa assets via Leonardo AI")
    parser.add_argument("--force", action="store_true", help="Overwrite existing assets")
    parser.add_argument("--asset", choices=list(ASSETS.keys()), help="Generate only a specific asset")
    args = parser.parse_args()
    
    print("=" * 60)
    print("  Lilo & Noa — Leonardo AI Asset Generator")
    print("=" * 60)
    print(f"  Assets dir: {ASSETS_DIR}")
    print(f"  API key: {'✓ set' if os.environ.get('LEONARDO_API_KEY') else '✗ MISSING'}")
    
    if args.asset:
        config = ASSETS[args.asset]
        print(f"\n  Generating: {args.asset}")
        success = generate_asset(args.asset, config, args.force)
        if not success:
            sys.exit(1)
    else:
        results = {}
        for name, config in ASSETS.items():
            print(f"\n{'─' * 50}")
            print(f"  Asset: {name}")
            print(f"{'─' * 50}")
            results[name] = generate_asset(name, config, args.force)
        
        print(f"\n{'=' * 60}")
        for name, ok in results.items():
            status = "✓" if ok else "✗"
            print(f"  {status}  {name}")
        
        failed = [n for n, ok in results.items() if not ok]
        if failed:
            print(f"\n  ✗ Failed: {', '.join(failed)}")
            sys.exit(1)
    
    print(f"\n✅ All assets generated in {ASSETS_DIR}")


if __name__ == "__main__":
    main()
