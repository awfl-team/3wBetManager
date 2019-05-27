import React from 'react';
import ContentLoader from 'react-content-loader';


class Top3Skeleton extends React.Component {
  render() {
    return (
      <ContentLoader
        height={300}
        width={850}
        speed={2}
        primaryColor="#1D2935"
        secondaryColor="#304457"
      >
        <circle cx="60" cy="60" r="40" />
        <rect x="325" y="20" rx="0" ry="0" width="200" height="20" />
        <rect x="225" y="60" rx="0" ry="0" width="400" height="20" />
        <circle cx="60" cy="160" r="40" />
        <rect x="325" y="120" rx="0" ry="0" width="200" height="20" />
        <rect x="225" y="160" rx="0" ry="0" width="400" height="20" />
        <circle cx="60" cy="260" r="40" />
        <rect x="325" y="220" rx="0" ry="0" width="200" height="20" />
        <rect x="225" y="260" rx="0" ry="0" width="400" height="20" />
      </ContentLoader>
    );
  }
}

export default Top3Skeleton;
