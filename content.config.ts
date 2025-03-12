import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    contentData: defineCollection({
      type: 'data',
      source: 'data/**/*.md',
      schema: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        subtitle: z.string(),
        body: z.object({
          type: z.string(),
          children: z.any(),
          toc: z.any(),
        }),
      }),
    }),
    contenJData: defineCollection({
      type: 'data',
      source: 'data/**/*.json',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        subtitle: z.string(),
      }),
    })
  }
})
