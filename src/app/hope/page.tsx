import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommunityWallForm from '@/components/CommunityWallForm';
import { getCommunityWallSubmissions } from '@/lib/communityWall';
import { getTestimonials } from '@/lib/sanity';
import { Testimonial } from '@/data/db';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function Hope() {
  const testimonials = await getTestimonials();
  const submissions = await getCommunityWallSubmissions();
  const wallNotes = [
    ...testimonials.map((testimonial: Testimonial) => ({
      text: testimonial.text,
      meta: `${testimonial.age} years old - ${testimonial.gender}`
    })),
    ...submissions.map((submission) => ({
      text: submission.message,
      meta: submission.isAnonymous ? 'Shared anonymously' : 'Shared with the community'
    }))
  ];
  const featuredNotes = wallNotes.slice(0, 3);
  const marqueeNotes = featuredNotes.length > 1 ? [...featuredNotes, ...featuredNotes] : featuredNotes;

  return (
    <div className={styles.container}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Community Wall</h1>
          <p className={styles.subtitle}>
            A quiet confession wall for client reflections and stories of finding support through therapy at Ankahee.
          </p>
        </div>
      </section>

      <section className={styles.wallSection}>
        <div className={styles.sectionIntro}>
          <span>Shared notes</span>
          <h2>Small pieces of what people carry, moving together.</h2>
        </div>
        <div className={styles.wallFrame}>
          <div className={styles.marquee}>
          <div className={styles.testimonialTrack}>
            {marqueeNotes.map((note, index) => (
              <article key={`${note.text}-${index}`} className={styles.testimonialCard}>
                <p className={styles.testimonialText}>&ldquo;{note.text}&rdquo;</p>
                <div className={styles.testimonialMeta}>
                  <span>{note.meta}</span>
                </div>
              </article>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <CommunityWallForm />
        <div className={styles.bookingPrompt}>
          <h2>Ready to Start Your Own Story?</h2>
          <p>Your journey toward understanding, healing, and growth can begin with a single conversation.</p>
          <Link href="/#booking" className={styles.ctaButton}>Book Your First Session</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
