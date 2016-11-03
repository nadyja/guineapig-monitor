import React, { Component, PropTypes } from 'react';
import {HRUMHILDA, GRYZELDA, WEIGHT_BORDERLINE, WEIGHT_MINIMUM} from '../../config';
import moment from 'moment';
import styles from './styles.scss';

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
    2: weight>WEIGHT_BORDERLINE?'Gryzelda':'Hrumhilda'
  }
  return (
    <div className="jumbotron">
      <section className="container">
        <div className="row">
        <div className="col-xs-4">
          <div className={styles.item}>
            <label className={styles.label}>Status</label>
            <figure className={styles.number}>{statusMessages[status]}</figure>
          </div>
        </div>
        <div className="col-xs-4">
          <div className={styles.item}>
            <label className={styles.label}>{status==0?'Last weight':'Weight'}</label>
            <div className={status==2?styles.blink:''}>
            <figure className={styles.number}>{parseFloat(weight).toFixed(1)} g</figure>
            </div>
          </div>
        </div>
        <div className="col-xs-4">
          <div className={styles.item}>
            <label className={styles.label}>Last updated</label>
            <figure className={styles.number}>{timestamp.format('HH:mm:ss')}</figure>
          </div>
        </div>
      </div>
      </section>
    </div>);
}
Status.PropTypes = {
  data: PropTypes.object.isRequired,
}
export default Status;
