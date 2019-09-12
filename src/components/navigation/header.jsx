import React from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import { schedulingAPI } from '../../services/schedulingAPIService';
import { Link } from '@reach/router'
import { Navbar, Nav } from 'react-bootstrap';

// Lazy load the module when login is attempted
const IdentityModal = React.lazy(() => import('react-netlify-identity-widget'));

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

const AuthBtn = (props) => {
  const identity = useIdentityContext();
  const [dialog, setDialog] = React.useState(false);
  const isLoggedIn = identity && identity.isLoggedIn;

  return (
    <React.Fragment>
      <Link {...props} to={window.location.pathname} onClick={() => setDialog(true)}>
        {isLoggedIn ? 'LOG OUT' : 'LOGIN'}
      </Link>

      <React.Suspense fallback=''>
        <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
      </React.Suspense>
    </React.Fragment>
  );
}

export const Header = () => {
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
            <Nav.Link href='/' as={(props) => <Link {...props} to='/'>Home</Link>} />
            <Nav.Link href='#' as={(props) => <Link {...props} to='teams/new'>Create a Team</Link>} />
          </Nav>
          <Nav>
            <Nav.Link as={() => <HitAPI />}>Test</Nav.Link>
            <Nav.Link href={window.location.pathname} as={AuthBtn} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </React.Fragment>
  )
}

