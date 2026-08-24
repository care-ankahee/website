import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResourcesList from '@/components/ResourcesList';
import { getResources } from '@/lib/sanity';
import styles from './page.module.css';

export default async function ResourcesPage() {
  const initialResources = await getResources();

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.intro}>
        <h1 className={styles.title}>Resources & Reflections</h1>
        <p className={styles.subtitle}>
          Articles, worksheets, and reflections written by Ankahee therapists to help you navigate your mental health, understand relationship patterns, and find supportive coping strategies.
        </p>
      </section>

      <ResourcesList initialResources={initialResources} />

      <Footer />
    </div>
  );
}
