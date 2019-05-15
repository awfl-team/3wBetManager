import React from 'react';
import ContentLoader from 'react-content-loader';


class GraphStatSkeleton extends React.Component {
  render() {
    return (
      <ContentLoader
        height={400}
        width={800}
        speed={2}
        primaryColor="#1D2935"
        secondaryColor="#304457"
      >
        <rect x="0" y="390" rx="0" ry="0" width="800" height="10" />
        <rect x="0" y="60" rx="0" ry="0" width="10" height="340" />
        <rect x="20" y="180" rx="0" ry="0" width="125" height="200" />
        <rect x="180" y="80" rx="0" ry="0" width="125" height="300" />
        <rect x="340" y="130" rx="0" ry="0" width="125" height="250" />
        <rect x="500" y="300" rx="0" ry="0" width="125" height="80" />
        <rect x="655" y="280" rx="0" ry="0" width="125" height="100" />
        <rect x="200" y="9" rx="0" ry="0" width="400" height="25" />
      </ContentLoader>
    );
  }
}

export default GraphStatSkeleton;
