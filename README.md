# Kpoptcha

A K-pop themed alternative to traditional CAPTCHA. Instead of selecting traffic lights or crosswalks, users identify K-pop idols to verify they are human.

## Overview
Kpoptcha generates a grid of random images featuring different idols (Lisa, Wonyoung, Nayeon, Karina). The task is to select all images of the target idol to pass the challenge.

## Features
- Infinite gameplay with newly generated grids each round  
- AI assistance powered by a custom Google Teachable Machine model  
- Score tracking based on streaks  
- Responsive design for both desktop and mobile  
- Images stored locally for fast loading

## Tech Stack
| Layer            | Technology |
|------------------|------------|
| Framework        | React + TypeScript + Vite |
| Styling          | Tailwind CSS |
| AI / ML          | TensorFlow.js + Teachable Machine |
| Icons            | Lucide React |
| Hosting          | GitHub Pages |

## Run Locally
```bash
git clone https://github.com/DSCmatter/kpoptcha.git
cd kpoptcha
npm install
npm run dev
```

## About 
The AI hint system uses a Teachable Machine model trained on images of specific idols.
If the model detects the target idol in an image, the image is highlighted with a cyan border.
Accuracy may vary based on pose, lighting, or whether the model was trained on similar image types.

## Adding New Idols

Create a folder in public/images/<idol_name>/
Add 5–10 JPEG images
Update src/data/idols.ts to include the new idol

## Credits

Built by DSCmatter

^_^