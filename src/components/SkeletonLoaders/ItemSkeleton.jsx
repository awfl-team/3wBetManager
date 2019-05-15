import React from 'react';
import ContentLoader from 'react-content-loader';


class ItemSkeleton extends React.Component {
  render() {
    return (
      <ContentLoader
        height={400}
        width={1700}
        speed={2}
        primaryColor="#1D2935"
        secondaryColor="#304457"
      >
        <rect x="50" y="25" rx="0" ry="0" width="325" height="300" />
        <rect x="50" y="350" rx="0" ry="0" width="325" height="50" />
        <rect x="475" y="25" rx="0" ry="0" width="325" height="300" />
        <rect x="475" y="350" rx="0" ry="0" width="325" height="50" />
        <rect x="900" y="25" rx="0" ry="0" width="325" height="300" />
        <rect x="900" y="350" rx="0" ry="0" width="325" height="50" />
        <rect x="1325" y="25" rx="0" ry="0" width="325" height="300" />
        <rect x="1325" y="350" rx="0" ry="0" width="325" height="50" />
      </ContentLoader>
    );
  }
}

export default ItemSkeleton;
