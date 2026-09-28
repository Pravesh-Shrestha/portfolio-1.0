// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // update this to your real domain before deploying
  site: 'https://probs.dev',
  // no Astro dev toolbar / "made with Astro" badge in dev
  devToolbar: { enabled: false },
  // internal links get prefetched on hover for near-instant navigation
  prefetch: { prefetchAll: true },
  build: {
    inlineStylesheets: 'auto',
    // bundle under /assets instead of the default /_astro, so the framework
    // name never shows up in the page source
    assets: 'assets',
  },
});
