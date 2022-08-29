import React, { useState } from 'react';
import '../index.css';

import Slider from '@mui/material/Slider';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const marks_trees = [
  {
    value: 0,
    label: 'off'
  },
  {
    value: 100,
    label: 'on'
  }
]
const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function Slidebar( { isTreeOn, setIsTreeOn, isCollisionOn, setIsCollisionOn}){

  return (
    <>
      <div id="switchbar">
        <div className='slider-container'>
          <h3>Trees</h3>
          <FormControlLabel control={<Switch checked={isTreeOn} onChange={(e) => setIsTreeOn(e.target.checked)} />} label={isTreeOn ? 'On' : 'Off'} />
        </div>
        <div className='slider-container'>
          <h3>Traffic Accidents</h3>
          <FormControlLabel control={<Switch checked={isCollisionOn} onChange={(e) => setIsCollisionOn(e.target.checked)} />} label={isCollisionOn ? 'On' : 'Off'} />
        </div>
        </div>
      <div id='sliderbar'>
        <div className='slider-container'>
          <Slider
              aria-label="Always visible"
              defaultValue={0}
              step={100}
              marks={marks_trees}
          />
        </div>
        <div className='slider-container'>
          <Slider
            aria-label="Always visible"
            defaultValue={80}
            getAriaValueText={valuetext}
            step={10}
            marks={marks}
          />
        </div>
      </div>
    </>
  );
}

export default Slidebar;
