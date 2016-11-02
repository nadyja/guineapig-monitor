import React, { Component, PropTypes } from 'react';
import VisTimeline from 'react-visjs-timeline'
function Timeline(props) {
  const { data } = props;
  const options = {
    width: '100%',
    height: '100px',
    stack: false,
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 1000000,
    type: 'background',
    format: {
      minorLabels: {
        minute: 'h:mma',
        hour: 'ha'
        }
      }
    }
  return (<section className="container">
    <h2>Timeline</h2>
    <VisTimeline options={options} items={data}/>
  </section>);
  }
Timeline.PropTypes = {
  data: PropTypes.object.isRequired,
}
export default Timeline;
