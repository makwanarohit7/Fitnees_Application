import React from 'react';
import {FitnessContext} from './Context';
import StackNavigator from './StackNavigator';

const App = () => {
  return (
    <FitnessContext>
      <StackNavigator />
    </FitnessContext>
  );
};

export default App;
