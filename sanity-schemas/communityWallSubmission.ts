const communityWallSubmission = {
  name: 'communityWallSubmission',
  title: 'Community Wall Submission',
  type: 'document',
  fields: [
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'isAnonymous',
      title: 'Anonymous',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      hidden: ({ document }: { document?: { isAnonymous?: boolean } }) => document?.isAnonymous !== false,
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      hidden: ({ document }: { document?: { isAnonymous?: boolean } }) => document?.isAnonymous !== false,
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'pending',
    },
  ],
  preview: {
    select: {
      title: 'message',
      subtitle: 'status',
    },
  },
};

export default communityWallSubmission;
