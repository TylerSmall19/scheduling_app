import React from 'react';
import logo from './logo.svg';
import './App.css';
import { IdentityContextProvider, useIdentityContext } from 'react-netlify-identity';
import "react-netlify-identity-widget/styles.css";
import { schedulingAPI } from './services/schedulingAPIService';
// Lazy load the module when login is attempted
const IdentityModal = React.lazy(() => import("react-netlify-identity-widget"));

function Login () {
  const identity = useIdentityContext();
  const [dialog, setDialog] = React.useState(false);
  const isLoggedIn = identity && identity.isLoggedIn;

  return (
    <React.Fragment>
      <button className="btn" onClick={() => setDialog(true)}>
        {isLoggedIn ? "LOG OUT" : "LOG IN"}
      </button>
      <React.Suspense fallback="loading...">
        <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
      </React.Suspense>
    </React.Fragment>
  )
}

const HitAPI = () => {
  const identity = useIdentityContext();

  return (
    <button onClick={async () => await new schedulingAPI(identity).getTeamSchedule('1')}>Hit the API</button>
  );
}

function App() {
  const url = 'https://www.tylerjsmall.com';
  return (
    <IdentityContextProvider url={url}>
      <div className="App">
        <header className="App-header">
          <Login />
          <HitAPI />
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Schedule a pool match! This is a QA Test with Login.
          </h2>
          <h3>
            {window.location.hostname}
          </h3>
        </header>
      </div>
    </IdentityContextProvider>
  );
}

export default App;
