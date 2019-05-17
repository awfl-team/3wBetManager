import React from 'react';
import ContentLoader from 'react-content-loader';


class PieStatSkeleton extends React.Component {
  render() {
    return (
      <ContentLoader
        height={300}
        width={425}
        speed={2}
        primaryColor="#1D2935"
        secondaryColor="#304457"
      >
        <circle cx="200" cy="150" r="100" />
        <rect x="100" y="0" rx="0" ry="0" width="200" height="30" />
      </ContentLoader>
    );
  }
}

export default PieStatSkeleton;
