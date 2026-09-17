# Josh Raja Portfolio

A responsive personal portfolio built with React and Vite. Its layout and visual language follow [Gazi V2](https://github.com/gazijarin/Gazi-V2) by Gazi Jarin. The implementation and particle illustration were rebuilt for Josh, with the original author's biography, work, and images removed.

**Live site:** https://joshraja.vercel.app/

## Local development

```sh
npm ci
npm run dev
```

Run `npm run lint` and `npm run build` before publishing. Vercel imports this repository as a Vite project with `npm run build` and `dist` as the output directory. Pushes to `main` deploy automatically.

## Updating the portfolio

Profile, experience, and project content lives in `src/portfolioData.js`. It is based on Josh's supplied resume and public project repositories. The portrait in `public/profile.jpg` was supplied by Josh. Update that data file as experience or projects change.

The design uses no proprietary images or content from the original portfolio.
