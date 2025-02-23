import React from 'react';

interface SkipLinksProps {
  searchFormId: string;
  resultsId: string;
}

const SkipLinks: React.FC<SkipLinksProps> = ({ searchFormId, resultsId }) => {
  return (
    <div role="navigation" aria-label="Skip links">
      <a
        href={`#${searchFormId}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:m-3 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:z-50 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Skip to search form
      </a>
      <a
        href={`#${resultsId}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-40 focus:m-3 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:z-50 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Skip to flight results
      </a>
    </div>
  );
};

export default SkipLinks;