# Taras Smaliukh — CV Landing Page

Personal brand landing page. Pure HTML/CSS/JS, no build step required.

## Run locally

Just open the file in any browser:

```
D:/Dev/cv-site/index.html
```

Or via terminal:
```bash
# Windows
start index.html

# Mac/Linux
open index.html
```

No server, no npm install, no dependencies.

## Deploy to GitHub Pages

1. Create a GitHub repo (e.g. `cv-site` or `taras732.github.io`)
2. Push the files:

```bash
cd D:/Dev/cv-site
git init
git add index.html style.css script.js
git commit -m "init: cv landing page"
git remote add origin https://github.com/Taras732/cv-site.git
git push -u origin main
```

3. Go to repo **Settings → Pages → Source: main branch, / (root)**
4. Site will be live at `https://taras732.github.io/cv-site/`

## Update content

All content is in `index.html`. Key sections:

| Section   | What to edit                        |
|-----------|-------------------------------------|
| Hero      | Title, subtitle, stats              |
| Services  | Service cards (6 items)             |
| Cases     | `data-n="01"` … `data-n="04"`      |
| Timeline  | `.timeline__item` blocks            |
| Tools     | `.tool-group` blocks                |
| Contact   | Email, LinkedIn, Upwork links       |

## Files

```
index.html   ← all content
style.css    ← all styles
script.js    ← animations, timeline toggle, nav
```
