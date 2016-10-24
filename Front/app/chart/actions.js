import {
  UPDATE,
  ADD_TO_PIG,
} from './constants';

export function updateChartData(payload) {
  return { 
    type: UPDATE,
    payload
  };
}

export function addToPig(pig, weight, time) {
  return { 
    type: ADD_TO_PIG,
    pig,
    weight,
    time
  };
}