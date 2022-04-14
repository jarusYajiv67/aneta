import React, {useEffect, useState, useLayoutEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import {MainContainer, RightContainer, NoneText} from './styles';

import NavHr from '../../components/nav-hr';
import Transactions from '../../components/transactions';
import ErrorPage from '../error';

import {useUserNavContext} from '../../contexts/user-nav.context';
import {useOrganisationContext} from '../../contexts/organisation.context';
import {useAPIContext} from '../../contexts/api.context';

export interface TransactionType {
  id: string;
  amount: number;
  recipient: string;
}

interface FinancialPageProps {}

const FinancialPage: React.FC<FinancialPageProps> = () => {
    const {changeUni} = useUserNavContext();
    const {REST_API} = useAPIContext();
    const params = useParams();
    const {setLoading, token, orgName} = useOrganisationContext();
    const [transactions, setTransactions] = useState<Array<TransactionType>>([]);
    const [page, setPage] = useState<string | null>('');
    const [show, setShow] = useState<boolean|null>();

    const fetchTransactions = (recipient: string = '') => {
      if (page === null && !recipient?.length) return;
      setLoading!(true);
      const reqBody: {orgName: string; page?: string; recipient?: string} = {orgName};
      if (page?.length) reqBody.page = page;
      if (recipient?.length > 0) {
        delete reqBody.page;
        reqBody.recipient = recipient;
      };
      axios.post(`${REST_API}/transactions/fetch`, {...reqBody}, {
        headers: {Authorization: `Bearer ${token}`,}
      }).then(({data}) => {
        if (recipient?.length) setTransactions(data.transactions || []);
        else setTransactions([...transactions, ...(data.transactions || [])]);
        setPage(data.pageState);
        setLoading!(false);
      }).catch(() => setLoading!(false));
    };

    useEffect(() => {
      changeUni!(5);
      fetchTransactions();
    }, []);

    useLayoutEffect(() => {
      if (params.orgName !== orgName) setShow(false);
      else setShow(true);
    }, [params.orgName, orgName]);

    if (show === false) return <ErrorPage />;

    return (
      <MainContainer>
        <NavHr />
        <RightContainer>
          <Transactions 
            transactions={transactions}
            fetchTransactions={fetchTransactions}
            currPage={page}
          />
          {transactions.length === 0 && (
            <NoneText>No transactions has been made yet</NoneText>
          )}
        </RightContainer>
      </MainContainer>
    );
};

export default FinancialPage;
