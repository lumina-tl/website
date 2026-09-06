<h1 align="center">Lumina Website</h1>
<h3 align="center">Illuminate every story</h3>
<p align="center">Documentation website for <a href="https://github.com/lumina-tl/lumina">Lumina</a> — a free, open-source desktop app for translating manga, manhwa, and manhua.</p>

<p align="center">
	Built with <a href="https://vitepress.dev">VitePress</a>
	<br>
	<br>
</p>

## Development

```sh
cd website
pnpm install
pnpm dev      # start the dev server
pnpm build    # production build (outputs to website/dist)
pnpm preview  # preview the production build
```

The site fetches release data (latest release and full changelog) from the
`lumina-tl/lumina` GitHub repository at build/dev time, so an internet
connection is required for those pages.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

- [Code of conduct](./CODE_OF_CONDUCT.md)
- [Contributing guide](./CONTRIBUTING.md)

## License

The content and code in this repository is a fork of the
[Tachiyomi website](https://github.com/tachiyomiorg/website), which was
released under the Mozilla Public License 2.0.

```
Copyright © 2023 The Tachiyomi Open Source Project
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
```

The **Lumina application** itself is licensed separately under the MIT License
— see [the Lumina repository](https://github.com/lumina-tl/lumina).
