import React, { Component, PropTypes } from 'react';
import {  XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineMarkSeries, DiscreteColorLegend, VerticalBarSeries,LineSeries, Hint} from 'react-vis';
import moment from 'moment';
import {HRUMHILDA, GRYZELDA, WEIGHT_BORDERLINE, WEIGHT_MINIMUM} from '../../config';
class WeightChart extends Component {
  static PropTypes = {
    shadow: PropTypes.object.isRequired,
    lines: PropTypes.object.isRequired,
    bars: PropTypes.any.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
    this._rememberValue = this._rememberValue.bind(this);
    this._forgetValue = this._forgetValue.bind(this);
  }

  _rememberValue(value) {
    this.setState({value});
  }

  _forgetValue() {
    this.setState({
      value: null
    });
  }
  render() {
    const {value} = this.state;
    const { lines, bars, shadow } = this.props;
    const min=800;
    const max= 1200;
    const midle=980;
    return (<section className="container">
      <h2>Weight</h2>
      {
      // <XYPlot
      //   width={960}
      //   height={300}
      //   animation={true}>
      //   <HorizontalGridLines />
      //   <VerticalGridLines/>
      //   <XAxis title="time" tickTotal={8} tickFormat={arg => moment(arg).format("D MMM HH:mm")} tickLabelAngle={0} />
      //   <YAxis title="weight" />
      //   <LineMarkSeries
      //     onValueMouseOver={this._rememberValue}
      //     onValueMouseOut={this._forgetValue}
      //     color="#ff9800"
      //     size="2"
      //     data={lines[GRYZELDA].map( (item, index) => ({
      //       x: item.timestamp,
      //       y: item.weight
      //     }))}/>
      //   <LineMarkSeries
      //     onValueMouseOver={this._rememberValue}
      //     onValueMouseOut={this._forgetValue}
      //     color="#03a9f4"
      //     size="2"
      //     data={lines[HRUMHILDA].map( (item, index) => ({
      //       x: item.timestamp,
      //       y: item.weight
      //     }))}/>
      //
      //   { value && <Hint value={value}>
      //   <div style={{background: 'black'}}>
      //     {moment(value.x).format("D MMM HH:mm:ss")}<br />
      //     {value.y}g
      // </div></Hint> }
      //   </XYPlot>
      }

        <XYPlot
          width={960}
          height={300}
          animation={true}>
          <HorizontalGridLines />
          <VerticalGridLines/>
          <XAxis title="i" />
          <YAxis title="weight" />
            <VerticalBarSeries
              color="#ccc"
              strokeWidth="30"
              data={bars.map( (item, index) => ({
                x: item.id,
                y: item.weight
              }))}
              />
              <LineSeries
                color="#ff9800"
                strokeStyle="dashed"
                strokeWidth="1"
                opacity="0.5"
                data={shadow[GRYZELDA].map( (item, index) => ({
                  x: item.id,
                  y: item.weight
                }))}/>
              <LineSeries
                color="#03a9f4"
                strokeStyle="dashed"
                strokeWidth="1"
                opacity="0.5"
                data={shadow[HRUMHILDA].map( (item, index) => ({
                  x: item.id,
                  y: item.weight
                }))}/>
            <LineMarkSeries
              onValueMouseOver={this._rememberValue}
              onValueMouseOut={this._forgetValue}
              color="#ff9800"
              size="2"
              data={lines[GRYZELDA].map( (item, index) => ({
                x: item.id,
                y: item.weight,
                date: item.timestamp,
                duration: item.duration
              }))}/>

            <LineMarkSeries
              onValueMouseOver={this._rememberValue}
              onValueMouseOut={this._forgetValue}
              color="#03a9f4"
              size="2"
              data={lines[HRUMHILDA].map( (item, index) => ({
                x: item.id,
                y: item.weight,
                date: item.timestamp,
                duration: item.duration
              }))}/>

          { value && <Hint value={value} >
          <div className="rv-hint__content">
            <strong>time:</strong> {moment(value.timestamp).format("D MMM HH:mm:ss")}<br />
            <strong>weight:</strong> {parseFloat(value.y).toFixed(1)} g<br />
            <strong>duration:</strong> {parseFloat(value.duration/60).toFixed(1)} min
        </div></Hint> }
        </XYPlot>

          <DiscreteColorLegend
            orientation="horizontal"
            width={960}
            items={[
              {title: 'Gryzelda', color: '#ff9800' },
              {title: 'Hrumhilda', color: '#03a9f4' }
            ]}
          />
    </section>);
  }
}

export default WeightChart;
