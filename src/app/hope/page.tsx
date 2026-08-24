import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getTestimonials, getTherapists } from '@/lib/sanity';
import { Therapist, Testimonial } from '@/data/db';
import styles from './page.module.css';

interface TherapistWithTestimonials {
  therapist: Therapist;
  testimonials: Testimonial[];
}

export default async function Hope() {
  const testimonials = await getTestimonials();
  const therapists = await getTherapists();

  // Create a map of therapist info for quick lookup
  const therapistMap = new Map<string, Therapist>();
  therapists.forEach((t: Therapist) => therapistMap.set(t.slug, t));

  // Organize testimonials by therapist
  const testimonialsGrouped: TherapistWithTestimonials[] = therapists.map((therapist: Therapist) => ({
    therapist,
    testimonials: testimonials.filter((t: Testimonial) => t.therapistSlug === therapist.slug)
  })).filter((group: TherapistWithTestimonials) => group.testimonials.length > 0);

  // Waiting room images to cycle through
  const waitingRoomImages = [
    '/waiting-room/cloud watcher.jpg',
    '/waiting-room/color your mood 1.jpg',
    '/waiting-room/color your mood 2.jpg',
    '/waiting-room/scavenger hunt 1.jpg',
    '/waiting-room/scavenger hunt 2.jpg',
    '/waiting-room/Doodle design.jpeg',
    '/waiting-room/IFS Charcaters.jpeg',
    '/waiting-room/Audio.jpeg'
  ];

  return (
    <div className={styles.container}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Hope Stories</h1>
          <p className={styles.subtitle}>
            Real stories from real people. These are voices of those who've found their way through therapy at Ankahee.
          </p>
        </div>
      </section>

      {/* Waiting Room Images Gallery - Introduction */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryIntro}>
          <h2>The Waiting Room: Tools for Your Journey</h2>
          <p>
            While you wait, reflect, draw, or pause. Our interactive tools in The Waiting Room are designed to meet you where you are.
          </p>
        </div>
        <div className={styles.gallery}>
          {waitingRoomImages.slice(0, 4).map((image, index) => (
            <div key={index} className={styles.galleryItem}>
              <Image
                src={image}
                alt={`Waiting room activity ${index + 1}`}
                width={250}
                height={250}
                className={styles.galleryImage}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        {testimonialsGrouped.map((group: TherapistWithTestimonials, groupIndex: number) => (
          <div key={group.therapist.slug}>
            {/* Therapist Header */}
            <div className={styles.therapistHeader}>
              <div className={styles.therapistInfo}>
                <Image
                  src={group.therapist.headshot}
                  alt={group.therapist.name}
                  width={100}
                  height={100}
                  className={styles.therapistHeadshot}
                />
                <div className={styles.therapistNameRole}>
                  <h3 className={styles.therapistName}>{group.therapist.name}</h3>
                  <p className={styles.therapistRole}>{group.therapist.role}</p>
                </div>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className={styles.testimonialsGrid}>
              {group.testimonials.map((testimonial: Testimonial, index: number) => (
                <div key={index} className={styles.testimonialCard}>
                  <div className={styles.testimonialContent}>
                    <p className={styles.testimonialText}>"{testimonial.text}"</p>
                    <div className={styles.testimonialMeta}>
                      <span className={styles.age}>{testimonial.age} years old</span>
                      <span className={styles.gender}>{testimonial.gender}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Alternate waiting room images between sections */}
            {groupIndex < testimonialsGrouped.length - 1 && (
              <div className={styles.imageBreak}>
                {waitingRoomImages.slice(4 + (groupIndex * 2), 6 + (groupIndex * 2)).map((image, idx) => (
                  <div key={idx} className={styles.breakImage}>
                    <Image
                      src={image}
                      alt={`Waiting room activity`}
                      width={300}
                      height={300}
                      className={styles.breakImageContent}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to Start Your Own Story?</h2>
        <p>
          Your journey toward understanding, healing, and growth can begin with a single conversation.
        </p>
        <a href="/#booking" className={styles.ctaButton}>
          Book Your First Session
        </a>
      </section>

      <Footer />
    </div>
  );
}
