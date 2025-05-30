
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const MegaphoneIcon = (props: IconProps): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 3.94A1.042 1.042 0 0111.43 4.56l1.038.898c.07.06.15.098.23.12l1.517.433c.34.097.646.306.848.608l.498.746c.06.09.13.17.21.24l1.082.926c.26.224.28.62.04.88l-.502.54a1.14 1.14 0 01-1.52-.15L13.5 8.25M10.34 3.94L9.3 4.838M13.5 8.25l-1.07-1.82C12.21 6.07 11.8 6 11.36 6H4.5A2.25 2.25 0 002.25 8.25v7.5A2.25 2.25 0 004.5 18h5.25a2.25 2.25 0 002.25-2.25V13.5M10.34 3.94A2.251 2.251 0 008.25 2.25H4.5A2.25 2.25 0 002.25 4.5M13.5 8.25V15M18 9.75v4.5M15.75 12H21M8.25 6H6.75" />
  </svg>
);
