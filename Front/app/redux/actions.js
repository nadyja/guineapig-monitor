import {
  UPDATE_STATUS,
  UPDATE_PIGS,
  UPDATE_SHADOWPIGS,
  UPDATE_TIMELINE
} from './constants';

export function updateStatus(payload) {
  return {
    type: UPDATE_STATUS,
    payload
  };
}

export function updatePigs(pigs) {
  return {
    type: UPDATE_PIGS,
    pigs
  };
}
export function updateShadowPigs(pigs) {
  return {
    type: UPDATE_SHADOWPIGS,
    pigs
  };
}
export function updateTimelines(timeline) {
  return {
    type: UPDATE_TIMELINE,
    timeline
  };
}
