import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function AboutPage() {
  const values = [
    {
      title: "Empowerment",
      desc: "We want therapy to leave you feeling more capable of being the person steering your own life. We want you to feel that you have choices in how you respond to life's challenges, and that you are allowed to take up space in your own story."
    },
    {
      title: "Prevention",
      desc: "You do not have to wait until things become unbearable to deserve support. We believe mental health care can be something we turn to along the way, helping us understand ourselves, navigate challenges, and build support before we reach a crisis point."
    },
    {
      title: "Restoration",
      desc: "Sometimes things become overwhelming. We want therapy to be a space where you can come as you are. Together, we can make sense of what is happening, find ways to get through immediate challenges, and gradually help you feel steady again."
    },
    {
      title: "Alignment",
      desc: "We want therapy to help you understand what matters to you and make choices that feel more aligned with your values, relationships, and the kind of person you want to be. The question is what feels right and meaningful for you."
    },
    {
      title: "Autonomy",
      desc: "We believe you are the person who knows your life from the inside. Therapy can offer another perspective, a place to pause, and someone to think things through with, but you remain the person steering the process."
    },
    {
      title: "Acceptance",
      desc: "Some things in life are within our control, and some are not. We make space for both. Acceptance is not about giving up; it's about understanding what we can change, making peace with what we cannot, and deciding where to put our energy."
    }
  ];

  return (
    <div className={styles.container}>
      <Header />
      
      <section className={styles.headerSection}>
        <h1 className={styles.title}>Origin Story</h1>
        <p className={styles.subtitle}>
          The story, mission, vision, and values behind Ankahee.
        </p>
      </section>

      <main className={styles.content}>
        
        {/* Who We Are & Story */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How Ankahee Began</h2>
          <p className={styles.text}>
            Ankahee is an online therapy practice founded by Reetika and Manvi. We work with individuals and couples across India, supporting people through anxiety, relationship concerns, grief, trauma, burnout, ADHD, self-esteem, parenting, and similar emotional challenges.
          </p>
          <p className={styles.text}>
            Ankahee did not begin as a business idea. It began with a question we kept coming back to: what might be different if people could access the right support at the right time?
          </p>
          <p className={styles.text}>
            Both of us have seen, personally and professionally, how much easier it can be to navigate difficult periods when you have the right people and the right kind of support around you. We have also seen how often people wait until things feel unbearable before reaching out. And often, it isn&apos;t because they don&apos;t know that help exists. There is something quieter underneath it, something we learn almost without noticing: <em>&ldquo;Maybe I&apos;m asking for too much. Maybe someone else needs it more. I should be able to handle this on my own.&rdquo;</em>
          </p>
          <p className={styles.text}>
            We can become so used to carrying things quietly that we forget we are allowed to put some of them down.
          </p>
          <p className={styles.text}>
            We want mental health support to feel more accessible, more human, and more woven into everyday life: to make room for prevention alongside intervention, and for care before things fall apart.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className={styles.missionVisionGrid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Our Mission</h3>
            <p className={styles.text}>
              To make mental health understanding more accessible and meaningful, helping people move beyond labels and awareness towards self-understanding, intentional choices, and value-based action.
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Our Vision</h3>
            <ul className={styles.bulletList}>
              <li className={styles.bulletItem}>
                <span className={styles.bullet}>•</span>
                A community where you don&apos;t have to wait until things feel unbearable to ask for support.
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.bullet}>•</span>
                A culture where seeking support is seen as a part of being human, not a reflection of weakness or burden.
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.bullet}>•</span>
                A world where people feel supported in developing the agency and confidence to navigate challenges in their own way.
              </li>
            </ul>
          </div>
        </section>

        {/* Values */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <details key={i} className={styles.valueCard}>
                <summary className={styles.valueTitle}>
                  {v.title}
                  <span aria-hidden="true">→</span>
                </summary>
                <p className={styles.valueText}>{v.desc}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
