import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import styles from './page.module.css';

export default function ServicesPage() {
  const serviceDetails = [
    {
      title: "Individual Therapy",
      icon: "🌱",
      color: "var(--color-peach)",
      desc: "Online therapy for adults navigating anxiety, depression, stress, trauma, grief, ADHD, relationship concerns, self-esteem, identity, emotional regulation, and life transitions. We begin by understanding what brings you here, while also exploring the experiences, relationships, and environments that have shaped who you are."
    },
    {
      title: "Couples Therapy",
      icon: "🤝",
      color: "var(--color-gold)",
      desc: "Support for couples looking to improve communication, navigate conflict, rebuild trust, strengthen intimacy, and work through life's challenges together. We work collaboratively to help both partners understand recurring patterns and find ways of connecting that feel secure, supportive, and meaningful."
    },
    {
      title: "Employee Assistance Programmes (EAP)",
      icon: "🏢",
      color: "var(--color-teal)",
      desc: "Comprehensive mental health support for organisations through counselling, interactive workshops, training programmes, wellbeing initiatives, and custom-designed employee assistance programmes tailored to employee needs."
    },
    {
      title: "Workshops",
      icon: "🗣️",
      color: "var(--color-purple)",
      desc: "Interactive workshops on mental health, emotional wellbeing, relationships, boundaries, stress management, resilience, and workplace wellbeing. Customised workshops are available for community groups, educational institutions, and corporate teams."
    },
    {
      title: "Training Programmes",
      icon: "📚",
      color: "var(--color-sage)",
      desc: "Experiential training programmes for students, early-career mental health professionals, and organisations on counselling microskills, therapeutic relationships, reflective practice, and the foundational elements of meaningful therapeutic work."
    }
  ];

  return (
    <div className={styles.container}>
      <Header />
      
      <section className={styles.headerSection}>
        <h1 className={styles.title}>Services & Support Pathways</h1>
        <p className={styles.subtitle}>
          How we can work together. We shape therapy around you, your goals, and what feels most meaningful, rather than following a fixed method.
        </p>
      </section>

      <main className={styles.content}>
        {serviceDetails.map((service, i) => (
          <div key={i} className={styles.serviceBlock}>
            <div className={styles.serviceHeader}>
              <div className={styles.iconWrapper} style={{ backgroundColor: service.color }}>
                {service.icon}
              </div>
              <h2 className={styles.serviceTitle}>{service.title}</h2>
            </div>
            <p className={styles.description}>
              {service.desc}
            </p>
          </div>
        ))}

        <div className={styles.ctaBox}>
          <p className={styles.ctaText}>
            Unsure which service fits your current requirements? Let\'s talk and figure it out together.
          </p>
          <Link href="/#booking" className={styles.ctaBtn}>
            Book a Consultation
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
