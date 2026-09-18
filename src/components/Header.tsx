'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoContainer}>
          <Image 
            src="/short-logo.png" 
            alt="Ankahee Logo" 
            width={44} 
            height={44} 
            priority
            style={{ 
              borderRadius: '50%', 
              objectFit: 'cover',
              flexShrink: 0
            }}
          />
          <div>
            <span className={styles.logoText}>Ankahee</span>
            <span className={styles.tagline}>Therapy</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/services" className={styles.navLink}>Services</Link>
          <Link href="/team" className={styles.navLink}>Meet the Team</Link>
          <Link href="/hope" className={styles.navLink}>Community Wall</Link>
          <Link href="/waiting-room" className={styles.navLink}>The Waiting Room</Link>
          <Link href="/resources" className={styles.navLink}>Resources</Link>
          <Link href="/#booking" className={styles.ctaButton}>Book a Session</Link>
        </nav>

        {/* Mobile Menu Icon */}
        <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.active : ''}`}>
        <Link href="/" className={styles.navLink} onClick={toggleMenu}>Home</Link>
        <Link href="/services" className={styles.navLink} onClick={toggleMenu}>Services</Link>
        <Link href="/team" className={styles.navLink} onClick={toggleMenu}>Meet the Team</Link>
        <Link href="/hope" className={styles.navLink} onClick={toggleMenu}>Community Wall</Link>
        <Link href="/waiting-room" className={styles.navLink} onClick={toggleMenu}>The Waiting Room</Link>
        <Link href="/resources" className={styles.navLink} onClick={toggleMenu}>Resources</Link>
        <Link href="/#booking" className={styles.ctaButton} onClick={toggleMenu}>Book a Session</Link>
      </div>
    </header>
  );
}
