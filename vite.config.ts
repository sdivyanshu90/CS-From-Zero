import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre' as const,
      ...mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
        providerImportSource: '@mdx-js/react',
      }),
    },
    react({ include: /\.(tsx|ts|jsx|js)$/ }),
  ],
})
