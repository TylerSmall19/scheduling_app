import React from 'react';

export const HomePage = () => {
  return (
    <React.Fragment>
      <h1>
        Welcome to your schedule's new home
      </h1>

      <h4>
        <em>This app is very much under creation.</em> Expect bugs and slow UIs for a while. 
        It'll get better or it won't, but hopefully it's still useful in the early stages
      </h4>

      <br />
      
      <h3>What</h3>
      <p>This is a scheduling app for a pool team. One specific pool team: Mine. (Oh, and I'm the creator of this web app)</p>

      <p>
        If you happen to be on my team (and you're reading this), welcome to the site. The team should be created already, 
        you'll just have to join it.<br />
      </p>
      
      <p><em>If you're not a member of my team</em>, let's get in touch to see if this app can benefit you.</p>

      <h3>
        Why?
      </h3>
      <p>Good question.</p>
      <p>
        In short, running a team is difficult. Organizing the matches, scheduling people's time in advance so they understand when they'll play,
        and conveying that to the entire team can be difficult. I set out to change that.
      </p>

      <h3>How?</h3>

      <p>Well, being here is the first step. </p>
      
      <p>
        Once you've made an account and logged in, the next step is to join the team. Your captain can provide a link to join with.&nbsp;
        After joining, finish your account, view your matches, and more. The captain should have a lineup ready for you, and you should receive
        emails for each match 2 days and 4 hours before your scheduled start time(s).
      </p>
    </React.Fragment>
  );
}