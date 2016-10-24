import _ from 'lodash';
import {
  UPDATE,
} from './constants';

const initialState = [];

export default function charts(state = initialState, action) {
  switch (action.type) {
    case UPDATE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
