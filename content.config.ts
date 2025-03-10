import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    contentData: defineCollection({
      type: 'data',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
      }),
    })
  }
})
