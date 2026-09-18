'use client';

import React, { useState } from 'react';
import styles from './BookingForm.module.css';

interface BookingFormProps {
  defaultTherapist?: string;
  therapistOptions?: { name: string; slug: string }[];
}

export default function BookingForm({ 
  defaultTherapist = 'any', 
  therapistOptions = [
    { name: 'Reetika Shah (Consultant Psychologist)', slug: 'reetika-shah' },
    { name: 'Manvi Jain (Counselling Psychologist)', slug: 'manvi-jain' },
    { name: 'Any / First Available', slug: 'any' }
  ]
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactMethod: 'WhatsApp',
    enquiryType: 'Individual Therapy',
    message: '',
    therapist: defaultTherapist,
    consent: false
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      setErrorMessage('Please consent to be contacted to submit the form.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      if (result.success) {
        setStatus('success');
      } else {
        setErrorMessage(result.error || 'Failed to submit booking inquiry.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('An error occurred. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.formContainer}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.title}>Thank You!</h2>
          <p>Your booking inquiry has been recorded successfully.</p>
          <p className={styles.subtitle}>We typically respond within 24-48 hours via your preferred contact method ({formData.contactMethod}).</p>
          <button 
            className={styles.submitBtn} 
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                phone: '',
                contactMethod: 'WhatsApp',
                enquiryType: 'Individual Therapy',
                message: '',
                therapist: defaultTherapist,
                consent: false
              });
              setStatus('idle');
            }}
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Book a Session</h2>
      <p className={styles.subtitle}>Fill out this form to request a consultation. We will get in touch with you shortly.</p>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">Full Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            placeholder="Your name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email Address *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="your.email@example.com"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="phone">WhatsApp Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="e.g. +91 98765 43210"
              className={styles.input}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="contactMethod">Preferred Contact Method</label>
            <select 
              id="contactMethod" 
              name="contactMethod" 
              className={styles.select}
              value={formData.contactMethod}
              onChange={handleChange}
            >
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="enquiryType">Enquiry Type</label>
            <select 
              id="enquiryType" 
              name="enquiryType" 
              className={styles.select}
              value={formData.enquiryType}
              onChange={handleChange}
            >
              <option value="Individual Therapy">Individual Therapy</option>
              <option value="Couples Therapy">Couples Therapy</option>
              <option value="EAP">Employee Assistance (EAP)</option>
              <option value="Workshop/Training">Workshop/Training Enquiry</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="therapist">Preferred Therapist</label>
          <select 
            id="therapist" 
            name="therapist" 
            className={styles.select}
            value={formData.therapist}
            onChange={handleChange}
          >
            {therapistOptions.map(opt => (
              <option key={opt.slug} value={opt.slug}>{opt.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="message">Message / Preferences</label>
          <textarea 
            id="message" 
            name="message" 
            placeholder="Let us know your availability or any preferences. (Please do not share sensitive emergency details here.)"
            className={styles.textarea}
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className={styles.disclaimer}>
          <strong>Please note:</strong> Ankahee offers scheduled therapy and counselling. If you are experiencing a mental health crisis, feel like you might hurt yourself or someone else, or need urgent support, please reach out to your nearest hospital or access instant helpline directories on <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer">findahelpline.com</a>. You do not have to carry it alone.
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              name="consent" 
              required
              className={styles.checkbox}
              checked={formData.consent}
              onChange={handleChange}
            />
            I consent to being contacted by Ankahee therapists at the provided email/WhatsApp number.
          </label>
        </div>

        {status === 'error' && (
          <p style={{ color: '#d93025', fontSize: '0.9rem', fontWeight: 600 }}>
            {errorMessage}
          </p>
        )}

        <button 
          type="submit" 
          className={styles.submitBtn} 
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  );
}
