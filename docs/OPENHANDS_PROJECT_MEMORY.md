# Lilo & Noa — Mémoire Projet OpenHands

> **À LIRE EN PREMIER** par toute nouvelle conversation OpenHands.
> Faire un court résumé de ce qui a été compris, puis **attendre l'instruction
> de l'utilisateur** avant de modifier le code.

---

## 1. Nom du projet

**Lilo & Noa — Apprentissage Magique**

Application web éducative pour enfants de première année primaire (6–7 ans),
style jeu mobile premium.

---

## 2. Objectif de l'application

Créer une mini-application éducative complète avec :
- 5 écrans (Accueil, Mondes, Stages, Mini-jeu, Profil & Récompenses)
- De vrais mini-jeux jouables (lettres, chiffres, formes, mots)
- Progression sauvegardée en localStorage
- Système de récompenses (étoiles, bonbons, gemmes, badges, accessoires)
- Interface 100% en français

---

## 3. Style visuel recherché

Reproduction fidèle du modèle de référence :
- **Cartoon 3D** premium, jeu mobile éducatif
- **Très coloré**, saturé mais propre
- **Glossy** : highlights, reflets, dégradés
- **Boutons 3D** avec couche inférieure (box-shadow épaisse)
- **Logo sticker** multicolore avec contour blanc épais
- **Top bar** avec badge avatar + étoiles (gauche) et settings (droite)
- **Mascotte** Noa centrée, glow, ombre au sol
- **Frame mobile** 390×844px, border-radius 32px, bordure blanche, ombre externe
- **Fond violet foncé** autour du téléphone sur desktop
- **Aucun style corporate, aucun design plat, aucun template SaaS**

---

## 4. Référence visuelle à reproduire

URL de l'image de référence : `https://i.ibb.co/tTGj9ZWZ/kids-ui-quality-01.jpg`

Le modèle contient 4 écrans de téléphone côte à côte. **L'écran 1 (gauche)
est l'écran d'accueil à reproduire.**

Le modèle est une **SPEC VISUELLE STRICTE**, pas une inspiration vague.
Chaque élément doit être reproduit : position, couleur, style, proportions.

---

## 5. Ce qui a été essayé

| Approche | Résultat |
|---|---|
| Recraft V3/V4 pour générer des assets individuels (mascotte, icônes mondes) | OK pour les assets isolés, mais les images plein écran stretch ou contiennent du texte faux |
| Recraft pour générer un background complet | Style `Illustration` → paysages trop réalistes/photographiques |
| Recraft style `Child book` + `Kawaii` | Meilleur style mais images 1024×1024 → ratio carré → stretch |
| Leonardo AI pour générer le background | 3 tentatives : (1) trop chargé/party, (2) forêt/photo réaliste, (3) ENVIRONMENT style — résultat variable |
| Leonardo pour générer le logo | **ÉCHEC** : texte illisible, lettres fausses, inutilisable |
| CSS gradient seul comme background | Trop vide, pas assez de décor |
| CSS triangles pour arbres, cercles pour buissons | Style amateur, refusé |
| Logo CSS avec `WebkitTextStroke` + `paintOrder` | Fonctionne mais visuellement pas assez premium |
| Logo SVG avec `feMorphology` + `feMerge` | Meilleure approche, contour blanc propre |
| Plusieurs versions de boutons (plats → 3D) | Progression mais pas encore parfaits |

---

## 6. Ce qui ne marche PAS

1. **Recraft/Leonardo ne règlent pas le problème principal.**
   Le problème n'est pas le background, c'est l'interface UI entière.

2. **Les backgrounds générés au hasard empirent le rendu :**
   - Trop chargés (ballons, confettis, party)
   - Trop réalistes (photo de forêt)
   - Trop vides (dégradé seul)
   - Contiennent du faux texte ou des artefacts

3. **Le logo ne doit JAMAIS être généré par IA.**
   Leonardo produit du texte illisible, des lettres fausses, des artefacts.

4. **L'agent ne doit plus essayer de "sauver" le design avec des images.**
   La solution est dans le code React/CSS/SVG, pas dans les APIs d'images.

5. **Ne pas acheter ou ajouter une autre API d'images.**

---

## 7. Pourquoi Recraft/Leonardo ne doivent plus être utilisés pour le template

- **Leonardo** : utile UNIQUEMENT pour des illustrations de fond SANS TEXTE,
  et seulement après que l'UI est complètement terminée et validée.
- **Recraft** : utile UNIQUEMENT pour des assets individuels (mascotte,
  icônes de mondes) en ratio carré, PAS pour le template complet.
- **Aucune API ne doit générer l'interface ou le logo.**

---

## 8. Nouvelle stratégie validée

**Reconstruire l'écran d'accueil uniquement en React/CSS/SVG, sans
génération IA, composant par composant.**

1. Désactiver/supprimer les backgrounds Leonardo
2. Créer un fond CSS propre (ciel pastel, château SVG, prairie, nuages)
3. Construire chaque composant UI séparément et le comparer à la référence
4. N'utiliser Leonardo QUE pour le background final, APRÈS validation de l'UI

---

## 9. État actuel du design

**Ce qui est en place :**

| Composant | Fichier | État |
|---|---|---|
| PhoneFrame | `src/components/PhoneFrame.tsx` | 390×844, border-radius 32px, bordure blanche 6px, ombre |
| HomeScreen | `src/components/HomeScreen.tsx` | Fond CSS gradient + SVG château + nuages + fleurs |
| Logo | `src/components/LiloNoaLogo.tsx` (intégré dans HomeScreen) | SVG `feMorphology` pour contour blanc, couleurs par lettre |
| Top badge | Dans HomeScreen | Capsule blanche glossy, avatar orange, nom + étoiles |
| Settings btn | Dans HomeScreen | Cercle violet 52px, bordure blanche, glow |
| Mascotte | `/public/images/mascot.png` | Recraft Kawaii V2, 200px, glow + ombre au sol |
| Play btn | Dans HomeScreen | 280×72px, vert 4-stop gradient, boxShadow 3D |
| Bottom btns | Dans HomeScreen | 135×56px chacun, Profil jaune, Settings violet |
| GameScreen | `src/components/GameScreen.tsx` | Corrigé : utilise `getStageById(worldId, stageId)` |
| MiniGame | `src/components/MiniGame.tsx` | Mini-jeux fonctionnels (QCM, lettres, chiffres) |
| WorldsScreen | `src/components/WorldsScreen.tsx` | Fond CSS gradient lavande, cartes monde |
| StagesScreen | `src/components/StagesScreen.tsx` | Fond CSS thématique par monde, StageMap |
| ProfileScreen | `src/components/ProfileScreen.tsx` | Badges, accessoires, progression |

---

## 10. Problèmes précis à corriger

1. **Le logo SVG doit être plus premium** : lettres plus grosses, effet
   sticker plus marqué, meilleur positionnement
2. **Le bouton Jouer doit avoir un effet 3D plus fort** : couche inférieure
   plus visible, contraste plus marqué
3. **Les boutons Profil/Paramètres** : proportions à ajuster, style à
   rapprocher de la référence
4. **La mascotte** : vérifier qu'elle n'est ni trop grosse ni trop petite
   (cible : ~50% de la largeur du frame)
5. **Le background CSS** : vérifier que le château est visible, que la
   prairie est propre, pas de chaos visuel
6. **Vérifier chaque écran** : WorldsScreen, StagesScreen, MiniGame,
   ProfileScreen — s'assurer qu'ils fonctionnent sans erreur
7. **Faire un screenshot 390×844** et comparer section par section avec
   la référence

---

## 11. Règles strictes à respecter

- ❌ **Ne pas utiliser Leonardo maintenant.**
- ❌ **Ne pas générer de nouveau background IA.**
- ❌ **Ne pas utiliser de background photo réaliste.**
- ❌ **Ne pas utiliser de ballons/confettis/party dans le décor.**
- ❌ **Ne pas utiliser une image IA pour le logo ou le texte.**
- ❌ **Ne pas faire de boutons plats (pas de 3D = refusé).**
- ❌ **Ne pas ignorer la référence visuelle.**
- ❌ **Ne pas dire "c'est terminé" si ce n'est pas proche de la référence.**
- ✅ **Corriger composant par composant.**
- ✅ **Comparer avec la référence section par section.**
- ✅ **Prendre un screenshot 390×844 après chaque correction majeure.**
- ✅ **Faire un audit visuel avant de livrer.**

---

## 12. Prochaine mission exacte

1. **Arrêter toute utilisation de Leonardo pour l'instant.**
2. **Vérifier que le background CSS actuel est propre** (pas de forêt,
   pas de photo, pas de ballons).
3. **Auditer le logo** : est-il assez sticker ? Assez lisible ? Assez
   proche de la référence ?
4. **Auditer les boutons** : Play (3D assez fort ?), Profil, Paramètres.
5. **Auditer le badge top-left** : proportions, style glossy.
6. **Auditer le bouton settings top-right** : cercle, bordure, ombre.
7. **Auditer la mascotte** : taille, position, glow, ombre.
8. **Prendre un screenshot 390×844.**
9. **Faire un audit section par section** (note /10 par section).
10. **Corriger les sections sous 8/10.**
11. **Ne passer à l'écran Mondes/Stages/etc. qu'après validation
    de l'écran d'accueil.**

---

## 13. Commandes utiles

```bash
# Lancer le projet
cd /workspace/project/education-app
npm run dev
# → http://localhost:8011 (port 8011) ou http://localhost:43919

# Build de production
npm run build

# Générer les assets Leonardo (SEULEMENT si l'UI est validée)
LEONARDO_API_KEY=xxx python3 scripts/generate-leonardo-assets.py

# Tests
npm run lint
```

---

## 14. Fichiers importants du projet

```
/workspace/project/education-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout racine (fond violet, centrage)
│   │   ├── page.tsx            # Point d'entrée, rendu conditionnel par écran
│   │   └── globals.css         # Styles globaux, classes phone-frame, animations
│   ├── components/
│   │   ├── PhoneFrame.tsx      # Frame mobile 390×844
│   │   ├── HomeScreen.tsx      # Écran d'accueil (fond CSS + tous les composants)
│   │   ├── LiloNoaLogo.tsx     # Logo SVG sticker (importé par HomeScreen)
│   │   ├── WorldsScreen.tsx    # Écran des mondes
│   │   ├── WorldCard.tsx       # Carte monde (image + overlay + progrès)
│   │   ├── StagesScreen.tsx    # Écran des stages
│   │   ├── StageMap.tsx        # Chemin de progression des stages
│   │   ├── GameScreen.tsx      # Wrapper mini-jeu (lookup stage → MiniGame)
│   │   ├── MiniGame.tsx        # Mini-jeu jouable (QCM)
│   │   ├── ProfileScreen.tsx   # Profil, badges, accessoires
│   │   ├── Modal.tsx           # Modale générique
│   │   ├── SettingsModal.tsx   # Modale paramètres
│   │   ├── BottomNav.tsx       # Barre de navigation basse
│   │   ├── StarCounter.tsx     # Compteurs étoiles/bonbons/gemmes
│   │   ├── ProgressBar.tsx     # Barre de progression
│   │   └── Mascot.tsx          # Mascotte CSS (fallback, pas utilisée actuellement)
│   ├── data/
│   │   ├── worlds.ts           # Données : mondes, stages, types
│   │   ├── questions.ts        # Banque de questions pour les mini-jeux
│   │   └── rewards.ts          # Badges, accessoires, récompenses
│   └── lib/
│       ├── GameContext.tsx      # Contexte React : profil, progression, navigation
│       └── ai/
│           └── imageProviders/
│               └── leonardo.ts # Provider Leonardo (non utilisé actuellement)
├── public/
│   ├── images/
│   │   ├── mascot.png          # Mascotte Noa (Recraft Kawaii V2, fond transparent)
│   │   ├── world-forest.png    # Miniature monde Forêt (Recraft Child book)
│   │   ├── world-city.png      # Miniature monde Ville
│   │   ├── world-island.png    # Miniature monde Île
│   │   └── world-space.png     # Miniature monde Espace
│   └── assets/
│       └── lilo-noa/
│           └── home-background.png  # Dernier background Leonardo (À NE PAS UTILISER)
├── scripts/
│   └── generate-leonardo-assets.py  # Script de génération Leonardo
├── docs/
│   └── OPENHANDS_PROJECT_MEMORY.md  # Ce fichier
├── package.json
├── tailwind.config.js
└── .env.local                  # LEONARDO_API_KEY (si présent)
```

---

## 15. Critères d'acceptation

L'écran d'accueil est accepté seulement si :

1. **Frame mobile** : 390×844px, border-radius 32px, bordure blanche 6px,
   ombre externe, centré sur fond violet foncé, aucun scroll horizontal.
2. **Background** : pas de photo, pas de forêt réaliste, pas de ballons.
   Ciel pastel + château SVG + prairie + nuages propres.
3. **Logo** : SVG lisible, lettres colorées, contour blanc épais, style
   sticker, étoiles autour, position y≈13%.
4. **Badge top-left** : capsule blanche glossy, avatar orange, nom + étoiles,
   ombre, bordure blanche.
5. **Settings top-right** : cercle violet 52px, bordure blanche, glow.
6. **Mascotte** : ~200px (51% du frame), centrée, glow + ombre au sol,
   pas trop grosse ni trop petite.
7. **Bouton Jouer** : 280×72px, vert 4-stop gradient, boxShadow 3D
   (0 7px 0 #388E3C), bordure blanche, icône play + texte.
8. **Boutons bas** : 135×56px chacun, Profil jaune, Settings violet,
   bordures blanches, ombres 3D.
9. **Similarité globale avec la référence** : note ≥ 8/10.
10. **Aucun crash** : tous les boutons fonctionnent, navigation OK,
    pas d'erreur console.

---

## Instruction pour la prochaine conversation OpenHands

> Quand une nouvelle conversation OpenHands démarre, **commence par lire
> ce fichier** : `docs/OPENHANDS_PROJECT_MEMORY.md`
>
> Ensuite, fais un **court résumé** de ce que tu as compris, puis **attends
> l'instruction de l'utilisateur** avant de modifier le code.
>
> Ne commence pas à générer des images ou à modifier l'UI sans validation
> explicite de l'utilisateur.
