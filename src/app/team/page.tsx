import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getTherapists } from '@/lib/sanity';
import { Therapist } from '@/data/db';
import styles from './page.module.css';

export default async function TeamPage() {
  const therapistsList = await getTherapists();

  return (
    <div className={styles.container}>
      <Header />
      
      <section className={styles.headerSection}>
        <h1 className={styles.title}>Meet the Ankahee Team</h1>
        <p className={styles.subtitle}>
          Qualified, warm, and experienced psychologists dedicated to walking beside you through life\'s transitions, patterns, and struggles.
        </p>
      </section>

      <main className={styles.content}>
        {therapistsList.map((therapist: Therapist) => (
          <div key={therapist.slug} className={styles.therapistRow}>
            <div className={styles.imageWrapper}>
              <Image 
                src={therapist.headshot}
                alt={therapist.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.info}>
              <h2 className={styles.name}>
                {therapist.name}
                <span className={styles.pronouns}>{therapist.pronouns}</span>
              </h2>
              <p className={styles.role}>{therapist.role}</p>
              
              <div className={styles.stats}>
                <span className={styles.statBadge}>💼 {therapist.experience}</span>
                <span className={styles.statBadge}>🗣️ {therapist.languages.join(', ')}</span>
                <span className={styles.statBadge}>👥 Age {therapist.ageGroups}</span>
              </div>

              <p className={styles.bio}>
                {therapist.shortBio}
              </p>
              
              <Link href={`/therapist/${therapist.slug}`} className={styles.profileBtn}>
                View Full Bio & Q&A &rarr;
              </Link>
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}
