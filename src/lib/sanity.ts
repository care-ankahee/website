import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { therapists, testimonials, behindTheCouchQAs, resources } from '../data/db';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2026-08-17';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Data Fetching Helper Functions with transparent fallbacks to db.ts
export async function getTherapists() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return therapists;
  }

  try {
    const query = `*[_type == "therapist"] {
      slug,
      name,
      pronouns,
      role,
      "headshot": headshot.asset->url,
      qualifications,
      certifications,
      experience,
      specialisations,
      modalities,
      ageGroups,
      formats,
      languages,
      shortBio,
      fullBio,
      philosophy,
      services,
      availability,
      email,
      fees,
      bookingFlow,
      bookingLinkText
    }`;
    const result = await sanityClient.fetch(query);
    return result.length > 0 ? result : therapists;
  } catch (error) {
    console.warn("Sanity fetch error, falling back to local DB:", error);
    return therapists;
  }
}

export async function getTherapistBySlug(slug: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return therapists.find(t => t.slug === slug) || null;
  }
  try {
    const query = `*[_type == "therapist" && slug.current == $slug][0] {
      "slug": slug.current,
      name,
      pronouns,
      role,
      "headshot": headshot.asset->url,
      qualifications,
      certifications,
      experience,
      specialisations,
      modalities,
      ageGroups,
      formats,
      languages,
      shortBio,
      fullBio,
      philosophy,
      services,
      availability,
      email,
      fees,
      bookingFlow,
      bookingLinkText
    }`;
    const result = await sanityClient.fetch(query, { slug });
    return result || therapists.find(t => t.slug === slug) || null;
  } catch (error) {
    console.warn(`Sanity fetch error for ${slug}, falling back to local DB:`, error);
    return therapists.find(t => t.slug === slug) || null;
  }
}

export async function getTestimonials(therapistSlug?: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    if (therapistSlug) {
      return testimonials.filter(t => t.therapistSlug === therapistSlug);
    }
    return testimonials;
  }
  try {
    const filter = therapistSlug ? `&& therapist->slug.current == "${therapistSlug}"` : '';
    const query = `*[_type == "testimonial" ${filter}] {
      "therapistSlug": therapist->slug.current,
      clientAge,
      clientGender,
      quote
    }`;
    const result = await sanityClient.fetch(query);
    return result.length > 0 ? result.map((r: any) => ({
      therapistSlug: r.therapistSlug,
      age: r.clientAge,
      gender: r.clientGender,
      text: r.quote
    })) : (therapistSlug ? testimonials.filter(t => t.therapistSlug === therapistSlug) : testimonials);
  } catch (error) {
    console.warn("Sanity fetch error for testimonials, falling back to local DB:", error);
    return therapistSlug ? testimonials.filter(t => t.therapistSlug === therapistSlug) : testimonials;
  }
}

export async function getBehindTheCouchQAs(therapistSlug: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return behindTheCouchQAs.filter(q => q.therapistSlug === therapistSlug);
  }
  try {
    const query = `*[_type == "behindTheCouch" && therapist->slug.current == $slug] {
      question,
      answer
    }`;
    const result = await sanityClient.fetch(query, { slug: therapistSlug });
    return result.length > 0 ? result : behindTheCouchQAs.filter(q => q.therapistSlug === therapistSlug);
  } catch (error) {
    console.warn(`Sanity fetch error for Q&As of ${therapistSlug}, falling back to local DB:`, error);
    return behindTheCouchQAs.filter(q => q.therapistSlug === therapistSlug);
  }
}

export async function getResources(category?: 'for-therapists' | 'for-clients') {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    if (category) {
      return resources.filter(r => r.category === category);
    }
    return resources;
  }
  try {
    const filter = category ? `&& category == "${category}"` : '';
    const query = `*[_type == "resource" ${filter}] {
      "slug": slug.current,
      title,
      type,
      category,
      "authorSlug": author->slug.current,
      summary,
      content,
      publishedAt,
      "downloadUrl": downloadFile.asset->url
    }`;
    const result = await sanityClient.fetch(query);
    return result.length > 0 ? result : (category ? resources.filter(r => r.category === category) : resources);
  } catch (error) {
    console.warn("Sanity fetch error for resources, falling back to local DB:", error);
    return category ? resources.filter(r => r.category === category) : resources;
  }
}

export async function getResourceBySlug(slug: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return resources.find(r => r.slug === slug) || null;
  }
  try {
    const query = `*[_type == "resource" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      type,
      category,
      "authorSlug": author->slug.current,
      summary,
      content,
      publishedAt,
      "downloadUrl": downloadFile.asset->url
    }`;
    const result = await sanityClient.fetch(query, { slug });
    return result || resources.find(r => r.slug === slug) || null;
  } catch (error) {
    console.warn(`Sanity fetch error for resource ${slug}, falling back to local DB:`, error);
    return resources.find(r => r.slug === slug) || null;
  }
}
