import React from 'react';
import styled from 'styled-components';

import HorizontalLine from '../horizontal-line';
import prettyDate from "../../utils/pretty-date";
import {getDateObj} from "../../utils/timeuuid-to-date";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  cursor: default;
  &:hover {
    box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    -webkit-box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    -moz-box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-family: bahnschrift;
  font-size: 1.2rem;
  color: black;
  opacity: 0.6;
`;

interface TransactionProps {
    id: string;
    recipient: string;
    amount: number;
}

const Transaction: React.FC<TransactionProps> = ({id, recipient, amount}) => {
    return (
        <Wrapper>
          <Container>
              <span>{id}</span>
              <span>{prettyDate(getDateObj(id).toISOString())}</span>
              <span>{recipient}</span>
              <span>{amount}</span>
          </Container>
          <HorizontalLine variant={3} />
        </Wrapper>
    );
};

export default Transaction;
