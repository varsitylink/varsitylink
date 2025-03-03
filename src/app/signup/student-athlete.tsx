'use client';

import { useForm } from 'react-hook-form';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';
import { StudentAthlete } from '@prisma/client';
import { useRouter } from 'next/navigation';

export default function StudentAthleteSignup() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset } = useForm<StudentAthlete>({
    defaultValues: {
      industries: [],
      marketingOptions: [],
    },
  });

  // Define marketing options (simplified to match our enum)
  const marketingOptions = [
    'SocialMediaPosts',
    'InPersonAppearances'
  ];

  const onSubmit = async (data: StudentAthlete) => {
    try {
      const response = await fetch('/api/student-athlete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          compensation: ['InKind', 'FixedFee'],
          introBlurb: data.introBlurb || `Hi, I'm ${data.name}, a ${data.sport} athlete!`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      setSubmitted(true);
      reset();
      router.push(`/student-athlete-profile?id=${result.id}`);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  if (submitted) {
    return (
      <>
        <Typography variant="h4" color="primary" gutterBottom>
          Thank You For Signing Up!
        </Typography>
        <Typography variant="body1" component="p">
          Your information has been successfully submitted. Our team will review your application and contact you soon.
        </Typography>
      </>
    );
  }

  const industriesList = [
    'Restaurants',
    'Supplement Companies',
    'Sports Equipment',
    'Fashion',
    'Beauty',
  ];

  const sportOptions = [
    'Football',
    'Basketball',
    'Baseball',
    'Soccer',
    'Volleyball',
    'Track & Field',
    'Swimming',
    'Tennis',
    'Golf',
    'Other'
  ];

  const genderOptions = [
    'Male',
    'Female',
    'Non-binary',
    'Prefer not to say'
  ];

  const ethnicityOptions = [
    'Asian',
    'Black or African American',
    'Hispanic or Latino',
    'Native American',
    'Pacific Islander',
    'White',
    'Two or More Races',
    'Prefer not to say'
  ];

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Name"
          variant="outlined"
          placeholder="John Doe"
          {...register('name', { required: true })}
          required
          fullWidth
        />

        <TextField
          label="Email"
          variant="outlined"
          placeholder="john@example.com"
          {...register('email', { required: true })}
          type="email"
          required
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel id="sport-label">Sport</InputLabel>
          <Select
            labelId="sport-label"
            label="Sport"
            defaultValue=""
            {...register('sport', { required: true })}
          >
            {sportOptions.map((sport) => (
              <MenuItem key={sport} value={sport}>
                {sport}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Age"
          variant="outlined"
          placeholder="e.g., 20"
          {...register('age', {
            valueAsNumber: true,
            required: true,
            min: { value: 16, message: "Age must be at least 16" },
            max: { value: 30, message: "Age must be under 30" }
          })}
          type="number"
          required
          fullWidth
        />

        <TextField
          label="Major"
          variant="outlined"
          placeholder="e.g., Business"
          {...register('major', { required: true })}
          required
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            label="Gender"
            defaultValue=""
            {...register('gender', { required: true })}
          >
            {genderOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel id="ethnicity-label">Ethnicity</InputLabel>
          <Select
            labelId="ethnicity-label"
            label="Ethnicity"
            defaultValue=""
            {...register('ethnicity', { required: true })}
          >
            {ethnicityOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Social Media Profiles
        </Typography>

        <TextField
          label="Instagram"
          variant="outlined"
          placeholder="e.g., @john_insta"
          {...register('instagram')}
          fullWidth
        />

        <TextField
          label="TikTok"
          variant="outlined"
          placeholder="e.g., @john_tiktok"
          {...register('tiktok')}
          fullWidth
        />

        <TextField
          label="Pinterest"
          variant="outlined"
          placeholder="e.g., @john_pinterest"
          {...register('pinterest')}
          fullWidth
        />

        <TextField
          label="LinkedIn"
          variant="outlined"
          placeholder="LinkedIn profile URL"
          {...register('linkedIn')}
          fullWidth
        />

        <TextField
          label="X Username"
          variant="outlined"
          placeholder="e.g., @john_x"
          {...register('twitter')}
          fullWidth
        />

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Preferences
        </Typography>

        <Typography variant="subtitle1">Select Industries You&apos;d Work With:</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem' }}>
          {industriesList.map((industry) => (
            <FormControlLabel
              key={industry}
              control={
                <Checkbox
                  value={industry}
                  {...register('industries')}
                />
              }
              label={industry}
            />
          ))}
        </div>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>Marketing Options You&apos;d Be Willing to Do:</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem' }}>
          {marketingOptions.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  value={option}
                  {...register('marketingOptions')}
                />
              }
              label={option}
            />
          ))}
        </div>

        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 4,
            bgcolor: '#4767F5',
            '&:hover': {
              bgcolor: '#3852c4'
            },
            padding: '0.75rem',
            fontSize: '1rem'
          }}
        >
          Submit
        </Button>
      </form>
    </main>
  );
}
