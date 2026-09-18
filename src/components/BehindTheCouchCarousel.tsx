'use client';

import { useState } from 'react';
import { BehindTheCouchQA } from '@/data/db';
import styles from './BehindTheCouchCarousel.module.css';

interface BehindTheCouchCarouselProps {
  items: BehindTheCouchQA[];
}

export default function BehindTheCouchCarousel({ items }: BehindTheCouchCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + items.length) % items.length);
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
  };

  return (
    <div className={styles.carousel} aria-roledescription="carousel" aria-label="Behind the Couch questions">
      <div key={activeIndex} className={styles.card} aria-live="polite">
        <span className={styles.counter}>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        <h3 className={styles.question}>{activeItem.question}</h3>
        <p className={styles.answer}>{activeItem.answer}</p>
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={showPrevious} aria-label="Show previous Behind the Couch answer">
          <span aria-hidden="true">&larr;</span> Previous
        </button>
        <div className={styles.dots} aria-label="Choose a question">
          {items.map((item, index) => (
            <button
              key={item.question}
              type="button"
              className={index === activeIndex ? styles.activeDot : styles.dot}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show question ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={showNext} aria-label="Show next Behind the Couch answer">
          Next <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
}