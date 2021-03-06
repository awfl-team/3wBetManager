import React from 'react';
import ContentLoader from 'react-content-loader';


class ResultsBetsSkeleton extends React.Component {
  render() {
    return (
      <ContentLoader
        height={500}
        width={1700}
        speed={2}
        primaryColor="#1D2935"
        secondaryColor="#304457"
      >
        <circle cx="405" cy="40" r="40" />
        <circle cx="1275" cy="40" r="40" />
        <rect x="285" y="130" rx="0" ry="0" width="250" height="20" />
        <rect x="1163" y="130" rx="0" ry="0" width="250" height="20" />
        <rect x="330" y="100" rx="0" ry="0" width="156" height="20" />
        <rect x="1200" y="100" rx="0" ry="0" width="156" height="20" />
        <rect x="700" y="30" rx="0" ry="0" width="300" height="60" />
        <rect x="700" y="110" rx="0" ry="0" width="300" height="60" />
        <rect x="700" y="220" rx="0" ry="0" width="300" height="4" />
        <circle cx="405" cy="280" r="40" />
        <circle cx="1275" cy="280" r="40" />
        <rect x="285" y="370" rx="0" ry="0" width="250" height="20" />
        <rect x="1163" y="370" rx="0" ry="0" width="250" height="20" />
        <rect x="330" y="340" rx="0" ry="0" width="156" height="20" />
        <rect x="1200" y="340" rx="0" ry="0" width="156" height="20" />
        <rect x="700" y="280" rx="0" ry="0" width="300" height="60" />
        <rect x="700" y="360" rx="0" ry="0" width="300" height="60" />
        <rect x="700" y="450" rx="0" ry="0" width="300" height="4" />
      </ContentLoader>
    );
  }
}

export default ResultsBetsSkeleton;
