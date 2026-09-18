import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { getTestimonials } from '@/lib/sanity';
import { Testimonial } from '@/data/db';

export default async function ServicesPage() {
  const testimonials = await getTestimonials();
  const movingTestimonials = [...testimonials, ...testimonials];
  const serviceDetails = [
    {
      title: "Individual Therapy",
      color: "var(--color-peach)",
      desc: "Online therapy for adults navigating anxiety, depression, stress, trauma, grief, ADHD, relationship concerns, self-esteem, identity, emotional regulation, and life transitions. We begin by understanding what brings you here, while also exploring the experiences, relationships, and environments that have shaped who you are."
    },
    {
      title: "Couples Therapy",
      color: "var(--color-gold)",
      desc: "Support for couples looking to improve communication, navigate conflict, rebuild trust, strengthen intimacy, and work through life's challenges together. We work collaboratively to help both partners understand recurring patterns and find ways of connecting that feel secure, supportive, and meaningful."
    },
    {
      title: "Employee Assistance Programmes (EAP)",
      color: "var(--color-teal)",
      desc: "Comprehensive mental health support for organisations through counselling, interactive workshops, training programmes, wellbeing initiatives, and custom-designed employee assistance programmes tailored to employee needs."
    },
    {
      title: "Workshops",
      color: "var(--color-purple)",
      desc: "Interactive workshops on mental health, emotional wellbeing, relationships, boundaries, stress management, resilience, and workplace wellbeing. Customised workshops are available for community groups, educational institutions, and corporate teams."
    },
    {
      title: "Training Programmes",
      color: "var(--color-sage)",
      desc: "Experiential training programmes for students, early-career mental health professionals, and organisations on counselling microskills, therapeutic relationships, reflective practice, and the foundational elements of meaningful therapeutic work."
    }
  ];

  return (
    <div className={styles.container}>
      <Header />
      
      <section className={styles.headerSection}>
        <h1 className={styles.title}>Services & Support Pathways</h1>
        <p className={styles.subtitle}>
          How we can work together. We shape therapy around you, your goals, and what feels most meaningful, rather than following a fixed method.
        </p>
      </section>

      <main className={styles.content}>
        {serviceDetails.map((service, i) => (
          <div key={i} className={styles.serviceBlock}>
            <div className={styles.serviceHeader}>
              <div className={styles.iconWrapper} style={{ backgroundColor: service.color }}>
                <Image src="/short-logo.png" alt="" width={34} height={34} />
              </div>
              <h2 className={styles.serviceTitle}>{service.title}</h2>
            </div>
            <p className={styles.description}>
              {service.desc}
            </p>
          </div>
        ))}

        <section className={styles.testimonialsSection} aria-label="Client reflections">
          <div className={styles.testimonialsIntro}>
            <span>Client reflections</span>
            <h2>Support can make room for change.</h2>
          </div>
          <div className={styles.testimonialsMarquee}>
            <div className={styles.testimonialsTrack}>
              {movingTestimonials.map((testimonial: Testimonial, index: number) => (
                <article key={`${testimonial.text}-${index}`} className={styles.testimonialCard}>
                  <p>&ldquo;{testimonial.text}&rdquo;</p>
                  <span>{testimonial.age} years old · {testimonial.gender}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.ctaBox}>
          <p className={styles.ctaText}>
            Unsure which service fits your current requirements? Let&apos;s talk and figure it out together.
          </p>
          <Link href="/#booking" className={styles.ctaBtn}>
            Book a Consultation
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
