import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { getTherapists, getTestimonials } from '@/lib/sanity';
import { Therapist, Testimonial } from '@/data/db';
import styles from './page.module.css';


export default async function Home() {
  const therapistsList = await getTherapists();
  const allTestimonials = await getTestimonials();
  
  // Slice to show a subset of testimonials on the home page
  const homeTestimonials = allTestimonials.slice(0, 3);

  const services = [
    {
      title: "Individual Therapy",
      icon: "🌱",
      color: "var(--color-peach)",
      desc: "Online therapy for adults navigating anxiety, depression, stress, trauma, grief, ADHD, relationship concerns, self-esteem, identity, emotional regulation, and life transitions."
    },
    {
      title: "Couples Therapy",
      icon: "🤝",
      color: "var(--color-gold)",
      desc: "Support for couples looking to improve communication, navigate conflict, rebuild trust, strengthen intimacy, and work through life's challenges together."
    },
    {
      title: "Employee Assistance (EAP)",
      icon: "🏢",
      color: "var(--color-teal)",
      desc: "Comprehensive mental health support for organisations through counselling, workshops, training programmes, wellbeing initiatives, and customised EAP."
    },
    {
      title: "Workshops",
      icon: "🗣️",
      color: "var(--color-purple)",
      desc: "Interactive workshops on mental health, emotional wellbeing, boundaries, stress management, resilience, and workplace wellbeing for communities and schools."
    },
    {
      title: "Training Programmes",
      icon: "📚",
      color: "var(--color-sage)",
      desc: "Experiential training programmes for students and early-career mental health professionals on counselling microskills, reflective practice, and meaningful work."
    }
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
            Ankahee is an online therapy practice offering individual and couples therapy across India in English, Hindi, Marwari, and Nepali. Therapy starts with a conversation.
          </p>
          <div className={styles.heroButtons}>
            <Link href="#booking" className={styles.primaryBtn}>Book a Session</Link>
            <Link href="#team" className={styles.secondaryBtn}>Meet the Therapists</Link>
          </div>
        </div>
        <div className={styles.heroIllustration}>
          <div className={styles.mainBlob}>
            <Image 
              src="/main-logo.jpg" 
              alt="Ankahee Logo Illustration" 
              width={200} 
              height={200}
              className={styles.logoImage}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.tagline}>Support Pathways</span>
          <h2 className={styles.sectionTitle}>How We Can Work Together</h2>
          <p className={styles.sectionSubtitle}>We shape therapy around you, your goals, and what feels most meaningful, rather than following a fixed method.</p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((svc, i) => (
            <div key={i} className={styles.serviceCard}>
              <div className={styles.serviceIcon} style={{ backgroundColor: svc.color }}>
                {svc.icon}
              </div>
              <h3 className={styles.serviceTitle}>{svc.title}</h3>
              <p className={styles.serviceText}>{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.section} style={{ background: '#f8f5ee' }}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutIllustration}>
            🪺
          </div>
          <div className={styles.aboutContent}>
            <span className={styles.tagline}>Our Origin Story</span>
            <h2 className={styles.sectionTitle}>The Space We Wanted to Build</h2>
            <p className={styles.aboutText}>
              Ankahee did not begin as a business idea. It began with a question we kept coming back to: what might be different if people could access the right support at the right time?
            </p>
            <p className={styles.aboutText}>
              We can become so used to carrying things quietly that we forget we are allowed to put some of them down. We imagine a world where you do not have to wait until things feel unbearable to ask for support.
            </p>
            <blockquote className={styles.storyQuote}>
              &ldquo;Needing a little support along the way does not mean you lack the capacity to find your way. Sometimes, we just need someone to walk beside us for a while.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.tagline}>Our Team</span>
          <h2 className={styles.sectionTitle}>Meet Your Therapists</h2>
          <p className={styles.sectionSubtitle}>Qualified psychologists with deep clinical experience, dedicated to walking alongside you.</p>
        </div>
        <div className={styles.teamGrid}>
          {therapistsList.map((therapist: Therapist) => (
            <div key={therapist.slug} className={styles.teamCard}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={therapist.headshot} 
                  alt={therapist.name} 
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.teamInfo}>
                <h3 className={styles.teamName}>
                  {therapist.name}
                  <span className={styles.pronouns}>{therapist.pronouns}</span>
                </h3>
                <p className={styles.teamRole}>{therapist.role}</p>
                <p className={styles.teamBio}>{therapist.shortBio}</p>
                <Link href={`/therapist/${therapist.slug}`} className={styles.viewProfileLink}>
                  View Full Profile & Q&A &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waiting Room Teaser */}
      <section className={styles.section}>
        <div className={styles.waitingRoomTeaser}>
          <div className={styles.teaserContent}>
            <span className={styles.tagline}>Interactive Space</span>
            <h2 className={styles.teaserTitle}>The Waiting Room</h2>
            <p className={styles.teaserText}>
              Before or after a session, or anytime you need a quiet pause, step into our Waiting Room. It is a playful, self-guided space designed to help you ground yourself, color your mood, morph some clouds, or doodle your feelings.
            </p>
            <Link href="/waiting-room" className={styles.primaryBtn} style={{ alignSelf: 'flex-start' }}>
              Enter the Waiting Room
            </Link>
          </div>
          <div className={styles.teaserAnimation}>
            <Image 
              src="/waiting-room/Doodle design.jpeg" 
              alt="Doodle activity"
              width={200}
              height={200}
              className={styles.teaserImage}
            />
            <Image 
              src="/waiting-room/cloud watcher.jpg" 
              alt="Cloud watcher activity"
              width={200}
              height={200}
              className={styles.teaserImage}
            />
            <Image 
              src="/waiting-room/color your mood 1.jpg" 
              alt="Color your mood activity"
              width={200}
              height={200}
              className={styles.teaserImage}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section} style={{ background: '#fcfaf6' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.tagline}>Kind Words</span>
          <h2 className={styles.sectionTitle}>Client Experiences</h2>
          <p className={styles.sectionSubtitle}>Therapy is a collaborative journey. Here is what some of our clients have shared about their growth.</p>
        </div>
        <div className={styles.testimonialsGrid}>
          {homeTestimonials.map((t: Testimonial, idx: number) => (
            <div key={idx} className={styles.testimonialCard}>
              <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
              <div className={styles.clientMeta}>
                <span>Age {t.age} | {t.gender}</span>
                <span style={{ color: 'var(--color-peach)' }}>
                  {t.therapistSlug === 'reetika-shah' ? 'Reetika\'s Client' : 'Manvi\'s Client'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Booking Section */}
      <section id="booking" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.tagline}>Getting Started</span>
          <h2 className={styles.sectionTitle}>Request a Consultation</h2>
          <p className={styles.sectionSubtitle}>Ready to put some down? Send us an inquiry and we\'ll assist you in scheduling.</p>
        </div>
        <div className={styles.bookingGrid}>
          <div className={styles.contactDetails}>
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
                  <span className={styles.contactValue}>6 Days a Week (Except Wednesdays)</span>
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

      <Footer />
    </div>
  );
}
