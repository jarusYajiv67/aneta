import React, {useEffect} from 'react';
import {HashRouter, Route, Routes, Navigate} from 'react-router-dom';
import axios from 'axios';

// pages
import HomePage from './pages/home';
import UserHomePage from './pages/user-home';
import UserDashboardPage from './pages/user-dashboard';
import HRDashboardPage from './pages/hr-dashboard';
import UserChatPage from './pages/user-chat';
import HRChatPage from './pages/hr-chat';
import FinancialPage from './pages/financial-page';
import ErrorPage from './pages/error';
import HRSettingsPage from './pages/hr-settings';
import HRResourcesPage from './pages/hr-resources';
import HRProjectsPage from './pages/hr-projects';

import BlockLoader from './components/block-loader';
import {useUserContext} from './contexts/user.context';
import {useOrganisationContext} from './contexts/organisation.context';
import {useAPIContext} from './contexts/api.context';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const {loading: l1, id: uid, setLoading} = useUserContext();
  const {REST_API} = useAPIContext();
  const {loading: l2, id: oid, orgName: oon} = useOrganisationContext();

  useEffect(() => {
    setLoading!(true);
    axios.get(`${REST_API}/validation/server`)
    .then(() => setLoading!(false))
    .catch(() => setLoading!(false));
  }, []);
  
  return (
    <HashRouter>
      {(l1 || l2) && <BlockLoader />}
      <Routes>
        <Route
          path="/"
          element={
            oid.length && oon.length ? (
              <Navigate to={`/organisation/${oon}/dashboard`} />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="/organisation/:orgName/dashboard"
          element={!oid.length ? <Navigate to="/" /> : <HRDashboardPage />}
        />
        <Route
          path="/organisation/:orgName/chat"
          element={!oid.length ? <Navigate to="/" /> : <HRChatPage />}
        />
        <Route
          path="/organisation/:orgName/projects"
          element={!oid.length ? <Navigate to="/" /> : <HRProjectsPage />}
        />
        <Route
          path="/organisation/:orgName/resources"
          element={!oid.length ? <Navigate to="/" /> : <HRResourcesPage />}
        />
        <Route
          path="/organisation/:orgName/financial"
          element={!oid.length ? <Navigate to="/" /> : <FinancialPage />}
        />
        <Route
          path="/organisation/:orgName/settings"
          element={!oid.length ? <Navigate to="/" /> : <HRSettingsPage />}
        />
        <Route
          path="/organisation/:orgName/user"
          element={
            uid.length ? <Navigate to="/user/dashboard" /> : <UserHomePage />
          }
        />
        <Route
          path="/user/dashboard"
          element={!uid.length ? <Navigate to="/" /> : <UserDashboardPage />}
        />
        <Route
          path="/user/chat"
          element={!uid.length ? <Navigate to="/" /> : <UserChatPage />}
        />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
