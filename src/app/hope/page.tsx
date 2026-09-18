import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommunityWallForm from '@/components/CommunityWallForm';
import { getTestimonials } from '@/lib/sanity';
import { Testimonial } from '@/data/db';
import styles from './page.module.css';

export default async function Hope() {
  const testimonials = await getTestimonials();
  const wallImages = [
    {
      src: '/waiting-room/scavenger hunt 1.jpg',
      alt: 'Scavenger hunt prompt',
      title: 'Look a little closer',
      text: 'A gentle invitation to notice the small details already around you.'
    },
    {
      src: '/waiting-room/Audio.jpeg',
      alt: 'Audio grounding prompt',
      title: 'Let sound find you',
      text: 'Pause for a sound, a rhythm, or a familiar song that helps you arrive.'
    },
    {
      src: '/waiting-room/cloud watcher.jpg',
      alt: 'Cloud watcher prompt',
      title: 'Make room for wonder',
      text: 'There is no right answer here. Let your attention drift somewhere soft.'
    },
    {
      src: '/waiting-room/color your mood 1.jpg',
      alt: 'Color your mood prompt one',
      title: 'Give the feeling a colour',
      text: 'You do not need to explain a feeling before you give it somewhere to go.'
    },
    {
      src: '/waiting-room/color your mood 2.jpg',
      alt: 'Color your mood prompt two',
      title: 'Let it be unfinished',
      text: 'A mood can change shape. Your page can change with it.'
    },
    {
      src: '/waiting-room/Doodle design.jpeg',
      alt: 'Doodle design prompt',
      title: 'Make a mark',
      text: 'A line, a loop, or a scribble can be enough for this moment.'
    },
    {
      src: '/waiting-room/IFS Charcaters.jpeg',
      alt: 'IFS characters prompt',
      title: 'Meet the parts of you',
      text: 'Different parts can want different things and still belong in the same story.'
    },
    {
      src: '/waiting-room/scavenger hunt 2.jpg',
      alt: 'Scavenger hunt prompt two',
      title: 'Come back to here',
      text: 'The world around you can be an anchor when your thoughts feel far away.'
    }
  ];
  const marqueeTestimonials = [...testimonials, ...testimonials];

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

      <section className={styles.wallMediaSection} aria-label="Community wall images">
        <div className={styles.wallMediaIntro}>
          <span>A few ways in</span>
          <h2>Take what you need from the waiting room.</h2>
          <p>These small activities are here for the in-between moments: before a session, after a difficult day, or whenever you need a softer place to land.</p>
        </div>
        <div className={styles.wallGallery}>
          {wallImages.map((image, index) => (
            <article
              className={`${styles.wallGalleryRow} ${index % 2 === 1 ? styles.wallGalleryRowReverse : ''}`}
              key={image.src}
            >
              <div className={styles.wallImageCard}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={520}
                  height={380}
                  className={styles.wallImage}
                />
              </div>
              <div className={styles.wallGalleryCopy}>
                <span className={styles.wallGalleryNumber}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{image.title}</h3>
                <p>{image.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.wallSection}>
        <div className={styles.sectionIntro}>
          <span>Shared notes</span>
          <h2>Small pieces of what people carry, moving together.</h2>
        </div>
        <div className={styles.marquee}>
          <div className={styles.testimonialTrack}>
            {marqueeTestimonials.map((testimonial: Testimonial, index: number) => (
              <article key={`${testimonial.text}-${index}`} className={styles.testimonialCard}>
                <p className={styles.testimonialText}>&ldquo;{testimonial.text}&rdquo;</p>
                <div className={styles.testimonialMeta}>
                  <span>{testimonial.age} years old</span>
                  <span>{testimonial.gender}</span>
                </div>
              </article>
            ))}
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
