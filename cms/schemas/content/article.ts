import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  orderings: [
    {
      title: 'Published Date (Desc)',
      name: 'publishedDateDesc',
      by: [{field: 'publishedDate', direction: 'desc'}],
    },
    {
      title: 'Published Date (Asc)',
      name: 'publishedDateAsc',
      by: [{field: 'publishedDate', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
    },
    prepare(selection) {
      const {title, category} = selection
      return {
        title,
        subtitle: `${category}`,
      }
    },
  },
})
