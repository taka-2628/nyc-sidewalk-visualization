import React from 'react';
import '../index.css';

import Legend from './Legend';

import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const marks_pop = [
  {
    value: 0,
    label: 'quiet'
  },
  {
    value: 50,
    label: 'average'
  },
  {
    value: 100,
    label: 'lively'
  }
]
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

function Slidebar( { setIsSidewalkOn, setIsTreeOn, setIsCollisionOn, handleTreeCollisionSliderChange, setFindNeighborhoodOn, switchOne, switchTwo, switchThree, sliderOne, sliderTwo, sliderThree, legendOne, legendTwo}){

  return (
    <>
      <h1></h1>
      <div id="switchbar">
        <div className='slider-container'>
          <FormControlLabel control={<Switch ref={switchOne} defaultChecked onChange={(e) => setIsSidewalkOn(e.target.checked)} />} label='Sidewalk' />
        </div>
        <div className='slider-container'>
          <FormControlLabel control={<Switch ref={switchTwo} onChange={(e) => setIsTreeOn(e.target.checked)} />} label='Trees' />
        </div>
        <div className='slider-container'>
          <FormControlLabel control={<Switch ref={switchThree} onChange={(e) => setIsCollisionOn(e.target.checked)} />} label='Traffic Accidents' />
        </div>
      </div>

      <hr></hr>

      <h2>Find Your Ideal Neighborhood</h2>
      <div id="switchbar-2">
        <div className='slider-container'>
          <FormControlLabel control={<Switch onChange={(e) => setFindNeighborhoodOn(e.target.checked)} />} label="Let's Start" />
        </div>
      </div>
      <div id='sliderbar'>
      <div className='slider-container'>
          <h3>Liveliness, or Quietness</h3>
          <Slider
            ref={sliderOne}
            aria-label="Always visible"
            step={50}
            marks={marks_pop}
            defaultValue={0}
            onChange={(e) => handleTreeCollisionSliderChange(e.target.value, 'population')}
          />
        </div>
        <div className='slider-container'>
          <h3>Foliage Coverage</h3>
          <Slider
            ref={sliderTwo}
            aria-label="Always visible"
            step={50}
            marks={marks_trees}
            defaultValue={0}
            onChange={(e) => handleTreeCollisionSliderChange(e.target.value, 'tree')}
          />
        </div>
        <div className='slider-container'>
          <h3>Traffic Safety (Accidents)</h3>
          <Slider
            ref={sliderThree} 
            aria-label="Always visible"
            step={50}
            marks={marks_collisions}
            defaultValue={0}
            onChange={(e) => handleTreeCollisionSliderChange(e.target.value, 'collision')}
          />
        </div>
      </div>
      {/*<hr></hr>*/}
      {/*<Legend legendOne={legendOne} legendTwo={legendTwo}/>*/}
    </>
  );
}

export default Slidebar;
