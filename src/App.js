import React from 'react';
import './styles/App.css';
import { IdentityContextProvider, useIdentityContext } from 'react-netlify-identity';
import 'react-netlify-identity-widget/styles.css';
import { schedulingAPI } from './services/schedulingAPIService';
import { Router, Link } from "@reach/router"

// Lazy load the module when login is attempted
const IdentityModal = React.lazy(() => import('react-netlify-identity-widget'));

function Header() {
  const identity = useIdentityContext();
  const [dialog, setDialog] = React.useState(false);
  const isLoggedIn = identity && identity.isLoggedIn;

  return (
    <div className='col-12'>
      <div className='login-container col-3 col-xs-12'>
        <span>
          <Link to='teams/new' className=''>Create A Team</Link>
        </span>
      </div>

      <div className='login-container col-2 col-xs-12'>
        <span className="login-btn" onClick={() => setDialog(true)}>
          {isLoggedIn ? "LOG OUT" : "LOGIN"}
        </span>
      </div>

      <div>
        
      </div>

      <React.Suspense fallback="">
        <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
      </React.Suspense>
    </div>
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

const AppIndex = () => {
  return(
    <div className="App">
      <div className='container'>
        <div className='row'>
          <Header />
          
          <div className='col-12'>

            <Router>
              <TeamsIndex path='teams/new' />
              <NotFound default />
            </Router>

            {/* <div className='mt-3'>
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
            </div> */}
          </div>
        </div>
      </div>
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
