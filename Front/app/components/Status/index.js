import React, { Component, PropTypes } from 'react';
import {HRUMHILDA, GRYZELDA, WEIGHT_BORDERLINE, WEIGHT_MINIMUM} from '../../config';
import moment from 'moment';

function getStatus(weight, timestamp) {
  const MINUTES_TO_OFFLINE = 5;
  if ((moment.duration(moment().diff(timestamp)).asMinutes()) > MINUTES_TO_OFFLINE) return 0;
  if(weight >= WEIGHT_MINIMUM) return 2
  else return 1;
}
function Status(props) {
  const { created_at, field1: weight } = props.data;
  const timestamp = moment(created_at, 'YYYY-MM-DDTHH:mm:ssZ');
  const isPig = weight >= WEIGHT_MINIMUM;
  const status = getStatus(weight, timestamp);
  const statusMessages = {
    0: 'offline',
    1: 'empty',
    2: 'mesurment in progress'
  }
  return (
    <div className="jumbotron">
      <section className="container">
        <div className="row">
        <div className="col-md-4">
          <label>Status</label>
          <figure>{statusMessages[status]}</figure>
        </div>
        <div className="col-md-4">
          <label>{status==0?'Last weight':'Weight'}</label>
          <figure>{weight}</figure>
          {isPig &&<small>{weight>WEIGHT_BORDERLINE?'Gryzelda':'Hrumhilda'}</small>}
        </div>
        <div className="col-md-4">
          <label>Last updated</label>
          <figure>{timestamp.fromNow()}</figure>
          <small>{timestamp.format('HH:mm:ss')}</small>
        </div>
      </div>
      </section>
    </div>);
}
Status.PropTypes = {
  data: PropTypes.object.isRequired,
}
export default Status;
