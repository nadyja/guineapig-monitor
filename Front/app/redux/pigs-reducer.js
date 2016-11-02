import _ from 'lodash';
import {
  UPDATE_PIGS,
} from './constants';

const initialState = {
  1: [],
  2: []
};

export default function pigs(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PIGS: {
      return action.pigs;
    }
    default: {
      return state;
    }
  }
}
