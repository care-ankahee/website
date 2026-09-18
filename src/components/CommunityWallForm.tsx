'use client';

import React, { useState } from 'react';
import styles from './CommunityWallForm.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function CommunityWallForm() {
  const [message, setMessage] = useState('');
  const [shareIdentity, setShareIdentity] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const submitExpression = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const response = await fetch('/api/community-wall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          name: shareIdentity ? name : '',
          email: shareIdentity ? email : '',
          isAnonymous: !shareIdentity
        })
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Unable to save your note right now.');
      }

      setMessage('');
      setName('');
      setEmail('');
      setShareIdentity(false);
      setStatus('success');
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to save your note right now.');
      setStatus('error');
    }
  };

  return (
    <form className={styles.form} onSubmit={submitExpression}>
      <div className={styles.formHeader}>
        <span>Community Wall</span>
        <h2>Write what you want to express.</h2>
      </div>

      <label className={styles.field}>
        <span>Your note</span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          minLength={5}
          maxLength={900}
          placeholder="Leave a thought, confession, hope, memory, or anything you want to put down."
        />
      </label>

      <fieldset className={styles.identityChoice}>
        <legend>How would you like to share?</legend>
        <label className={styles.choice}>
          <input
            type="radio"
            name="identity"
            checked={!shareIdentity}
            onChange={() => setShareIdentity(false)}
          />
          Post anonymously
        </label>
        <label className={styles.choice}>
          <input
            type="radio"
            name="identity"
            checked={shareIdentity}
            onChange={() => setShareIdentity(true)}
          />
          Add my name and email
        </label>
      </fieldset>

      {shareIdentity && (
        <div className={styles.identityGrid}>
          <label className={styles.field}>
            <span>Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              required={shareIdentity}
            />
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required={shareIdentity}
            />
          </label>
        </div>
      )}

      {!shareIdentity && (
        <p className={styles.anonymousNote}>Your note will be submitted anonymously.</p>
      )}

      {status === 'success' && <p className={styles.success}>Your note has been added to the wall queue.</p>}
      {status === 'error' && <p className={styles.error}>{error}</p>}

      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Submit to the Wall'}
      </button>
    </form>
  );
}
