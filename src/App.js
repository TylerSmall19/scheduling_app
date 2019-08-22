import React from 'react';
import logo from './logo.svg';
import './App.css';
import { IdentityContextProvider, useIdentityContext } from 'react-netlify-identity';import "react-netlify-identity-widget/styles.css"
// Lazy load the module when login is attempted
const IdentityModal = React.lazy(() => import("react-netlify-identity-widget"))

function Login () {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const isLoggedIn = identity && identity.isLoggedIn

  return (
    <React.Fragment>
      <button className="btn" onClick={() => setDialog(isLoggedIn)}>
        {isLoggedIn ? "LOG OUT" : "LOG IN"}
      </button>
      <React.Suspense fallback="loading...">
        <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
      </React.Suspense>
    </React.Fragment>
  )
}

function App() {
  const url = 'http://www.tylerjsmall.com/.netlify/identity';
  return (
    <IdentityContextProvider url={url}>
      <div className="App">
        <header className="App-header">
          <Login />
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Schedule a pool match! This is a QA Test with Login
          </h2>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
          </a>
        </header>
      </div>
    </IdentityContextProvider>
  );
}

export default App;
