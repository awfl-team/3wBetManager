import React from 'react';
import ContentLoader from 'react-content-loader';


class DashboardStatSkeleton extends React.Component {
  render() {
    return (
      <ContentLoader
        height={300}
        width={850}
        speed={2}
        primaryColor="#1D2935"
        secondaryColor="#304457"
      >
        <circle cx="425" cy="100" r="100" />
        <rect x="100" y="250" rx="0" ry="0" width="275" height="30" />
        <rect x="475" y="250" rx="0" ry="0" width="275" height="30" />
      </ContentLoader>
    );
  }
}

export default DashboardStatSkeleton;
