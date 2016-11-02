import _ from 'lodash';
import {
  UPDATE_TIMELINE,
} from './constants';

const initialState = [];

export default function timeline(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TIMELINE: {
      return action.timeline;
    }
    default: {
      return state;
    }
  }
}
