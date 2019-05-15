import React from 'react';
import ContentLoader from 'react-content-loader';


class SubmitAndResultBetsSkeleton extends React.Component {
  render() {
    return (
      <ContentLoader
        height={500}
        width={1700}
        speed={2}
        primaryColor="#1D2935"
        secondaryColor="#304457"
      >
        <circle cx="660" cy="50" r="40" />
        <circle cx="1040" cy="50" r="40" />
        <rect x="820" y="40" rx="0" ry="0" width="40" height="20" />
        <rect x="130" y="30" rx="0" ry="0" width="400" height="20" />
        <rect x="280" y="60" rx="0" ry="0" width="250" height="20" />
        <rect x="1160" y="30" rx="0" ry="0" width="400" height="20" />
        <rect x="1160" y="60" rx="0" ry="0" width="250" height="20" />
        <circle cx="660" cy="150" r="40" />
        <circle cx="1040" cy="150" r="40" />
        <rect x="820" y="140" rx="0" ry="0" width="40" height="20" />
        <rect x="130" y="130" rx="0" ry="0" width="400" height="20" />
        <rect x="280" y="160" rx="0" ry="0" width="250" height="20" />
        <rect x="1160" y="130" rx="0" ry="0" width="400" height="20" />
        <rect x="1160" y="160" rx="0" ry="0" width="250" height="20" />
        <circle cx="660" cy="250" r="40" />
        <circle cx="1040" cy="250" r="40" />
        <rect x="820" y="240" rx="0" ry="0" width="40" height="20" />
        <rect x="130" y="230" rx="0" ry="0" width="400" height="20" />
        <rect x="280" y="260" rx="0" ry="0" width="250" height="20" />
        <rect x="1160" y="230" rx="0" ry="0" width="400" height="20" />
        <rect x="1160" y="260" rx="0" ry="0" width="250" height="20" />
        <circle cx="660" cy="350" r="40" />
        <circle cx="1040" cy="350" r="40" />
        <rect x="820" y="340" rx="0" ry="0" width="40" height="20" />
        <rect x="130" y="330" rx="0" ry="0" width="400" height="20" />
        <rect x="280" y="360" rx="0" ry="0" width="250" height="20" />
        <rect x="1160" y="330" rx="0" ry="0" width="400" height="20" />
        <rect x="1160" y="360" rx="0" ry="0" width="250" height="20" />
        <circle cx="660" cy="450" r="40" />
        <circle cx="1040" cy="450" r="40" />
        <rect x="820" y="440" rx="0" ry="0" width="40" height="20" />
        <rect x="130" y="430" rx="0" ry="0" width="400" height="20" />
        <rect x="280" y="460" rx="0" ry="0" width="250" height="20" />
        <rect x="1160" y="430" rx="0" ry="0" width="400" height="20" />
        <rect x="1160" y="460" rx="0" ry="0" width="250" height="20" />
      </ContentLoader>
    );
  }
}

export default SubmitAndResultBetsSkeleton;
