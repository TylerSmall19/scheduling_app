import React from 'react';
import './styles/App.css';
import { IdentityContextProvider, useIdentityContext } from 'react-netlify-identity';
import 'react-netlify-identity-widget/styles.css';
import { schedulingAPI } from './services/schedulingAPIService';
import { Router, Link } from '@reach/router'
import {Container, Col, Navbar, Nav } from 'react-bootstrap';

// Lazy load the module when login is attempted
const IdentityModal = React.lazy(() => import('react-netlify-identity-widget'));

const AuthBtn = (props) => {
  const identity = useIdentityContext();
  const [dialog, setDialog] = React.useState(false);
  const isLoggedIn = identity && identity.isLoggedIn;

  return (
    <React.Fragment>
      <span {...props} onClick={() => setDialog(true)}>
        {isLoggedIn ? 'LOG OUT' : 'LOGIN'}
      </span>

      <React.Suspense fallback=''>
        <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
      </React.Suspense>
    </React.Fragment>
  );
}

function Header() {
  return (
    <React.Fragment>
      <Navbar 
        bg='dark' 
        expand='md' 
        variant='dark' 
        fixed='top'
        collapseOnSelect={true}
      >
        <Navbar.Brand as={(props) => <Link {...props} to='/'>Team Scheduling</Link>} />
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link as={(props) => <Link {...props} to='/'>Home</Link>} />
            <Nav.Link as={(props) => <Link {...props} to='teams/new'>Create a Team</Link>} />
          </Nav>
          <Nav>
            <Nav.Link as={AuthBtn} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </React.Fragment>
  )
}

const HitAPI = () => {
  const identity = useIdentityContext();

  const onClickHandler = async () => {
    const res = await new schedulingAPI(identity).getTeamSchedule('1');
    console.log(res)
  }

  return (
    <button onClick={onClickHandler} className='btn-secondary'>Test</button>
  );
}

const NotFound = () => (
  <span className='col-2 mx-auto'>Not Found</span>
)

const TeamsIndex = () => {
  return (
    <h1>Create a New Team</h1>
  )
}

const AppHome = () => {
  return (
    <React.Fragment>
      <h1>
        Scheduling App
      </h1>
      <br />
      <HitAPI />
      <br /> <br />
      <h2>
        <Link to='home'>
          Schedule a pool match!
        </Link>
      </h2>
    </React.Fragment>
  );
}

const AppIndex = () => {
  return(
    <div className='App'>
      <Container>
        <Header />

        <Col>
          <Router>
            <TeamsIndex path='teams/new' />
            <AppHome path='/' />
            <NotFound default />
          </Router>
        </Col>
      </Container>
      <span>
        {window.location.hostname}
      </span>
    </div>
  );
}

function App() {
  const url = 'https://schedule.tylerjsmall.com/';
  return (
    <IdentityContextProvider url={url}>
      <Router>
        <AppIndex path='/*' />
      </Router>
    </IdentityContextProvider>
  );
}

export default App;
