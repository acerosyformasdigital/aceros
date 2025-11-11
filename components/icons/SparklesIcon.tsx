import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6-11.5A.5.5 0 0 1 3 2l11.5 6a2 2 0 0 0 1.437-1.437l-1.5-3.5a.5.5 0 0 1 .937-.312l3.5 1.5A2 2 0 0 0 22 3l-6 11.5a.5.5 0 0 1-.937.312l-1.5-3.5a2 2 0 0 0-3.563-3.563l-3.5 1.5A.5.5 0 0 1 6 13l1.5 3.5a2 2 0 0 0 2.437 2.437z" />
    <path d="M12 22a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-1 0v2a.5.5 0 0 0 .5.5z" />
    <path d="M22 12a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5z" />
    <path d="m18 18-.5.5a.5.5 0 0 0 0 .707l1.414 1.414a.5.5 0 0 0 .707-.707L18.5 18a.5.5 0 0 0-.5-.5z" />
  </svg>
);

export default SparklesIcon;
