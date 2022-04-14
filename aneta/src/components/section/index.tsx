import React from 'react';
import styled from 'styled-components';

import HorizontalLine from '../horizontal-line';

const SectionTitle = styled.span`
  font-family: calibri;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  opacity: 0.7;
`;

export const SectionCaption = styled.span`
  font-family: calibri;
  padding: 0.5%;
  font-size: 1.6rem;
  opacity: 0.84;
`;

interface SectionProps {
  name: string;
}

const Section: React.FC<SectionProps> = ({name}) => {
    return (
        <div>
            <SectionTitle>{name}</SectionTitle>
            <HorizontalLine variant={2} />
        </div>
    );
};

export default Section;
