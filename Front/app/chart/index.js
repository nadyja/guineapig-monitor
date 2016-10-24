import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import 'whatwg-fetch';
import styles from './styles.scss';
import moment from 'moment';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine} from 'recharts';
export reducer from './reducer';
export pigreducer from './pigreducer';

const min=800;
const max= 1200;
const midle=980;

class Chart extends Component {
  static propTypes = {
    charts: PropTypes.any,
    updateChartData: PropTypes.func.isRequired,
    addToPig: PropTypes.func.isRequired
  }


  parseChartData(json) {
    const { addToPig } = this.props;
    return json.feeds.map((item, index) => {
      if(item.field1 > midle && item.field1 < max) {
        // console.log('gryzelda', item.field1);
        addToPig('gryzelda', parseFloat(item.field1), moment(item.created_at));
      } else if(item.field1<midle && item.field1 > min) {
        // console.log('hrumhilda', item.field1);
        addToPig('hrumhilda', parseFloat(item.field1), moment(item.created_at));
      } else {

      }
      return {
        time: moment(item.created_at),
        weight: parseFloat(item.field1)
      }
    });
  }



  componentWillMount() {
    const { updateChartData } = this.props;
    const parseChartData = ::this.parseChartData;
    fetch('https://api.thingspeak.com/channels/116913/fields/1.json?results=1000')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        const feeds = parseChartData(json);
        updateChartData(feeds);
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  render() {
    const { charts } = this.props;
    if(!charts) return null;
    return ( <div className={styles.jumbotron}>
      <h3 className={styles.ago}>last update: <strong>{moment().fromNow()}</strong></h3>
      <LineChart width={1100} height={150} data={charts}>
       <XAxis dataKey="time" minTickGap={100}/>
       <YAxis/>
       <Tooltip/>
       <Line type="natural" dataKey="weight" stroke="#8884d8" dot={false} activeDot={{r: 8}}/>
       <ReferenceLine y={min} label="Max" stroke="blue" strokeDasharray="3 3" />
       <ReferenceLine y={midle} label="Max" stroke="red" strokeDasharray="3 3" />
       <ReferenceLine y={max} label="Max" stroke="blue" strokeDasharray="3 3" />
      </LineChart>
    </div>);
  }
}

export default connect(
  state => ({
    charts: state.charts,
  }),
  actions
)(Chart);
