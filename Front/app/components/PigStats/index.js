import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import gryzeldaImg from './gryzelda.jpg';
import hrumhildaImg from './hrumhilda.jpg';
import moment from 'moment';
import classNames from 'classnames';

function PigStats(props) {
  const { name, data } = props;

  let imgUrl;
  if(name == 'gryzelda') imgUrl = gryzeldaImg;
  else imgUrl = hrumhildaImg;

  const weight = 958.0;
  const delta = 30.5;
  if(data.length==0) return null;
  return ( <div className={styles.pig}>
    <div className={styles.header}>
      <img className={classNames(styles.image, styles[name])} src={imgUrl} />
    </div>
    <div className={styles.content}>
      <h3 className={styles.pigName}>{name}</h3>
      <p>
        <span className={styles.pigWeight}>{parseFloat(data[data.length-1].weight).toFixed(1)} g</span>
      </p>
      <p>
        <span className={styles.pigLast}>{data[data.length-1].timestamp.format('YYYY-MM-DD HH:mm:ss')}</span>
      </p>
    </div>
  </div>);
}

PigStats.PropTypes = {
  data: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
}
export default PigStats;
