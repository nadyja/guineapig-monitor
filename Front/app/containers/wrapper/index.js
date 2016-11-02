import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../../redux/actions';
import {HRUMHILDA, GRYZELDA, WEIGHT_BORDERLINE, WEIGHT_LOGICAL_MIN, WEIGHT_LOGICAL_MAX} from '../../config';
import Status from '../../components/Status';
import WeightChart from '../../components/WeightChart';
import Timeline from '../../components/Timeline';
import PigStats from '../../components/PigStats';


function isValid(weight) {
  return weight > WEIGHT_LOGICAL_MIN && weight < WEIGHT_LOGICAL_MAX
    && weight !=950
    && weight !=1040
    && weight !=1100
}
class Wrapper extends Component {
  static propTypes = {
    status: PropTypes.object.isRequired,
    timeline: PropTypes.any.isRequired,
    pigs: PropTypes.object.isRequired,
    updateStatus: PropTypes.func.isRequired,
    updateTimelines : PropTypes.func.isRequired,
    updatePigs: PropTypes.func.isRequired,
    updateShadowPigs: PropTypes.func.isRequired,
  }

  state = {
    loaded: false
  }


  parseAnalyzedData(json) {
    const pigs = {};
    pigs[GRYZELDA]=[];
    pigs[HRUMHILDA]=[];
    const lookupPigs = {};
    let currentBorderline=WEIGHT_BORDERLINE;
    let last= {}
    last[GRYZELDA]=WEIGHT_BORDERLINE+50;
    last[HRUMHILDA]=WEIGHT_BORDERLINE-50;
    const timeline= json.feeds.map((item, index) => {
      const weight = parseFloat(item.field2);
      const duration = parseInt(item.field1);
      const pigId = weight > currentBorderline ? GRYZELDA : HRUMHILDA;
      const end = moment(item.created_at, 'YYYY-MM-DDTHH:mm:ssZ');
      const start = moment(item.created_at, 'YYYY-MM-DDTHH:mm:ssZ').subtract(duration, 'seconds');
      const valid=isValid(weight);
        if(valid) {
          last[pigId] = weight;
          const newBorderline=last[HRUMHILDA]+((last[GRYZELDA]- last[HRUMHILDA]) / 2);
          //console.log(weight, pigId, last, currentBorderline, newBorderline, valid);
          currentBorderline = newBorderline;
        }
      pigs[pigId].push({
        id: index,
        timestamp: end,
        weight,
        duration
      });
      lookupPigs[end.format('YYYY-MM-DD')] = index;
      return {
        id: index,
        start,
        end,
        duration,
        weight,
        pigId,
        className: `pig${pigId}`
      }
    });
    return {
      timeline,
      pigs,
      lookupPigs
    }
  }

  componentWillMount() {
    const { updateStatus, updateTimelines, updatePigs, updateShadowPigs } = this.props;
    const { parseAnalyzedData, getLookupPigs } = this;
    const self = this;
    fetch('https://api.thingspeak.com/channels/116913/fields/1.json?results=1')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        updateStatus(json.feeds[0]);
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
      fetch('https://api.thingspeak.com/channels/175026/feeds.json?results=100')
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          const { timeline, pigs, lookupPigs } = parseAnalyzedData(json);
          updateTimelines(timeline);
          updatePigs(pigs);
          const shadowPigs ={
            1: [
              { id: 1, weight:1040.0 },
              { id: lookupPigs['2016-11-02'], weight:1027.0 }
            ],
            2: [
              { id: 1, weight:950.0 },
              { id: lookupPigs['2016-11-02'], weight: 927.0 }
            ]
          };
          updateShadowPigs(shadowPigs);
          self.setState({loaded: true});
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        })


  }

  render() {
    const { status, timeline, pigs, shadowpigs } = this.props;
    const isOnline = ((moment.duration(moment().diff(moment(status.created_at, 'YYYY-MM-DDTHH:mm:ssZ'))).asMinutes()) < 5)
    return (<div>
      <div className="container">
        <div className="header clearfix">
          <h3 className="text-muted">Guinea Pig Monitor</h3>
          {isOnline && <span className="status status-online">online</span>}
          {!isOnline && <span className="status status-offline">offline</span>}
        </div>
      </div>
      {this.state.loaded && <div>
      <Status data={status}/>
        <section className="container">
          <div className="row">
            <div className="col-md-6">
              <PigStats name="gryzelda" data={pigs[GRYZELDA]} />
            </div>
            <div className="col-md-6">
              <PigStats name="hrumhilda" data={pigs[HRUMHILDA]} />
            </div>
          </div>
        </section>
      <Timeline data={timeline} />
      <WeightChart lines={pigs} bars={timeline} shadow={shadowpigs}/>
      </div>}
    </div>);
  }
}

export default connect(
  state => ({
    status: state.status,
    shadowpigs: state.shadowpigs,
    timeline: state.timeline,
    pigs: state.pigs,
  }),
  actions
)(Wrapper);
