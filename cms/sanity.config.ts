import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Bosacks',

  projectId: 'fcyjcwi3',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (prev) => {
      return prev.filter((p) => !['configuration', 'homePage'].includes(p.id))
    },
  },
})
