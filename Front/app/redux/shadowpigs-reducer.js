import _ from 'lodash';
import {
  UPDATE_SHADOWPIGS,
} from './constants';

const initialState = {
  1: [],
  2: []
};

export default function shadowpigs(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SHADOWPIGS: {
      return action.pigs;
    }
    default: {
      return state;
    }
  }
}
