export default {
  name: 'behindTheCouch',
  title: 'Behind the Couch Q&A',
  type: 'document',
  fields: [
    {
      name: 'therapist',
      title: 'Therapist Name',
      type: 'reference',
      to: [{ type: 'therapist' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    }
  ],
  preview: {
    select: {
      title: 'therapist.name',
      subtitle: 'question',
    },
  },
};
