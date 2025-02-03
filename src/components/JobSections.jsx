import React from 'react';
import Section from './Section';

export default function JobSections({ jobListings, loadingJobs }) {
  return (
    <div className="space-y-8">
      <Section 
        title="Essential Courses"
        items={jobListings}
        loading={loadingJobs}
      />
      <Section 
        title="Free Courses"
        items={jobListings}
        loading={loadingJobs}
        type="free"
      />
      <Section 
        title="Paid Courses"
        items={jobListings}
        loading={loadingJobs}
        type="paid"
      />
      <Section 
        title="Work Experience Opportunities"
        items={jobListings}
        loading={loadingJobs}
        type="opportunity"
      />
    </div>
  );
}