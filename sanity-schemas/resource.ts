export default {
  name: 'resource',
  title: 'Resource & Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Blog Post', value: 'blog' },
          { title: 'Reflection Prompt', value: 'reflection' },
          { title: 'Worksheet / Guide', value: 'worksheet' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Target Category',
      type: 'string',
      options: {
        list: [
          { title: 'For Clients', value: 'for-clients' },
          { title: 'For Therapists', value: 'for-therapists' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'therapist' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Brief Summary',
      type: 'text',
      validation: (Rule: any) => Rule.required().max(180),
    },
    {
      name: 'content',
      title: 'Content Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'downloadFile',
      title: 'Downloadable File Attachment (e.g. PDF Worksheet)',
      type: 'file',
    },
    {
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    }
  ],
};
