import React from 'react';
import ContentLoader from 'react-content-loader';


class LimitedBetsSkeleton extends React.Component {
  render() {
    return (
      <ContentLoader
        height={500}
        width={850}
        speed={2}
        primaryColor="#1D2935"
        secondaryColor="#304457"
      >
        <circle cx="330" cy="50" r="40" />
        <circle cx="520" cy="50" r="40" />
        <rect x="410" y="40" rx="0" ry="0" width="20" height="20" />
        <rect x="65" y="30" rx="0" ry="0" width="200" height="20" />
        <rect x="140" y="60" rx="0" ry="0" width="125" height="20" />
        <rect x="590" y="30" rx="0" ry="0" width="200" height="20" />
        <rect x="590" y="60" rx="0" ry="0" width="125" height="20" />
        <circle cx="330" cy="150" r="40" />
        <circle cx="520" cy="150" r="40" />
        <rect x="410" y="140" rx="0" ry="0" width="20" height="20" />
        <rect x="65" y="130" rx="0" ry="0" width="200" height="20" />
        <rect x="140" y="160" rx="0" ry="0" width="125" height="20" />
        <rect x="590" y="130" rx="0" ry="0" width="200" height="20" />
        <rect x="590" y="160" rx="0" ry="0" width="125" height="20" />
        <circle cx="330" cy="250" r="40" />
        <circle cx="520" cy="250" r="40" />
        <rect x="410" y="240" rx="0" ry="0" width="20" height="20" />
        <rect x="65" y="230" rx="0" ry="0" width="200" height="20" />
        <rect x="140" y="260" rx="0" ry="0" width="125" height="20" />
        <rect x="590" y="230" rx="0" ry="0" width="200" height="20" />
        <rect x="590" y="260" rx="0" ry="0" width="125" height="20" />
        <circle cx="330" cy="350" r="40" />
        <circle cx="520" cy="350" r="40" />
        <rect x="410" y="340" rx="0" ry="0" width="20" height="20" />
        <rect x="65" y="330" rx="0" ry="0" width="200" height="20" />
        <rect x="140" y="360" rx="0" ry="0" width="125" height="20" />
        <rect x="590" y="330" rx="0" ry="0" width="200" height="20" />
        <rect x="590" y="360" rx="0" ry="0" width="125" height="20" />
      </ContentLoader>
    );
  }
}

export default LimitedBetsSkeleton;
