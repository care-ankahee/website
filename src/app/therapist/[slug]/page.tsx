import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { getTherapistBySlug, getBehindTheCouchQAs } from '@/lib/sanity';
import { BehindTheCouchQA } from '@/data/db';
import styles from './page.module.css';


interface TherapistPageProps {
  params: Promise<{ slug: string }>;
}

const modalityDescriptions: Record<string, string> = {
  'Internal Family Systems (IFS)': 'Helps you understand the different parts of yourself with curiosity instead of judgment.',
  'Cognitive Behaviour Therapy (CBT)': 'Looks at how thoughts, feelings, and actions influence each other, and where small shifts may help.',
  'Dialectical Behaviour Therapy (DBT)': 'Offers practical skills for emotional intensity, grounding, communication, and distress tolerance.',
  'Grief Therapy': 'Creates room to carry loss with gentleness, without forcing a fixed timeline for healing.',
  'Trauma-Informed Approach': 'Moves at a pace that protects safety, choice, and trust while making sense of difficult experiences.',
  'Cognitive Analytic Therapy (CAT)': 'Maps recurring patterns in relationships and self-understanding so new responses become possible.',
  'Emotionally Focused Individual Therapy (EFIT)': 'Explores emotional patterns and attachment needs with warmth and clarity.',
  'Trauma-Informed Relational Practice': 'Keeps safety, context, and relationship at the centre of therapeutic work.'
};

export default async function TherapistPage({ params }: TherapistPageProps) {
  const resolvedParams = await params;
  const therapist = await getTherapistBySlug(resolvedParams.slug);

  if (!therapist) {
    notFound();
  }

  const behindTheCouch = await getBehindTheCouchQAs(resolvedParams.slug);

  return (
    <div className={styles.container}>
      <Header />

      {/* Profile Header */}
      <section className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <div className={styles.imageWrapper}>
            <Image
              src={therapist.headshot}
              alt={therapist.name}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className={styles.basicInfo}>
            <h1 className={styles.name}>
              {therapist.name}
              <span className={styles.pronouns}>{therapist.pronouns}</span>
            </h1>
            <p className={styles.role}>{therapist.role}</p>
            <p style={{ color: '#5d564c', fontSize: '1.05rem', maxWidth: '700px' }}>
              {therapist.shortBio}
            </p>
            <div className={styles.quickStats}>
              <div className={styles.statBadge}>
                <span>💼</span> {therapist.experience}
              </div>
              <div className={styles.statBadge}>
                <span>🌐</span> {therapist.languages.join(', ')}
              </div>
              <div className={styles.statBadge}>
                <span>👥</span> {therapist.ageGroups}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className={styles.grid}>
        <main className={styles.mainContent}>
          
          {/* Philosophy */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Therapeutic Philosophy</h2>
            <div className={styles.philosophyQuote}>
              &ldquo;{therapist.philosophy}&rdquo;
            </div>
          </section>

          {/* Full Biography */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            {therapist.fullBio.map((paragraph: string, i: number) => (
              <p key={i} className={styles.bioParagraph}>
                {paragraph}
              </p>
            ))}
          </section>

          {/* Specialisations */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Areas of Support</h2>
            <div className={styles.tags}>
              {therapist.specialisations.map((spec: string, i: number) => (
                <span key={i} className={styles.tag}>{spec}</span>
              ))}
            </div>
          </section>

          {/* Modalities */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Therapeutic Modalities</h2>
            <div className={styles.modalityGrid}>
              {therapist.modalities.map((mod: string, i: number) => (
                <article key={i} className={styles.modalityCard}>
                  <span className={styles.modalityNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{mod}</h3>
                  <p>{modalityDescriptions[mod] ?? 'A collaborative approach chosen around your needs, pace, and goals.'}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Behind the Couch Q&A */}
          {behindTheCouch.length > 0 && (
            <section className={styles.btcContainer}>
              <h2 className={styles.sectionTitle}>Behind the Couch</h2>
              <p style={{ fontSize: '0.9rem', color: '#6d665b', marginTop: '0.5rem' }}>A little glimpse into who I am outside the therapy room.</p>
              <div className={styles.btcGrid}>
                {behindTheCouch.map((qa: BehindTheCouchQA, i: number) => (
                  <div key={i} className={styles.btcItem}>
                    <h3 className={styles.btcQuestion}>{qa.question}</h3>
                    <p className={styles.btcAnswer}>{qa.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>

        {/* Sidebar Info & Booking Form */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div className={styles.btcContainer} style={{ padding: '2rem' }}>
            <h3 className={styles.sectionTitle} style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Session Details</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <div>
                  <strong>Formats:</strong> {therapist.formats}
                </div>
              </li>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <div>
                  <strong>Fees:</strong> {therapist.fees}
                </div>
              </li>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <div>
                  <strong>Availability:</strong> {therapist.availability}
                </div>
              </li>
            </ul>
          </div>
          
          <BookingForm 
            defaultTherapist={therapist.slug}
            therapistOptions={[
              { name: `${therapist.name} (${therapist.role})`, slug: therapist.slug }
            ]}
          />
        </aside>
      </div>

      <Footer />
    </div>
  );
}
