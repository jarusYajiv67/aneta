import React from 'react';
import styled from 'styled-components';
import {format} from 'timeago.js';

import Section, {SectionCaption} from '../section';
import prettyDate from "../../utils/pretty-date";
import {getDateObj} from "../../utils/timeuuid-to-date";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SinceFormatted = styled.span`
  font-family: bahnschrift;
  font-size: 1rem;
  opacity: 0.7;
`;

interface JoinedOnProps {
  forProject?: boolean;
  id?: string;
}

const JoinedOn: React.FC<JoinedOnProps> = ({forProject, id}) => {
    const timeStamp = getDateObj(
      id || "9467eb20-a622-11ec-9631-773bd57f3429"
    ).toISOString();
    return (
      <div>
        {!forProject ? (
          <Section name="Joined on" />
        ) : (
          <Section name="Created on" />
        )}
        <Container>
          <SectionCaption>{prettyDate(timeStamp)}</SectionCaption>
          <SinceFormatted>{format(timeStamp)}</SinceFormatted>
        </Container>
      </div>
    );
};

export default JoinedOn;
