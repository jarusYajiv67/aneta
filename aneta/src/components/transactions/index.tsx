import React, {KeyboardEventHandler, MutableRefObject, useRef} from 'react';

import {
  Container, ColumnNames, Wrapper, Rows, MoreSection
} from './styles';

import HorizontalLine from '../horizontal-line';
import {StyledInput} from '../input';
import Transaction from '../transaction';
import Button from '../button';

import {TransactionType} from '../../pages/financial-page';

interface TransactionsProps {
  transactions: Array<TransactionType>;
  fetchTransactions: (recipient?: string) => void;
  currPage: string | null;
}

const Transactions: React.FC<TransactionsProps> = ({
  transactions, fetchTransactions, currPage
}) => {
    const recipientRef =
      useRef() as MutableRefObject<HTMLInputElement>;
    const fetchWithRecipient: KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (event.key!== "Enter") return;
      if (recipientRef.current.value.length < 1) 
        return window.alert("Field empty");
      fetchTransactions(recipientRef.current.value);
    };
    return (
      <>
        <StyledInput 
          ref={recipientRef} 
          placeholder="Recipient Email"
          onKeyDown={fetchWithRecipient}
        />
        <Wrapper>
          <Container>
            <ColumnNames>
              <span>Transaction ID</span>
              <span>Date</span>
              <span>Recipient</span>
              <span>Amount ($)</span>
            </ColumnNames>
            <HorizontalLine variant={2} />
          </Container>
          <Rows>
            {transactions.map((val, idx) => (
              <Transaction key={idx} {...val} />
            ))}
            <MoreSection>
              {currPage !== null && (
                <Button 
                  onPress={fetchTransactions}
                  variant={1} 
                  disabled={false} 
                  text="Load more"
                />
              )}
            </MoreSection>
          </Rows>
        </Wrapper>
      </>
    );
};

export default Transactions;
