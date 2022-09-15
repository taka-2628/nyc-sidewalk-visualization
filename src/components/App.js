import React, { useRef, useEffect, useState } from 'react';
import '../index.css';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Slidebar from './Slidebar';
 
mapboxgl.accessToken = 'pk.eyJ1IjoidGgtdGgiLCJhIjoiY2t3N2Q1YmNxOW8wajMxczE4ZndqaDRuNCJ9.UWfb1rN9Hl6lBXJGLC6Vrw';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  
  const lng = -73.99
  const lat = 40.75
  const zoom = 12
  //const [lng, setLng] = useState(-73.99);
  //const [lat, setLat] = useState(40.75);
  //const [zoom, setZoom] = useState(12); 

  const switchOne = useRef(null);
  const switchTwo = useRef(null);
  const switchThree = useRef(null);

  const sliderOne = useRef(null);
  const sliderTwo = useRef(null);
  const sliderThree = useRef(null);

  const legendOne = useRef(null);
  const legendTwo = useRef(null);

  let isSidewalkOn = true;
  let isTreeOn = false;
  let isCollisionOn = false;
  let isCombinedDataOn = false;

  function setIsSidewalkOn(){
    isSidewalkOn = !isSidewalkOn
    if(isSidewalkOn){
      switchOne.current.classList.add('Mui-checked');
    } else {
      switchOne.current.classList.remove('Mui-checked');
    }
  }
  function setIsTreeOn(){
    isTreeOn = !isTreeOn
    if(isTreeOn){
      switchTwo.current.classList.add('Mui-checked');
    } else {
      switchTwo.current.classList.remove('Mui-checked');
    }
  }
  function setIsCollisionOn(){
    isCollisionOn =!isCollisionOn
    if(isCollisionOn){
      switchThree.current.classList.add('Mui-checked');
    } else {
      switchThree.current.classList.remove('Mui-checked');
    }
  }
  function setFindNeighborhoodOn(){
    isCombinedDataOn = !isCombinedDataOn
    if (isCombinedDataOn){
      isSidewalkOn = false;
      isTreeOn = false;
      isCollisionOn = false;
      // Switch
      switchOne.current.classList.remove('Mui-checked');
      switchOne.current.firstChild.disabled = true;
      switchTwo.current.classList.remove('Mui-checked');
      switchTwo.current.firstChild.disabled = true;
      switchThree.current.classList.remove('Mui-checked');
      switchThree.current.firstChild.disabled = true;
      // Slider
      sliderOne.current.classList.remove('Mui-disabled');
      sliderOne.current.lastChild.firstChild.disabled = false;
      sliderTwo.current.classList.remove('Mui-disabled');
      sliderTwo.current.lastChild.firstChild.disabled = false;
      sliderThree.current.classList.remove('Mui-disabled');
      sliderThree.current.lastChild.firstChild.disabled = false;
      // Legend
    } else {
      isSidewalkOn = true
      isTreeOn = false
      isCollisionOn = false
      // Switch
      switchOne.current.firstChild.disabled = false;
      switchOne.current.firstChild.checked = true;
      switchOne.current.classList.add('Mui-checked');
      switchTwo.current.firstChild.disabled = false;
      switchTwo.current.firstChild.checked = false;
      switchThree.current.firstChild.disabled = false;
      switchThree.current.firstChild.checked = false;
      // Slider
      sliderOne.current.classList.add('Mui-disabled');
      sliderOne.current.lastChild.firstChild.disabled = true;
      sliderTwo.current.classList.add('Mui-disabled');
      sliderTwo.current.lastChild.firstChild.disabled = true;
      sliderThree.current.classList.add('Mui-disabled');
      sliderThree.current.lastChild.firstChild.disabled = true;
      // Legend
    }  
  }

  let filterPopulation = ['==', ['string', ['get', 'pop_category']], 'less']
  let filterTree = ['!=', ['string', ['get', 'tree_category']], 'placeholder']
  let filterCollision = ['!=', ['string', ['get', 'collision_category']], 'placeholder']

  function handleTreeCollisionSliderChange(value, key){
    if (key === 'population'){
      console.log(value)
      if(value === 0){
        filterPopulation = (['==', ['string', ['get', 'pop_category']], 'less']) 
      } else if (value === 50){
        filterPopulation = (['==', ['string', ['get', 'pop_category']], 'average'])
      } else if (value === 100){
        filterPopulation = (['==', ['string', ['get', 'pop_category']], 'more'])
      } else {
        console.error('error');
      }
    } else if(key === 'tree'){
      console.log(value)
      if(value === 0){
        filterTree = (['!=', ['string', ['get', 'tree_category']], 'placeholder']) 
      } else if (value === 50){
        filterTree = (['!=', ['string', ['get', 'tree_category']], 'less'])
      } else if (value === 100){
        filterTree = (['==', ['string', ['get', 'tree_category']], 'more'])
      } else {
        console.error('error');
      }
    } else if (key === 'collision'){
      console.log(value)
      if(value === 0){
        filterCollision = (['!=', ['string', ['get', 'collision_category']], 'placeholder']) 
      } else if (value === 50){
        filterCollision = (['!=', ['string', ['get', 'collision_category']], 'more'])
      } else if (value === 100){
        filterCollision = (['==', ['string', ['get', 'collision_category']], 'less'])
      } else {
        console.error('error');
      }
    }
    map.current.setFilter('data-combined', ['all', filterPopulation, filterTree, filterCollision])
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/th-th/cl7571mfr001l14pim5etz43v',
      center: [lng, lat],
      minZoom: 12,
      zoom: zoom
    });
  });
  /*
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  */
  useEffect(() => {
    if (!map.current) return; 
    map.current.on('load', () => {

      map.current.addLayer({
        id: 'data-combined',
        type: 'fill',
        source: {
          type: 'geojson',
          data: 'https://taka-2628.github.io/nyc-sidewalk-geojson/data/nyc_tracts_combined_category.geojson'
        },
        paint: {
          'fill-color': /*'#AA5E79'*/[
            'interpolate',
            ['linear'],
            ['get', 'p_total_avg'],
            0,
            '#2DC4B2',
            1200,
            '#3BB3C3',
            2400,
            '#669EC4',
            3600,
            '#8B88B6',
            4800,
            '#A2719B',
            6000,
            '#AA5E79'
          ],
          'fill-outline-color': 'rgba(255,255,255,0.5)',
          'fill-opacity': 0.75
        }, 
        filter: ['all', filterPopulation, filterTree, filterCollision]
      });

      map.current.addLayer({
        id: 'collisions',
        type: 'circle',
        source: {
          type: 'geojson',
          data: 'https://taka-2628.github.io/nyc-sidewalk-geojson/data/collisions1601.geojson' 
        },
        'paint': {
          'circle-radius': 1.5,
          'circle-stroke-width': 1,
          'circle-color': '#F45459',
          'circle-stroke-color': '#F45459'
        }
      });
      
      // SEE LAYERS
      const layers = map.current.getStyle().layers;
      console.log(layers)
      //RE-ORGANIZE STACKING ORDER OF LAYERS
      map.current.moveLayer('nyc-sidewalk-geometry')
      map.current.moveLayer('nyc-trees-points');
      map.current.moveLayer('collisions');
    });    
  }, []);

  useEffect(()=>{
    if (!map.current) return;
    map.current.on('idle', () => {  
      // Set up the corresponding toggle button for each layer.
      if (isSidewalkOn){
        map.current.setLayoutProperty('nyc-sidewalk-geometry', 'visibility', 'visible');
      } else {
        map.current.setLayoutProperty('nyc-sidewalk-geometry', 'visibility', 'none');
      }
      if (isTreeOn) {
        map.current.setLayoutProperty('nyc-trees-points', 'visibility', 'visible');
      } else {
        map.current.setLayoutProperty('nyc-trees-points', 'visibility', 'none');
      }
      if (isCollisionOn) {
        map.current.setLayoutProperty('collisions', 'visibility', 'visible');
      } else {
        map.current.setLayoutProperty('collisions', 'visibility', 'none');
      }
      if (isCombinedDataOn){
        map.current.setLayoutProperty('data-combined', 'visibility', 'visible');
      } else {
        map.current.setLayoutProperty('data-combined', 'visibility', 'none');
      }
    })
  })

  useEffect(() => {
    sliderOne.current.classList.add('Mui-disabled');
    sliderOne.current.lastChild.firstChild.disabled = true;
    sliderTwo.current.classList.add('Mui-disabled');
    sliderTwo.current.lastChild.firstChild.disabled = true;
    sliderThree.current.classList.add('Mui-disabled');
    sliderThree.current.lastChild.firstChild.disabled = true;
  }, [])
  
  return (
    <div>
      <div className="sidebar">
        <h1>NYC Interactive Neighborhood Map</h1>
        {/*Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}*/}
        <Slidebar setIsSidewalkOn={setIsSidewalkOn} setIsTreeOn={setIsTreeOn} setIsCollisionOn={setIsCollisionOn} handleTreeCollisionSliderChange={handleTreeCollisionSliderChange} setFindNeighborhoodOn={setFindNeighborhoodOn} switchOne={switchOne} switchTwo={switchTwo} switchThree={switchThree} sliderOne={sliderOne} sliderTwo={sliderTwo} sliderThree={sliderThree} legendOne={legendOne} legendTwo={legendTwo}/>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
