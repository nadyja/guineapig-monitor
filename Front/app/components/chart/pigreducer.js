import _ from 'lodash';
import {
  ADD_TO_PIG,
} from './constants';

const initialState = {
  gryzelda: {
    mesurements: [],
    latest: null
  },
  hrumhilda: {
    mesurements: [],
    latest: null
  }
};

export default function pigs(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_PIG: {
      const newState = {...state};
      const mesurement = {
        weight: action.weight,
        time: action.time
      };
      newState[action.pig].mesurements.push(mesurement);
      newState[action.pig].latest=mesurement;
      return newState;
    }
    default: {
      return state;
    }
  }
}
