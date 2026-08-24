import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getTherapists, getBehindTheCouchQAs } from '@/lib/sanity';
import { Therapist, BehindTheCouchQA } from '@/data/db';
import styles from './page.module.css';

export default async function BehindTheCouch() {
  const therapists = await getTherapists();
  
  // Fetch Q&As for each therapist
  const therapistsWithQAs = await Promise.all(
    therapists.map(async (therapist: Therapist) => {
      const qas = await getBehindTheCouchQAs(therapist.slug);
      return { therapist, qas };
    })
  );

  return (
    <div className={styles.container}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Behind the Couch</h1>
          <p className={styles.subtitle}>
            Get to know the people behind the practice. These conversations reveal who Ankahee's therapists are beyond their credentials.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent}>
        {therapistsWithQAs.map(({ therapist, qas }) => (
          <div key={therapist.slug} className={styles.therapistSection}>
            <div className={styles.therapistHeader}>
              <div className={styles.therapistInfo}>
                <Image
                  src={therapist.headshot}
                  alt={therapist.name}
                  width={120}
                  height={120}
                  className={styles.headshot}
                />
                <div className={styles.nameRole}>
                  <h2 className={styles.therapistName}>{therapist.name}</h2>
                  <p className={styles.role}>{therapist.role}</p>
                  <Link href={`/therapist/${therapist.slug}`} className={styles.viewProfile}>
                    View Full Profile →
                  </Link>
                </div>
              </div>
            </div>

            {qas && qas.length > 0 && (
              <div className={styles.qaSection}>
                {qas.map((qa: BehindTheCouchQA, index: number) => (
                  <div key={index} className={styles.qaItem}>
                    <h3 className={styles.question}>Q: {qa.question}</h3>
                    <p className={styles.answer}>A: {qa.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
