import _ from 'lodash';
import {
  UPDATE_STATUS,
} from './constants';

const initialState = {};

export default function status(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATUS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
