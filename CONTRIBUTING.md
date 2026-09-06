# Lumina Website Contributing Guide

Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Content Guidelines](#content-guidelines)

## Development Setup

You will need [Node.js](http://nodejs.org) **version 20+**, and [pnpm](https://pnpm.io/installation) **version 8+**.

After cloning the repository, go to the `/website` folder and run:

```bash
# Installs any dependencies needed.
$ pnpm install
```

To run the project now, run:

```bash
# This command starts a local server you can access and edit live.
$ pnpm dev
```

### Commonly used PNPM scripts

```bash
# This command will generate a static site inside a dist directory in your project.
$ pnpm build

# Run this command to preview the built files in a local server.
$ pnpm preview
```

**Please make sure to have `pnpm test` pass successfully before submitting a PR.** Although the same tests will be run against your PR on the CI server, it is better to have it working locally.

It is also recommended you lint your files before the PR:

```bash
# Runs ESLint, markdownlint, and Stylelint.
$ pnpm lint

# Automatically fixes any issues it can.
$ pnpm lint:fix
```

## Project Structure

- **`website`**: contains all the website related files.
  - **`src`**: contains all the markdown files used for the website.
    - **`.vitepress`**:
      - **`config`**: main configuration files for VitePress (nav, sidebar, head, etc.).
      - **`theme`**: contains custom theme files and components.
    - **`public`**: files to be exposed publicly without any processing.
  - **`package.json`**: contains information about which plugins are installed in the project.
  - **`dist`**: contains built files for distribution.
    Note this directory is only updated when a release happens or when you run the build command.
    Changes to this folder will not carry over with Git.

## Content Guidelines

### Adding or editing documentation

- Content lives as Markdown under `website/src/docs` (guides) and `website/src/docs/faq` (FAQ).
- Keep pages focused and link between related guides instead of repeating content.
- When adding a new page, register it in the sidebar at `website/src/.vitepress/config/navigation/sidebar.ts`.
- Follow the existing voice: short, practical, and written for users of the Lumina desktop app.
- Verify facts against the current version of the app and the [Lumina repository](https://github.com/lumina-tl/lumina) — the app changes often.
- Do not reference specific version numbers in prose; pull live data from the GitHub release API instead (see how `/downloads/` and `/changelogs/` work).

### Screenshots and images

- Capture screenshots of the Lumina app itself (Windows).
- Prefer `.webp` for photos and screenshots to keep page weight down.
- Use descriptive, lowercase filenames and reference them from the site's `public/` folder.
- Resize screenshots so they are no wider than needed for the layout (a width of 1280px is a good maximum, usually smaller).

### Release and download data

The site fetches the latest release and the full changelog live from the
`lumina-tl/lumina` GitHub repository at build and dev time:

- `website/src/.vitepress/theme/data/release.data.ts` — latest release (drives the download buttons and the version shown in the navigation).
- `website/src/.vitepress/theme/data/changelogs.data.ts` — full release history for `/changelogs/`.

If the GitHub API rate limit is reached during development, set a
`GITHUB_TOKEN` environment variable — Octokit picks it up automatically.

## Credits

Thank you to all the people who have already contributed!
