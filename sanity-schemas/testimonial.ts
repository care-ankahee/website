export default {
  name: 'testimonial',
  title: 'Client Testimonial',
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
      name: 'clientAge',
      title: 'Client Age',
      type: 'number',
    },
    {
      name: 'clientGender',
      title: 'Client Gender Identity',
      type: 'string',
      placeholder: 'e.g. Female, Male, Non-Binary',
    },
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    }
  ],
  preview: {
    select: {
      title: 'therapist.name',
      subtitle: 'quote',
    },
  },
};
