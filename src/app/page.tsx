import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import styles from './page.module.css';


export default async function Home() {
  const services = [
    {
      title: "Individual Therapy",
      color: "var(--color-peach)",
      desc: "Online therapy for adults navigating anxiety, stress, trauma, grief, ADHD, relationships, identity, and life transitions."
    },
    {
      title: "Couples Therapy",
      color: "var(--color-gold)",
      desc: "Support for couples looking to improve communication, navigate conflict, rebuild trust, and strengthen connection."
    },
    {
      title: "Employee Assistance (EAP)",
      color: "var(--color-teal)",
      desc: "Mental health support for organisations through counselling, workshops, wellbeing initiatives, and customised EAPs."
    },
    {
      title: "Workshops",
      color: "var(--color-purple)",
      desc: "Interactive sessions on emotional wellbeing, boundaries, stress management, resilience, and workplace wellbeing."
    },
    {
      title: "Training Programmes",
      color: "var(--color-sage)",
      desc: "Experiential programmes for students and early-career mental health professionals on counselling microskills and reflective practice."
    }
  ];

  const bookingSteps = [
    "Send us an inquiry",
    "We understand what kind of support you are looking for",
    "We share the next steps for consent, therapist fit, and scheduling"
  ];

  return (
    <div className={styles.container}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Therapy That Meets You
            <span className={styles.heroTitleHighlight}>Where You Are.</span>
          </h1>
          <p className={styles.heroText}>
            Ankahee is an online therapy practice offering individual and couples therapy across India in English, Hindi, Marwari, and Nepali. Whether you&apos;re feeling overwhelmed, navigating a difficult relationship, or simply trying to understand yourself better, therapy begins with a conversation.
          </p>
          <div className={styles.heroButtons}>
            <Link href="#booking" className={styles.primaryBtn}>Book a Session</Link>
            <Link href="/team" className={styles.secondaryBtn}>Meet the Team</Link>
          </div>
        </div>
        <div className={styles.heroIllustration}>
          <div className={styles.logoStage}>
            <Image 
              src="/ankahee-logo-design.png"
              alt="Ankahee"
              width={520}
              height={256}
              priority
              className={styles.heroLogo}
            />
            <div className={styles.logoVariants}>
              <Image
                src="/ankahee-logo-wordmark.png"
                alt="Ankahee wordmark"
                width={360}
                height={77}
                className={styles.logoVariantWide}
              />
              <Image
                src="/ankahee-logo-strip.png"
                alt="Ankahee logo elements"
                width={430}
                height={32}
                className={styles.logoVariantStrip}
              />
            </div>
            <span className={`${styles.logoElement} ${styles.logoElementOne}`} />
            <span className={`${styles.logoElement} ${styles.logoElementTwo}`} />
            <span className={`${styles.logoElement} ${styles.logoElementThree}`} />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.welcomeSection}`}>
        <div className={styles.welcomeContent}>
          <span className={styles.tagline}>Welcome to Ankahee</span>
          <h2 className={styles.sectionTitle}>A space for support before things have to fall apart.</h2>
          <p className={styles.aboutText}>
            Ankahee did not begin as a business idea. It began with a question we kept coming back to: what might be different if people could access the right support at the right time?
          </p>
          <p className={styles.aboutText}>
            We imagine therapy as one part of a wider support system: a place where you can pause, make sense of what you are carrying, and reconnect with the people, values, places, and parts of yourself that matter to you.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.tagline}>Support Pathways</span>
          <h2 className={styles.sectionTitle}>How We Can Work Together</h2>
          <p className={styles.sectionSubtitle}>We shape therapy around you, your goals, and what feels meaningful. Choose a pathway to read more.</p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((svc, i) => (
            <Link key={i} href="/services" className={styles.serviceCard}>
              <div className={styles.serviceIcon} style={{ backgroundColor: svc.color }}>
                <Image src="/short-logo.png" alt="" width={30} height={30} />
              </div>
              <h3 className={styles.serviceTitle}>{svc.title}</h3>
              <p className={styles.serviceText}>{svc.desc}</p>
              <span className={styles.serviceLink}>Learn more</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact & Booking Section */}
      <section id="booking" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.tagline}>Getting Started</span>
          <h2 className={styles.sectionTitle}>Request a Consultation</h2>
          <p className={styles.sectionSubtitle}>Send us an inquiry if you are ready to start your mental health journey.</p>
        </div>
        <div className={styles.bookingGrid}>
          <div className={styles.contactDetails}>
            <div className={styles.bookingSteps}>
              <h3 className={styles.contactTitle}>Booking Steps</h3>
              <ol>
                {bookingSteps.map((step, index) => (
                  <li key={step}>
                    <span>{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.contactCard}>
              <h3 className={styles.contactTitle}>Our Practice Info</h3>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email Address</span>
                  <a href="mailto:care@ankahee.in" className={styles.contactValue}>care@ankahee.in</a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Consultation Fees</span>
                  <span className={styles.contactValue}>1200 - 1500 INR / session</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Availability</span>
                  <span className={styles.contactValue}>6 Days a Week</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Session Formats</span>
                  <span className={styles.contactValue}>Remote Online Only (India-wide)</span>
                </div>
              </div>
            </div>
          </div>
          <BookingForm />
        </div>
      </section>

      <section className={`${styles.section} ${styles.footerCta}`}>
        <Link href="/about" className={styles.aboutLink}>Read the Origin Story</Link>
      </section>

      <Footer />
    </div>
  );
}
