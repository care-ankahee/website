export default {
  name: 'therapist',
  title: 'Therapist Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pronouns',
      title: 'Pronouns',
      type: 'string',
      placeholder: 'e.g. she/her',
    },
    {
      name: 'role',
      title: 'Designation / Role',
      type: 'string',
      placeholder: 'e.g. Consultant Psychologist',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'headshot',
      title: 'Professional Headshot',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'experience',
      title: 'Years & Hours of Experience',
      type: 'string',
      placeholder: 'e.g. 3 years (3,000+ hours)',
    },
    {
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'ageGroups',
      title: 'Client Age Groups',
      type: 'string',
      placeholder: 'e.g. 18-55 years',
    },
    {
      name: 'formats',
      title: 'Session Formats & Durations',
      type: 'string',
      placeholder: 'e.g. Remote || 50 minutes || 60 minutes',
    },
    {
      name: 'shortBio',
      title: 'Short Bio (homepage)',
      type: 'text',
      validation: (Rule: any) => Rule.max(300),
    },
    {
      name: 'fullBio',
      title: 'Full Biography (paragraphs)',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'philosophy',
      title: 'Personal Therapeutic Philosophy',
      type: 'text',
    },
    {
      name: 'specialisations',
      title: 'Areas of Support / Specialisations',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'modalities',
      title: 'Therapeutic Modalities',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'fees',
      title: 'Session Fees',
      type: 'string',
      placeholder: 'e.g. 1500 INR for Professionals',
    },
    {
      name: 'availability',
      title: 'Availability Slots',
      type: 'string',
    },
    {
      name: 'bookingFlow',
      title: 'Preferred Booking Flow Description',
      type: 'string',
    },
    {
      name: 'bookingLinkText',
      title: 'CTA Booking Button Text',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Public Contact Email',
      type: 'string',
    }
  ],
};
