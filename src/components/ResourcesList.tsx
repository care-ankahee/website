'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/resources/page.module.css';
import { Resource } from '@/data/db';

interface ResourcesListProps {
  initialResources: Resource[];
}

export default function ResourcesList({ initialResources }: ResourcesListProps) {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'for-clients' | 'for-therapists'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'blog' | 'reflection' | 'worksheet'>('all');

  const filtered = initialResources.filter((res) => {
    const matchesCategory = categoryFilter === 'all' || res.category === categoryFilter;
    const matchesType = typeFilter === 'all' || res.type === typeFilter;
    return matchesCategory && matchesType;
  });

  return (
    <>
      <div className={styles.filterSection}>
        <div className={styles.filters}>
          <button 
            className={`${styles.filterBtn} ${categoryFilter === 'all' ? styles.activeFilter : ''}`}
            onClick={() => setCategoryFilter('all')}
          >
            All Resources
          </button>
          <button 
            className={`${styles.filterBtn} ${categoryFilter === 'for-clients' ? styles.activeFilter : ''}`}
            onClick={() => setCategoryFilter('for-clients')}
          >
            For Clients
          </button>
          <button 
            className={`${styles.filterBtn} ${categoryFilter === 'for-therapists' ? styles.activeFilter : ''}`}
            onClick={() => setCategoryFilter('for-therapists')}
          >
            For Therapists
          </button>
        </div>

        <div className={styles.filters}>
          {['all', 'blog', 'reflection', 'worksheet'].map((t) => (
            <button
              key={t}
              className={`${styles.filterBtn} ${typeFilter === t ? styles.activeFilter : ''}`}
              onClick={() => setTypeFilter(t as any)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}s
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map((resource) => (
            <div key={resource.slug} className={styles.card}>
              <div>
                <div className={styles.cardHeader}>
                  <span className={`${styles.typeBadge} ${
                    resource.type === 'blog' ? styles.blogBadge :
                    resource.type === 'reflection' ? styles.reflectionBadge :
                    styles.worksheetBadge
                  }`}>
                    {resource.type}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#8c8273' }}>
                    {resource.category === 'for-clients' ? 'Client Resource' : 'Therapist Resource'}
                  </span>
                </div>
                <h3 className={styles.cardTitle} style={{ marginTop: '0.75rem' }}>{resource.title}</h3>
                <p className={styles.cardSummary} style={{ marginTop: '0.75rem' }}>{resource.summary}</p>
              </div>

              <div className={styles.cardMeta}>
                <span>{new Date(resource.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <Link href={`/resources/${resource.slug}`} className={styles.readMore}>
                  Read More &rarr;
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: '#8c8273' }}>
            No resources found matching the selected filters.
          </div>
        )}
      </div>
    </>
  );
}
