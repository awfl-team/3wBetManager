import React from 'react';
import ContentLoader from 'react-content-loader';


class TableSkeleton extends React.Component {
  render() {
    return (
      <ContentLoader
        height={500}
        width={1700}
        speed={2}
        primaryColor="#1D2935"
        secondaryColor="#304457"
      >
        <rect x="1" y="10" rx="0" ry="0" width="1700" height="50" />
        <rect x="1" y="80" rx="0" ry="0" width="1700" height="20" />
        <rect x="1" y="110" rx="0" ry="0" width="1700" height="20" />
        <rect x="1" y="140" rx="0" ry="0" width="1700" height="20" />
        <rect x="1" y="170" rx="0" ry="0" width="1700" height="20" />
        <rect x="1" y="200" rx="0" ry="0" width="1700" height="20" />
        <rect x="1" y="230" rx="0" ry="0" width="1700" height="20" />
        <rect x="1" y="260" rx="0" ry="0" width="1700" height="20" />
      </ContentLoader>
    );
  }
}

export default TableSkeleton;
