import React, { useState } from 'react';
import '../index.css';

import Slider from '@mui/material/Slider';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const marks_trees = [
  {
    value: 0,
    label: 'less tree'
  },
  {
    value: 50,
    label: 'average'
  },
  {
    value: 100,
    label: 'more tree'
  }
]
const marks_collisions = [
  {
    value: 0,
    label: 'more',
  },
  {
    value: 50,
    label: 'average',
  },
  {
    value: 100,
    label: 'less',
  },
];

function Slidebar( { isTreeOn, setIsTreeOn, isCollisionOn, setIsCollisionOn, handleTreeCollisionSliderChange}){

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
              step={50}
              marks={marks_trees}
              defaultValue={50}
              onChange={(e) => handleTreeCollisionSliderChange(e.target.value, 'tree')}
          />
        </div>
        <div className='slider-container'>
          <Slider
            aria-label="Always visible"
            step={50}
            marks={marks_collisions}
            defaultValue={50}
            onChange={(e) => handleTreeCollisionSliderChange(e.target.value, 'collision')}
          />
        </div>
      </div>
    </>
  );
}

export default Slidebar;
