import React from 'react';
import ContentLoader from 'react-content-loader';


class ProfilSkeleton extends React.Component {
  render() {
    return (
      <ContentLoader
        height={400}
        width={1700}
        speed={2}
        primaryColor="#1D2935"
        secondaryColor="#304457"
      >
        <circle cx="50" cy="40" r="20" />
        <circle cx="50" cy="90" r="20" />
        <circle cx="50" cy="140" r="20" />
        <rect x="1620" y="40" rx="0" ry="0" width="80" height="20" />
        <rect x="650" y="106" rx="0" ry="0" width="400" height="49" />
        <rect x="700" y="170" rx="0" ry="0" width="300" height="31" />
        <rect x="700" y="218" rx="0" ry="0" width="300" height="28" />
        <rect x="100" y="350" rx="0" ry="0" width="1500" height="5" />
        <rect x="100" y="30" rx="0" ry="0" width="100" height="20" />
        <rect x="100" y="80" rx="0" ry="0" width="100" height="20" />
        <rect x="100" y="130" rx="0" ry="0" width="100" height="20" />
        <circle cx="750" cy="300" r="30" />
        <circle cx="850" cy="300" r="30" />
        <circle cx="950" cy="300" r="30" />
      </ContentLoader>
    );
  }
}

export default ProfilSkeleton;
