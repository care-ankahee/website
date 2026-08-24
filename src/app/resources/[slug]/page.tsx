import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getResourceBySlug, getTherapists } from '@/lib/sanity';
import { Therapist } from '@/data/db';
import styles from '../page.module.css';


interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  const resolvedParams = await params;
  const resource = await getResourceBySlug(resolvedParams.slug);

  if (!resource) {
    notFound();
  }

  // Fetch author details
  const therapistsList = await getTherapists();
  const author = therapistsList.find((t: Therapist) => t.slug === resource.authorSlug);

  return (
    <div className={styles.container}>
      <Header />

      <article className={styles.detailContainer}>
        <Link href="/resources" className={styles.backLink}>
          &larr; Back to Resources
        </Link>

        <header className={styles.detailHeader}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            <span className={`${styles.typeBadge} ${
              resource.type === 'blog' ? styles.blogBadge :
              resource.type === 'reflection' ? styles.reflectionBadge :
              styles.worksheetBadge
            }`}>
              {resource.type}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#8c8273', fontWeight: 600 }}>
              {resource.category === 'for-clients' ? 'For Clients' : 'For Therapists'}
            </span>
          </div>
          <h1 className={styles.detailTitle}>{resource.title}</h1>
          
          <div className={styles.detailMeta}>
            <span>
              By <strong>{author ? author.name : 'Ankahee Therapist'}</strong>
            </span>
            <span>
              {new Date(resource.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </header>

        <section className={styles.detailContent}>
          {resource.content.map((paragraph: string, idx: number) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </section>

        {resource.downloadUrl && (
          <div className={styles.downloadBox}>
            <div>
              <h4 style={{ color: 'var(--color-purple)' }}>Printable PDF Version</h4>
              <p style={{ fontSize: '0.9rem', color: '#6d665b', marginTop: '0.25rem' }}>Download this worksheet to work through the reflection prompts offline.</p>
            </div>
            <a 
              href={resource.downloadUrl} 
              download 
              className={styles.filterBtn} 
              style={{ backgroundColor: 'var(--color-purple)', color: 'white', borderColor: 'var(--color-purple)' }}
            >
              Download PDF
            </a>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
