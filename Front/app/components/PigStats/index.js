import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import gryzeldaImg from './gryzelda.jpg';
import hrumhildaImg from './hrumhilda.jpg';
import moment from 'moment';

function PigStats(props) {
  const { name, data } = props;
  console.log(data);

  let imgUrl;
  if(name == 'gryzelda') imgUrl = gryzeldaImg;
  else imgUrl = hrumhildaImg;

  const weight = 958.0;
  const delta = 30.5;
  if(data.length==0) return null;
  return ( <div className={styles.pig}>
    <div className={styles.header}>
      <img className={styles.image} src={imgUrl} />
    </div>
    <div className={styles.content}>
      <h3 className={styles.pigName}>{name}</h3>
      <p>
        <label>last weight</label>
        <span>{data[data.length-1].weight} g</span>
      </p>
      <p>
        <label>last mesured</label>
        <span>{data[data.length-1].timestamp.format('YYYY-MM-DD HH:mm:ss')}</span>
      </p>
      <p>
        <label>today time in bunker</label>

      </p>
      <p>
        <label>avg daily time in bunker</label>

      </p>

    </div>
  </div>);
}

PigStats.PropTypes = {
  data: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
}
export default PigStats;
