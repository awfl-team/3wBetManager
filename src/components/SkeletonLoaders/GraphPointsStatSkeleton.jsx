import React from 'react';
import ContentLoader from 'react-content-loader';


class GraphPointsStatSkeleton extends React.Component {
  render() {
    return (
      <ContentLoader
        height={400}
        width={1000}
        speed={2}
        primaryColor="#1D2935"
        secondaryColor="#304457"
      >
        <rect x="0" y="390" rx="0" ry="0" width="800" height="10" />
        <rect x="0" y="60" rx="0" ry="0" width="10" height="340" />
        <circle cx="150" cy="250" r="5" />
        <circle cx="300" cy="180" r="5" />
        <circle cx="450" cy="150" r="5" />
        <circle cx="600" cy="230" r="5" />
        <circle cx="750" cy="190" r="5" />
        <rect x="37" y="290" rx="0" ry="0" width="150" height="3" transform="rotate(335)" />
        <rect x="-230" y="280" rx="0" ry="0" width="150" height="3" transform="rotate(315)" />
        <rect x="-230" y="280" rx="0" ry="0" width="150" height="3" transform="rotate(315)" />
        <rect x="269" y="233" rx="0" ry="0" width="136" height="3" transform="rotate(349)" />
        <rect x="479" y="-90" rx="0" ry="0" width="152" height="3" transform="rotate(29)" />
        <rect x="513" y="398" rx="0" ry="0" width="142" height="3" transform="rotate(-17)" />
        <rect x="200" y="9" rx="0" ry="0" width="400" height="25" />
      </ContentLoader>
    );
  }
}

export default GraphPointsStatSkeleton;
