import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandColumn}>
          <span className={styles.logoText}>Ankahee</span>
          <p className={styles.description}>
            Between the Lines. An online therapy practice offering thoughtful, evidence-based individual and couples therapy across India.
          </p>
          <div className={styles.crisisAlert}>
            <h4 className={styles.crisisTitle}>Emergency Disclaimer</h4>
            <p className={styles.crisisText}>
              Ankahee is not a crisis support service. If you are in immediate danger or distress, please visit your nearest hospital or access immediate support via{' '}
              <a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer" className={styles.crisisLink}>
                findahelpline.com
              </a>.
            </p>
          </div>
        </div>

        <div>
          <h3 className={styles.columnTitle}>Explore</h3>
          <ul className={styles.linksList}>
            <li><Link href="/" className={styles.link}>Home</Link></li>
            <li><Link href="/therapist/reetika-shah" className={styles.link}>Reetika Shah</Link></li>
            <li><Link href="/therapist/manvi-jain" className={styles.link}>Manvi Jain</Link></li>
            <li><Link href="/waiting-room" className={styles.link}>The Waiting Room</Link></li>
            <li><Link href="/resources" className={styles.link}>Resources</Link></li>
          </ul>
        </div>

        <div>
          <h3 className={styles.columnTitle}>Services</h3>
          <ul className={styles.linksList}>
            <li><Link href="/#services" className={styles.link}>Individual Therapy</Link></li>
            <li><Link href="/#services" className={styles.link}>Couples Therapy</Link></li>
            <li><Link href="/#services" className={styles.link}>Workshops & Trainings</Link></li>
            <li><Link href="/#services" className={styles.link}>Employee Assistance (EAP)</Link></li>
          </ul>
        </div>

        <div>
          <h3 className={styles.columnTitle}>Contact</h3>
          <div className={styles.contactInfo}>
            <p><strong>Email:</strong> <a href="mailto:care@ankahee.in" className={styles.link}>care@ankahee.in</a></p>
            <p><strong>Locations:</strong> Online Only (Across India)</p>
            <p><strong>Consultation Hours:</strong> 6 Days a Week (Except Wednesdays)</p>
            <p><strong>Response Time:</strong> 24-48 Hours</p>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span className={styles.copyright}>
          &copy; {new Date().getFullYear()} Ankahee. All rights reserved.
        </span>
        <div className={styles.legalLinks}>
          <Link href="/#privacy" className={styles.link}>Privacy Policy</Link>
          <Link href="/#terms" className={styles.link}>Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
