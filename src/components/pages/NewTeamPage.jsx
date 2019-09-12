import React from 'react';
import { TeamSetupForm } from '../forms/TeamSetupForm';

export const NewTeamPage = () => { 
  return (
    <React.Fragment>
      <h1>Create a New Team</h1>
  
      <p className='mt-3'>
        [Coming in V1] After creating a team, you will be assigned its captain and you can add players, divisions, and matches from the team page.
        Once the team is live, an invite link will be generated that will let you add team members. [Coming in V1]
      </p>

      <TeamSetupForm />
    </React.Fragment>
  );
};