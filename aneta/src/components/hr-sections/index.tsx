import React from 'react';
import styled from 'styled-components';

import {variantsHr} from '../option';

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const SectionImage = styled.img.attrs({ alt: "" })`
  width: 2rem;
  height: 2rem;
`;

const SectionTitle = styled.span`
  font-family: bahnschrift;
  font-size: 1.8rem;
  opacity: 0.77;
`;

interface HRSectionsProps {
  variant: number;
}

const HRSections: React.FC<HRSectionsProps> = ({variant}) => {
    const {src, text} = variantsHr[variant];
    return (
      <SectionHeader>
        <SectionImage src={src} />
        <SectionTitle>{text}</SectionTitle>
      </SectionHeader>
    );
};

export default HRSections;
