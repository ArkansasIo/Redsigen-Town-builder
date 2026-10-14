# GitHub Pages deployment and 404 troubleshooting

## Expected project URL

https://arkansasio.github.io/Redsigen-Town-builder/

This is a Vite project site, so its production base path is configured in `vite.config.ts` as `/Redsigen-Town-builder/`.

## One-time repository setup

The Pages API returned `404 Not Found` because a Pages site had not been enabled. The repository Actions token also cannot create the site automatically (`Resource not accessible by integration`). A repository administrator must enable Pages once:

1. Open **Settings → Pages**: https://github.com/ArkansasIo/Redsigen-Town-builder/settings/pages
2. In **Build and deployment**, set **Source** to **GitHub Actions**.
3. Wait for the next successful run at https://github.com/ArkansasIo/Redsigen-Town-builder/actions

The workflow intentionally does not attempt to change repository settings because the Actions token lacks that permission.

## What the workflow validates

Every push to `main` and manual workflow run performs a TypeScript check, production build, and artifact checks for:

- `dist/index.html`
- `dist/404.html` (copied from the built index to support fallback routing)
- `dist/assets/`
- the expected repository base path in the generated HTML

The deploy job runs only after these checks pass.

## If the site still returns 404

- Confirm the URL includes the repository path: `/Redsigen-Town-builder/`.
- Confirm Pages source is **GitHub Actions**, not **Deploy from a branch**.
- Check the latest workflow run and make sure both **Type-check and build** and **Deploy to GitHub Pages** succeeded.
- After a successful deployment, hard-refresh the site or open it in a private window to avoid cached responses.
- If the domain root `https://arkansasio.github.io/` is returning 404, that is a different URL from this repository's project site.

## Warnings

A Node.js runtime deprecation warning emitted by a GitHub-maintained action is an action-runtime warning, not an application build failure. The workflow's own type-check/build steps must still pass; inspect the individual job logs for actual errors.
