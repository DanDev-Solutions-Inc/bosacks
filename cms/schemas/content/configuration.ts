import {TbSettings} from 'react-icons/tb'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'configuration',
  title: 'Configuration',
  type: 'document',
  groups: [
    {
      name: 'global',
      title: 'Global',
      icon: TbSettings,
      default: true,
    },
    {
      name: 'socials',
      title: 'Socials',
      icon: TbSettings,
      default: false,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      group: 'global',
    }),
    defineField({
      name: 'avatarImage',
      title: 'Avatar Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
      validation: (Rule) => Rule.required(),
      group: 'global',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter',
      type: 'url',
      group: 'socials',
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn',
      type: 'url',
      group: 'socials',
    }),
  ],
})
