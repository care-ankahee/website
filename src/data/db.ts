export interface Therapist {
  slug: string;
  name: string;
  pronouns: string;
  role: string;
  headshot: string;
  qualifications: string[];
  certifications: string[];
  experience: string;
  specialisations: string[];
  modalities: string[];
  ageGroups: string;
  formats: string;
  languages: string[];
  shortBio: string;
  fullBio: string[];
  philosophy: string;
  services: string[];
  availability: string;
  email: string;
  fees: string;
  bookingFlow: string;
  bookingLinkText: string;
}

export interface Testimonial {
  therapistSlug: string;
  age: number;
  gender: string;
  text: string;
}

export interface BehindTheCouchQA {
  therapistSlug: string;
  question: string;
  answer: string;
}

export interface Resource {
  slug: string;
  title: string;
  type: 'blog' | 'reflection' | 'worksheet';
  category: 'for-therapists' | 'for-clients';
  authorSlug: string;
  summary: string;
  content: string[];
  publishedAt: string;
  downloadUrl?: string;
}

export const therapists: Therapist[] = [
  {
    slug: 'reetika-shah',
    name: 'Reetika Shah',
    pronouns: 'she/her',
    role: 'Consultant Psychologist',
    headshot: '/reetika-headshot.jpg',
    qualifications: ['Counselling Psychologist', 'Christ (Deemed to be University)'],
    certifications: [
      'Internal Family Systems, PESI',
      'Complex Trauma Training, PESI',
      'Mindfulness Training, InnerSpace'
    ],
    experience: '3 years (1,500+ hours of client work)',
    specialisations: [
      'Anxiety', 'Depression', 'Grief/Loss', 'Single parenting and couple parenting',
      'ADHD', 'Adverse Childhood/Adulthood Experiences', 'Relationships & Attachment Wounds',
      'Setting Boundaries', 'Academic Stress & Life Transitions', 'Self-Esteem & Body Image Concerns',
      'Emotional Regulation', 'Self Exploration', 'Trauma'
    ],
    modalities: [
      'Internal Family Systems (IFS)',
      'Cognitive Behaviour Therapy (CBT)',
      'Dialectical Behaviour Therapy (DBT)',
      'Grief Therapy',
      'Trauma-Informed Approach'
    ],
    ageGroups: '18-55 years',
    formats: 'Remote || 50 minutes || 90 minutes',
    languages: ['English', 'Hindi', 'Nepali', 'Marwadi'],
    shortBio: 'Reetika is a counsellor and psychotherapist working from an Internal Family Systems (IFS) lens, alongside DBT, ACT, and attachment-based, trauma-informed care. Through her practice at Ankahee, she works with individuals navigating anxiety, grief, trauma, and self-esteem, with particular attention to experiences shaped by Indian family and cultural dynamics. Her approach centers on helping clients understand the different "parts" of themselves and their protective function with curiosity instead of judgment, so that self-knowledge becomes a source of calm rather than overwhelm.',
    fullBio: [
      'Reetika is a counsellor and psychotherapist with over 1,500 hours of clinical experience. Her therapeutic work is rooted in Internal Family Systems (IFS), which she integrates with DBT, ACT, and attachment theory to offer a trauma-informed, parts-based approach to healing.',
      'Central to Reetika\'s work is the belief that no one is "just" their anxiety, their anger, or their avoidance. Rather, these are parts of a person, each carrying its own history and its own protective purpose. Rather than trying to eliminate or fix these parts, Reetika helps clients build an internal relationship with them: understanding what each part is trying to do, and why.',
      'She works primarily with young adults and adults navigating anxiety, depression, grief, trauma, attachment wounds, and self-esteem struggles, often within the specific texture of Indian family and cultural life. Additionally, themes like blurred boundaries, exam pressure, arranged marriage, and grief that isn\'t always given space to be spoken are given space in her therapy room. She brings both psychological depth and cultural fluency to working through them.',
      'Reetika believes information is power: the more clearly a person can see and understand their own inner world like its parts, its patterns, its protectors, the less overwhelming that world becomes. Her work is about turning confusion into clarity, and clarity into choice.'
    ],
    philosophy: 'Cycles exists because they are excruciating to break. It takes an astronomical amount of pain and courage to disrupt a familiar pattern. Sometimes it seems easier to keep running in the same familiar circles rather than facing the fear of jumping and possibly not landing on your feet.',
    services: ['Individual Therapy', 'Couples Therapy'],
    availability: 'Weekdays and Weekends (12 - 8 pm)',
    email: 'reetikashah@ankahee.in',
    fees: '1200 INR for Students || 1500 INR for Professionals || Sliding scale/Discounts available on inquiry',
    bookingFlow: 'WhatsApp/Email -> Consent Form -> Booking Link',
    bookingLinkText: 'Book via WhatsApp or Email'
  },
  {
    slug: 'manvi-jain',
    name: 'Manvi Jain',
    pronouns: 'she/her',
    role: 'Counselling Psychologist',
    headshot: '/manvi-avatar.jpg',
    qualifications: ['M.Sc. Counselling Psychology', 'Christ (Deemed to be University), Bengaluru'],
    certifications: [
      'Cognitive Analytic Therapy (CAT) Practitioner-informed',
      'Emotionally Focused Individual Therapy (EFIT)-informed',
      'Trauma-informed relational practice'
    ],
    experience: '2 years (1,500+ hours of client work)',
    specialisations: [
      'Anxiety', 'Depression', 'Stress and Burnout', 'Trauma', 'Grief and Loss',
      'Relationship concerns', 'Attachment and relational patterns', 'Self-esteem and identity',
      'Emotional regulation', 'Family dynamics', 'Life transitions', 'Perfectionism',
      'People-pleasing', 'Workplace concerns', 'Self-exploration'
    ],
    modalities: [
      'Cognitive Analytic Therapy (CAT)',
      'Emotionally Focused Individual Therapy (EFIT)',
      'Dialectical Behaviour Therapy (DBT)',
      'Trauma-Informed Relational Practice'
    ],
    ageGroups: '18-55 years',
    formats: 'Remote || 45 minutes || 90 minutes',
    languages: ['English', 'Hindi'],
    shortBio: 'Manvi believes that everyone deserves care, regardless of how big, small, visible, or difficult their struggles may seem. She believes people grow when they have the support, safety, and relationships that allow them to understand themselves with greater kindness, and that it is worth asking what made a pattern necessary before asking someone to change it. With 1,500+ hours of psychotherapy experience across digital mental health, private practice, EAP, and university settings, she works with adolescents, young adults, and adults.',
    fullBio: [
      'Manvi is a Counselling Psychologist and co-founder of Ankahee. She believes that everyone deserves care, regardless of how big, small, visible, or difficult their struggles may seem. Her work is rooted in the belief that people grow when they have the support, relationships, and space to understand themselves, and that it is worth asking what made a pattern necessary before asking someone to change it.',
      'With 1,500+ hours of individual psychotherapy experience, Manvi has worked across digital mental health, private practice, Employee Assistance Programmes, and university settings. She has supported adolescents, young adults, and adults navigating anxiety, depression, relationship difficulties, grief, identity exploration, emotional regulation, academic and workplace stress, trauma, and life transitions. She has also facilitated workshops and group spaces focused on mental health awareness, emotional wellbeing, academic stress, and emotional regulation.',
      'Her therapeutic work is relational, trauma-informed, and integrative, drawing from Cognitive Analytic Therapy (CAT), Emotionally Focused Individual Therapy (EFIT), DBT, and other approaches depending on what a person brings to therapy. She is particularly interested in understanding recurring interpersonal patterns and how past experiences continue to shape the present.',
      'At the heart of her work is a simple question: "What might make more sense when we understand the story behind it?"'
    ],
    philosophy: 'What matters isn’t if people are good or bad. What matters is if they’re trying to be better today than they were yesterday. You asked me where my hope comes from? That’s my answer. People improve when they get external love and support. How can we hold it against them when they don’t? — The Good Place',
    services: ['Individual Therapy', 'Employee Assistance Programmes (EAP)', 'Workshops & Trainings'],
    availability: 'On Enquiry',
    email: 'manvijain@ankahee.in',
    fees: '1200 - 1500 INR (Session packages and sliding scale available)',
    bookingFlow: 'WhatsApp/Email --> Booking Form --> Google Calendar',
    bookingLinkText: 'Inquire via WhatsApp'
  }
];

export const testimonials: Testimonial[] = [
  {
    therapistSlug: 'reetika-code',
    age: 26,
    gender: 'Female',
    text: 'Therapy started off for me because I was overwhelmed by my habits, my thinking, and constant procrastination. Reetika really understood me and helped me make sense of myself, how to make my life feel good and sustainable. When I started, I was in tears every other day. Now I feel like a weight has been lifted, and my life has genuinely gotten better.'
  },
  {
    therapistSlug: 'reetika-code',
    age: 23,
    gender: 'Female',
    text: 'I started therapy to deal with grief and wanting a better understanding of myself and the people around me. My experience was great. I\'ve walked away more mindful and more aware. I\'d tell anyone considering it: everyone needs therapy.'
  },
  {
    therapistSlug: 'reetika-code',
    age: 31,
    gender: 'Female',
    text: 'I came to Reetika dealing with brain fog, confusion, and a deep sense of loneliness. What I appreciate most about her is that she holds space without judgment and she never pushes advice, she helps you navigate toward what you actually feel. In just a handful of sessions, I\'ve already noticed myself becoming more compassionate toward myself. I\'ve worked with a few therapists before and often felt judged rather than held and Reetika is the first one who\'s given me exactly the space I needed.'
  },
  {
    therapistSlug: 'reetika-code',
    age: 24,
    gender: 'Female',
    text: 'When I started therapy, I felt hopeless and completely lost about what was actually wrong. It was life-changing, and I\'m not exaggerating. Reetika is the best therapist I could have asked for; her sincerity gives you real hope that things will get better, and you can tell she genuinely cares about her clients as people, not just patients. Two years in, I feel like a different person. She\'s taught me how to be kinder to myself, and I now have the strength to handle hard things without turning that anger inward. Therapy takes patience and trust in the process, but with the right therapist, it becomes bearable, and sometimes even fun.'
  },
  {
    therapistSlug: 'manvi-code',
    age: 31,
    gender: 'Non-Binary',
    text: 'Therapy sessions with Manvi have helped me develop a much better understanding of myself and learn to navigate various complexities around my mental health. As someone who had been constantly struggling with anxiety, depression, trauma, and neurodivergence, I’ve become so much better at identifying and communicating my needs. I’m able to navigate situations with better emotional regulation and healthier coping mechanisms. One of the biggest milestones has been being able to reduce my medication after three years of being on it consistently. After just a year of working with Manvi, I’ve shifted from seeing my neurodivergence primarily as a challenge to understanding it as an important part of who I am. She is warm, calm, non-judgmental, and deeply personalized in her approach.'
  },
  {
    therapistSlug: 'manvi-code',
    age: 32,
    gender: 'Male',
    text: 'It has been over six months since I started taking therapy sessions with Manvi, and it has been a great experience. When I first started, I felt I had a range of issues to work on, but I could never figure out which one I needed to address as a priority. Through the early sessions, I gradually realised that most of them boiled down to one core problem. Like a true therapist, Manvi never simply tells you what the problem is. She helps you untangle the knots yourself and arrive at that moment of self-realisation. One of the most significant aspects of these sessions has been that Manvi never makes you feel alone.'
  },
  {
    therapistSlug: 'manvi-code',
    age: 24,
    gender: 'Male',
    text: 'I have had a wonderful experience working with Manvi over the better part of a year now. She has been really helpful in my journey of understanding myself and coping with my issues with ADHD and anxiety. She has had a major role to play in facilitating the comprehension of my own positive and negative tendencies, interpersonal behavior and how I cope with trauma. But more than any of that, Manvi has had a huge role in helping me redevelop my sense of compassion, both towards myself and others.'
  },
  {
    therapistSlug: 'manvi-code',
    age: 17,
    gender: 'Female',
    text: 'It has been very nice working with you. I feel like I can share openly with you, and you’re a really gentle person, who never forced me to do anything against my will and made me feel comfortable always. I would definitely recommend you to others.'
  },
  {
    therapistSlug: 'manvi-code',
    age: 29,
    gender: 'Female',
    text: 'Working with you has been incredibly impactful. It has given me practical tools for emotion regulation, which has helped me a great deal in my daily life. Through our sessions, I have been able to discover my specific triggers and learn how to navigate difficult situations with calm and composure. I am deeply grateful for this growth.'
  },
  {
    therapistSlug: 'manvi-code',
    age: 33,
    gender: 'Female',
    text: 'Working with Manvi has helped me understand the difference between my thoughts and my feelings, and how often the two can get intertwined. She has a very thorough understanding of her concepts and, more importantly, explains them with a lot of patience and relatable examples. One of the biggest things I have taken away from our sessions is learning to question my own mindset — to pause, ask myself why I think or feel a certain way. Overall, therapy with Manvi has helped me become more aware of my thoughts, kinder towards myself, and more open to looking at things from different perspectives.'
  }
];

// Helper to map slugs in data
testimonials.forEach(t => {
  if (t.therapistSlug === 'reetika-code') t.therapistSlug = 'reetika-shah';
  if (t.therapistSlug === 'manvi-code') t.therapistSlug = 'manvi-jain';
});

export const behindTheCouchQAs: BehindTheCouchQA[] = [
  {
    therapistSlug: 'reetika-shah',
    question: 'What\'s a lesson your younger self would be surprised you eventually learned?',
    answer: 'No matter what you do, people are responsible for their own actions. Everyone\'s an adult and they know what they\'re doing.'
  },
  {
    therapistSlug: 'reetika-shah',
    question: 'What\'s something you\'re weirdly good at that has nothing to do with therapy?',
    answer: 'Crochet'
  },
  {
    therapistSlug: 'reetika-shah',
    question: 'What\'s something you\'re still working on about yourself?',
    answer: 'Having faith that some things just need time. No amount of overthinking or overplanning can rush them along.'
  },
  {
    therapistSlug: 'reetika-shah',
    question: 'What\'s a book or film that changed how you see people?',
    answer: 'Forty Rules of Love by Elif Shafak'
  },
  {
    therapistSlug: 'reetika-shah',
    question: 'What\'s a misconception about therapy you wish more people knew wasn\'t true?',
    answer: 'You don\'t have to share everything with your therapist in the first session. Trust is built gradually and you can choose to keep things to yourself until that trust is built.'
  },
  {
    therapistSlug: 'reetika-shah',
    question: 'What do you hope someone feels like when they leave a session with you?',
    answer: 'Safe. Things won\'t always feel resolved by the end of a session, but I want every client to leave feeling safe.'
  },
  {
    therapistSlug: 'reetika-shah',
    question: 'What still surprises you about doing this work, even now?',
    answer: 'How much good is still in people, even after everything they\'ve been through. So many could\'ve chosen to be harsh, and everyday they choose kindness instead.'
  },
  {
    therapistSlug: 'manvi-jain',
    question: 'What\'s a lesson your younger self would be surprised you eventually learned?',
    answer: 'I am more than what I do for other people.'
  },
  {
    therapistSlug: 'manvi-jain',
    question: 'What\'s something you\'re weirdly good at that has nothing to do with therapy?',
    answer: 'Noticing shapes in clouds and guessing a song within the first 15 seconds.'
  },
  {
    therapistSlug: 'manvi-jain',
    question: 'What\'s something you\'re still working on about yourself?',
    answer: 'Accepting that some things are simply beyond my control, and learning that that\'s okay.'
  },
  {
    therapistSlug: 'manvi-jain',
    question: 'What\'s a book or film that changed how you see people?',
    answer: 'P.S. I Love You by Cecelia Ahern. It showed me just how messy grief can be, and how love can continue to exist alongside it.'
  },
  {
    therapistSlug: 'manvi-jain',
    question: 'What\'s a misconception about therapy you wish more people knew wasn\'t true?',
    answer: 'Your concerns do not have to be “bad enough” to deserve care. And you really don\'t have to immediately trust your therapist either. I would much rather we build trust together, so that when something does not feel right, you know we can talk about it and work through it.'
  },
  {
    therapistSlug: 'manvi-jain',
    question: 'What do you hope someone feels like when they leave a session with you?',
    answer: 'A little less alone, a little more capable, a lot more curious about themselves, and maybe with a few little tinglings of self-compassion.'
  },
  {
    therapistSlug: 'manvi-jain',
    question: 'What still surprises you about doing this work, even now?',
    answer: 'How resilient people are. I often think about how someone could have given up, but they are still here, still trying. How many of us are trying, every single day, to do a little better. I am also struck by how universal so many of our experiences are, while each person\'s way of experiencing them is completely their own. And, perhaps most of all, by how much goodness there is in people.'
  }
];

export const resources: Resource[] = [
  {
    slug: 'what-to-expect-first-therapy-session',
    title: 'What to Expect in Your First Therapy Session',
    type: 'blog',
    category: 'for-clients',
    authorSlug: 'reetika-shah',
    summary: 'Starting therapy can feel daunting. We demystify the first session, what is asked, and how trust is built gradually.',
    content: [
      'It is completely natural to feel anxious or nervous before your first therapy session. We often have expectations shaped by movies or media—the cold leather couch, the silent therapist taking notes, or the pressure to immediately bare your soul. At Ankahee, we want you to know that the first session is simply a conversation.',
      'Here is what we actually focus on:',
      '1. Setting the Pace: You do not need to share everything right away. Trust is built over time, and you are in control of what you disclose. We start by exploring what brings you to therapy today, at a pace that feels comfortable for you.',
      '2. Understanding Your Background: We look at the context of your life—your relationships, your work, and the environments that shape how you feel. We do not just look at symptoms; we look at the whole story.',
      '3. Aligning Goals: Together, we\'ll discuss what you hope to get out of our sessions. Whether it\'s managing anxiety, navigating conflict, or understanding yourself better, we shape therapy around you.',
      'Remember, there is no right or wrong way to show up. You don\'t need a perfectly formed problem; you just need to show up as you are.'
    ],
    publishedAt: '2026-08-10T10:00:00.000Z'
  },
  {
    slug: 'introduction-to-internal-family-systems',
    title: 'Understanding Your "Parts": An Introduction to IFS',
    type: 'reflection',
    category: 'for-clients',
    authorSlug: 'reetika-shah',
    summary: 'Explore the Internal Family Systems (IFS) model and learn to meet your overthinking, people-pleasing, or anxious parts with curiosity instead of judgment.',
    content: [
      'Have you ever felt pulled in two opposite directions? "Part of me wants to go out and socialise, but another part of me just wants to hide under the covers." This language is something we use naturally, but it forms the foundation of a powerful therapeutic model: Internal Family Systems (IFS).',
      'In IFS, we look at the mind not as a single monologue, but as a household of different "parts". Each part develops to help us survive, navigate relationships, or avoid pain. For example:',
      '- The People-Pleaser: Works hard to keep others comfortable, often at its own expense, because it learned that being agreeable keeps things safe.',
      '- The Overthinker: Rehearses every bad scenario to keep you prepared, hoping you will never be caught off-guard or blindsided.',
      '- The Numbing Part: Creates distance or distracts you when a feeling or memory starts to feel too overwhelming to hold.',
      'In therapy, we do not try to "fix" or get rid of these parts. Instead, we approach them with curiosity and compassion. When we understand why a part showed up and what it is trying to protect us from, we can help it step back, allowing our core Self to lead with clarity and calm.'
    ],
    publishedAt: '2026-08-12T12:00:00.000Z'
  },
  {
    slug: 'mapping-interpersonal-cycles-cat',
    title: 'Cognitive Analytic Therapy: Mapping Your Relationship Cycles',
    type: 'blog',
    category: 'for-therapists',
    authorSlug: 'manvi-jain',
    summary: 'A look at Cognitive Analytic Therapy (CAT) and how mapping interpersonal cycles helps clients recognize recurring patterns in their lives.',
    content: [
      'In therapy, clients often say, "I know exactly what I am doing wrong, but I can\'t seem to stop doing it." Whether it is shutting down during conflict, repeatedly choosing partners who are emotionally unavailable, or over-committing until burnout hits, these recurring patterns can feel frustratingly out of control.',
      'Cognitive Analytic Therapy (CAT) offers a structured, collaborative way to make sense of these patterns. Instead of just talking about the issues, we actively map them out.',
      'Here\'s how it works:',
      '1. Identifying the Cycle: We trace the footpath you keep ending up on. We notice the trigger, the internal reaction, the behavior, and the reinforcing consequence. For example, feeling anxious -> people-pleasing -> feeling burnt out/resentful -> withdrawing -> feeling isolated -> feeling anxious.',
      '2. Understanding the Origins: We explore where these paths started. Often, they were creative and necessary ways of coping with childhood relationships or environments. They kept you safe then, even if they limit you now.',
      '3. Creating "Exits": Once the cycle is mapped on paper, we start looking for exits. Recognising the pattern in real-time gives you a pause—a moment of choice to react differently, take a deep breath, set a boundary, or ask for support.',
      'CAT is not about blaming yourself for the cycles; it is about mapping them with kindness so you can choose a different path forward.'
    ],
    publishedAt: '2026-08-15T09:00:00.000Z'
  }
];

export const waitingRoomPrompts = [
  "That's yours. It didn't need to make sense to be real.",
  "You just gave shape to something that didn't have a name yet.",
  "Whatever came out, it counted and it matters.",
  "You don\'t have to explain it. It\'s already said.",
  "Taking a moment to pause is a way of caring for yourself."
];

export const partsDescriptions: Record<string, { title: string; desc: string }> = {
  'people-pleasing': {
    title: 'People-Pleasing Part',
    desc: 'This part works hard to keep everyone else comfortable, often before itself. It probably learned somewhere that being easy, agreeable, or needed kept things safe.'
  },
  'overthinking': {
    title: 'Overthinking Part',
    desc: 'This part replays and rehearses everything that could go wrong. It\'s trying to keep you prepared, so nothing catches you off guard.'
  },
  'anxious': {
    title: 'Anxious Part',
    desc: 'This part sounds the alarm early, sometimes before anything\'s actually happened. It\'s trying to protect you from being blindsided.'
  },
  'depressive': {
    title: 'Depressive Part',
    desc: 'This part slows everything down. Sometimes that\'s its way of protecting you from a pain that feels too big to feel all at once.'
  },
  'numbing': {
    title: 'Numbing Part',
    desc: 'This part creates distance from a feeling or memory that feels like too much right now. It\'s not gone, but it\'s just keeping you from being overwhelmed.'
  },
  'avoidance': {
    title: 'Emotional Avoidance Part',
    desc: 'This part changes the subject or gets busy fast. It\'s protecting you from sitting with something that doesn\'t feel safe to feel yet.'
  },
  'anger': {
    title: 'Anger Part',
    desc: 'This part shows up loud or sharp. Underneath, it\'s usually guarding something softer like a hurt, or a boundary that\'s been crossed.'
  }
};

export const scavengerHuntPrompts = [
  "Find something near you that is blue.",
  "Find something with a texture you like.",
  "Find something that has been around longer than you.",
  "Find something you can see from where you're sitting.",
  "Find something soft to the touch.",
  "Find something that smells comforting.",
  "Find a tiny detail in your room you normally ignore."
];

export const scavengerHuntFeedback = [
  "There you are. You were already here.",
  "Tiny things count too.",
  "Connecting with your space brings you back to the present.",
  "A gentle reminder: you are here in this moment."
];

export const cloudShapes = [
  { name: 'Elephant', emoji: '🐘' },
  { name: 'Cat', emoji: '🐱' },
  { name: 'Dog', emoji: '🐶' },
  { name: 'Bird', emoji: '🐦' },
  { name: 'Dinosaur', emoji: '🦖' },
  { name: 'Whale', emoji: '🐋' },
  { name: 'Tree', emoji: '🌳' },
  { name: 'Cupcake', emoji: '🧁' },
  { name: 'Balloon', emoji: '🎈' },
  { name: 'Snail', emoji: '🐌' }
];

export const faqData = [
  {
    q: "What is the difference between a counselling psychologist and a psychiatrist?",
    a: "Counselling psychologists focus on psychotherapy, talk therapy, understanding emotional patterns, relationships, and coping strategies. Psychiatrists are medical doctors who specialise in diagnosing mental health conditions and primarily prescribe medications."
  },
  {
    q: "Do I need to have a specific problem to start therapy?",
    a: "No, you don't. While many people start therapy to deal with crises, anxiety, or relationship issues, others start to understand themselves better, process life changes, or have a safe space to reflect. Your struggles don't have to be 'severe enough' to deserve care."
  },
  {
    q: "How should I prepare for my first session?",
    a: "You don't need to prepare anything! You don't need a summary of your life or a list of goals. Just show up as you are. We will figure out where to start together, at a pace that feels comfortable to you."
  },
  {
    q: "How often will we meet?",
    a: "Typically, sessions are weekly or once in two weeks, especially in the beginning. This helps build momentum and trust. We will review this regularly based on what works best for your schedule, energy, and goals."
  },
  {
    q: "How many sessions will I need?",
    a: "This varies greatly. Some patterns can be mapped and worked through in 8-12 sessions, while deeper trauma, grief, or personal growth work might take several months or longer. You can stop whenever you feel ready."
  },
  {
    q: "Is online therapy effective?",
    a: "Yes, online therapy has been shown to be highly effective. It allows you to access support from the comfort of your own safe space, removes travel barriers, and makes sessions easier to fit into a busy schedule."
  },
  {
    q: "What if I don't feel like my therapist is the right fit for me?",
    a: "Fit is the most important factor in therapy. If you feel we aren't a good fit, we encourage you to share this. We can adjust our approach, or we are happy to help refer you to another professional who might suit you better."
  },
  {
    q: "Can I stop therapy whenever I feel ready?",
    a: "Absolutely. Therapy is voluntary, and you are in the driver's seat. We recommend having a closing session to reflect on your journey, consolidate what you've learned, and say a proper goodbye, but the choice is always yours."
  }
];
