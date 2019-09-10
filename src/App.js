import React from 'react';
import './styles/App.css';
import { IdentityContextProvider, useIdentityContext } from 'react-netlify-identity';
import 'react-netlify-identity-widget/styles.css';
import { schedulingAPI } from './services/schedulingAPIService';
// Lazy load the module when login is attempted
const IdentityModal = React.lazy(() => import('react-netlify-identity-widget'));

function Login() {
  const identity = useIdentityContext();
  const [dialog, setDialog] = React.useState(false);
  const isLoggedIn = identity && identity.isLoggedIn;

  return (
    <div className='login-container col-2 col-xs-12 mx-auto float-right'>
      <span className="login-btn" onClick={() => setDialog(true)}>
        {isLoggedIn ? "LOG OUT" : "LOGIN"}
      </span>

      <React.Suspense fallback="loading...">
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

function App() {
  const url = 'https://schedule.tylerjsmall.com/';
  return (
    <IdentityContextProvider url={url}>
      <div className="App">
        <div className='container'>
          <div className='row background'>
            <div className='col-12'>
              <Login />

              <br />

              <h1>Schedule App</h1>

              <br />

              <HitAPI />

              <br />
              <br />

              <h2>
                Schedule a pool match!
              </h2>
            </div>
          </div>
        </div>
        <span>
          {window.location.hostname}
        </span>
      </div>
    </IdentityContextProvider>
  );
}

export default App;
