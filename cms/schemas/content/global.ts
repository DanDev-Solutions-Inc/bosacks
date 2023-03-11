import {TbSettings} from 'react-icons/tb'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'global',
  title: 'Global',
  type: 'document',
  groups: [
    {
      name: 'avatar',
      title: 'Avatar',
      icon: TbSettings,
      default: true,
    },
    {
      name: 'socials',
      title: 'Socials',
      icon: TbSettings,
      default: false,
    },
    {
      name: 'subscribe',
      title: 'Subscribe',
      icon: TbSettings,
      default: false,
    },
    {
      name: 'footer',
      title: 'Footer',
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
      group: 'avatar',
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
      group: 'avatar',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
      group: 'avatar',
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
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'blockContent',
      group: 'footer',
    }),
    defineField({
      name: 'subscribeLink',
      title: 'Subscribe Link',
      type: 'url',
      group: 'subscribe',
    }),
  ],
})
