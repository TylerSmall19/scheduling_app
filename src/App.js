import React from 'react';
import 'react-netlify-identity-widget/styles.css';
import './styles/App.css';
import { IdentityContextProvider } from 'react-netlify-identity';
import { Router } from '@reach/router'
import { Container, Col } from 'react-bootstrap';
import { NewTeamPage } from './components/pages/NewTeamPage';
import { HomePage } from './components/pages/HomePage';
import { Header } from './components/navigation/header';

const NotFound = () => (
  <span className='col-2 mx-auto'>Not Found</span>
)

const AppIndex = () => {
  return(
    <div className='App'>
      <Container>
        <Header />

        <Col>
          <Router>
            <HomePage path='/' />
            <NewTeamPage path='teams/new' />
            <NotFound default />
          </Router>
        </Col>
      </Container>
    </div>
  );
}

function App() {
  const url = 'https://schedule.tylerjsmall.com';
  return (
    <IdentityContextProvider url={url}>
      <Router>
        <AppIndex path='/*' />
      </Router>
    </IdentityContextProvider>
  );
}

export default App;
