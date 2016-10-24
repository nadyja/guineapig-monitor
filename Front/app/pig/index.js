import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import { connect } from 'react-redux';
import gryzeldaImg from './gryzelda.jpg';
import hrumhildaImg from './hrumhilda.jpg';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine} from 'recharts';
import moment from 'moment';

class Pig extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    pigs: PropTypes.object.isRequired
  }

  render() {
    const { name } = this.props;
    const pig = this.props.pigs[name];
    const weight = 1063;

    let imgUrl;
    if(name == 'gryzelda') imgUrl = gryzeldaImg;
    else imgUrl = hrumhildaImg;


    return ( <div className={styles.pig}>
            <div className={styles.header}>
      <img className={styles.image} src={imgUrl} />

      <div className={styles.content}>
        <h3 className={styles.pigName}>{name}</h3>
        {pig.latest &&
          <div>
        <figure className={styles.pigWeight}>{pig.latest.weight} g</figure> 
        <small className={styles.pigLast}>{pig.latest.time.fromNow()}</small>
        </div>
      }
      </div>
      </div>
      {pig.mesurements.length>0 &&
      <div className={styles.chart}>
        <LineChart width={500} height={200} data={pig.mesurements}>
         <XAxis dataKey="time"/>
         <YAxis/>
         <Tooltip/>
         <Line type="natural" dataKey="weight" stroke="#8884d8" dot={false} activeDot={{r: 8}}/>
        </LineChart>
      </div>
    }
    </div>);
  }
}

export default connect(
  state => ({
    pigs: state.pigs,
  }),
  {}
)(Pig);