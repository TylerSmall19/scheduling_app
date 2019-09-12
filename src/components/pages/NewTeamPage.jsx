import React from 'react';
import { TeamSetupForm } from '../forms/TeamSetupForm';

export const NewTeamPage = () => { 
  return (
    <React.Fragment>
      <h1>Create a New Team</h1>
  
      <p className='mt-3'>
        After creating a team, you will be assigned its captain and you can add and remove players from the team page [soon]
      </p>

      <TeamSetupForm />
    </React.Fragment>
  );
};