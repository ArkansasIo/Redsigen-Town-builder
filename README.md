# Redsigen Town Builder

A browser-based isometric town-building studio built with React, TypeScript, and Vite. The studio includes a dimetric canvas, tile palette, starter presets, category filters, zoom and pan controls, undo, animation toggle, and PNG snapshot tools.

## Requirements

- Node.js 22 or newer (or a compatible Bun installation)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (the project defaults to port `3000`).

## Validate and build

```bash
npm run lint
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow that installs dependencies, checks TypeScript, builds the site, and publishes `dist/` to GitHub Pages whenever code is pushed to `main`. It can also be run manually from the Actions tab.

In GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The first deployment may require a repository administrator to approve Pages permissions. The Vite base path is configured for the repository name so the app works at `https://arkansasio.github.io/Redsigen-Town-builder/`.

## Project layout

```text
index.html             HTML entry point and page metadata
index.css              Global stylesheet entry point
src/
  App.tsx               Studio interface shell
  main.tsx              React mount point
  studioEngine.js       Isometric canvas and tile engine
  styles.css            Studio and responsive styling
  vite-env.d.ts         Vite environment types
vite.config.ts          Vite and GitHub Pages base configuration
.github/workflows/
  pages.yml             Build and Pages deployment
```

## Editor controls

- Select a tile from the palette, then click the canvas to paint.
- Use the starter presets to quickly change the scene.
- Use the category buttons to filter the tile palette.
- Use **Space + drag** to pan and the mouse wheel to zoom.
- Use **Undo** to reverse the last editing action, **Center view** to recenter, and **Snapshot PNG** to export an image.

Keyboard and interaction details may vary with the selected input device and the current build.

## Troubleshooting

- **Pages shows a 404:** ensure Pages source is set to **GitHub Actions** and inspect the latest workflow run.
- **Blank screen:** check the browser console and verify that the deployment workflow completed successfully.
- **Port 3000 is occupied:** stop the other process or use `npm run dev -- --port 3001`.
- **TypeScript errors:** run `npm run lint` locally before pushing.

## License

No license is currently declared. Add a `LICENSE` file before redistributing the project if you intend to grant others reuse rights.
