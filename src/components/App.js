import React, { useRef, useEffect, useState } from 'react';
import '../stylesheets/App.css';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Slidebar from './Slidebar';
 
mapboxgl.accessToken = 'pk.eyJ1IjoidGgtdGgiLCJhIjoiY2t3N2Q1YmNxOW8wajMxczE4ZndqaDRuNCJ9.UWfb1rN9Hl6lBXJGLC6Vrw';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.99);
  const [lat, setLat] = useState(40.78);
  const [zoom, setZoom] = useState(11.50); 
  
  const [ isTreeOn, setIsTreeOn ] = useState(false);
  const [ isCollisionOn, setIsCollisionOn ] = useState(false);

  const [filterHour, setFilterHour] = useState(['==', ['number', ['get', 'Hour']], 12]);
  const [filterDay, setFilterDay] = useState(['!=', ['string', ['get', 'Day']], 'placeholder']);

  function handleSliderChange(e){
    const hour = (parseInt(e.target.value))
    setFilterHour(['==', ['number', ['get', 'Hour']], hour]);
    map.current.setFilter('collisions', ['all', filterHour, filterDay]);
  }

  function handleDaySliderChange(e){
    const day = e.target.value;
    console.log(day)
    if (day === 'all') {
      setFilterDay(['!=', ['string', ['get', 'Day']], 'placeholder']);
    } else if (day === 'weekday') {
      setFilterDay(['match',['get', 'Day'],['Sat', 'Sun'], false, true]);
    } else if (day === 'weekend') {
      setFilterDay(['match', ['get', 'Day'], ['Sat', 'Sun'], true, false]);
    } else {
      console.error('error');
    }
    map.current.setFilter('collisions', ['all', filterHour, filterDay]);
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/th-th/cl7571mfr001l14pim5etz43v',
      center: [lng, lat],
      zoom: zoom
    });
  }, []);
  
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; 
    map.current.on('load', () => {
      let filterHour = ['==', ['number', ['get', 'Hour']], 12];
      let filterDay = ['!=', ['string', ['get', 'Day']], 'placeholder'];
      
      map.current.addLayer({
        id: 'sidewalks_people_total',
        type: 'fill',
        source: {
          type: 'geojson',
          data: 'https://taka-2628.github.io/nyc-sidewalk-geojson/data/nyc_tracts_sidewalks.geojson' // replace this with the url of your own geojson
        },
        paint: {
          'fill-color': [
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
        }
      });
      
      /*
      map.current.addLayer({
        id: 'sidewalks_area_p',
        type: 'fill',
        source: {
          type: 'geojson',
          data: 'https://taka-2628.github.io/nyc-sidewalk-geojson/data/nyc_tracts_sidewalks.geojson' // replace this with the url of your own geojson
        },
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'area_p_avg'],
            0,
            '#AA5E79',
            20000,
            '#A2719B',
            40000,
            '#8B88B6',
            60000,
            '#669EC4',
            80000,
            '#3BB3C3',
            100000,
            '#2DC4B2'
            ],
            'fill-opacity': 0.75
        }
      });
      */

      map.current.addLayer({
        id: 'collisions',
        type: 'circle',
        source: {
          type: 'geojson',
          data: 'https://taka-2628.github.io/nyc-sidewalk-geojson/data/collisions1601.geojson' 
        },
        'paint': {
          'circle-radius': 2,
          'circle-stroke-width': 1,
          'circle-color': '#F45459',
          'circle-stroke-color': '#F45459'
        },
        'filter': ['all', filterHour, filterDay]
      });
      
      // SEE LAYERS
      const layers = map.current.getStyle().layers;
      console.log(layers)
      
      //RE-ORGANIZE STACKING ORDER OF LAYERS
      map.current.moveLayer('nyc-trees-points');
      map.current.moveLayer('collisions');
    });    
  }, []);

  useEffect(()=>{
    if (!map.current) return;
    map.current.on('idle', () => {  
      // Set up the corresponding toggle button for each layer.
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
    })
  })
  
  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        <Slidebar isTreeOn={isTreeOn} setIsTreeOn={setIsTreeOn} isCollisionOn={isCollisionOn} setIsCollisionOn={setIsCollisionOn} />
        <div className="session">
          <h2>Hour: <label id="active-hour">12PM</label></h2>
          <input
            id="slider"
            className="row"
            type="range"
            min="0"
            max="23"
            step="1"
            value="12"
            onChange={handleSliderChange}
          />
        </div>
          <div className="session">
          <h2>Day of the week</h2>
          <div className="row" id="filters" onChange={handleDaySliderChange}>
            <input id="all" type="radio" name="toggle" value="all" defaultChecked="checked" />
            <label htmlFor="all">All</label>
            <input id="weekday" type="radio" name="toggle" value="weekday"/>
            <label htmlFor="weekday">Weekday</label>
            <input id="weekend" type="radio" name="toggle" value="weekend"/>
            <label htmlFor="weekend">Weekend</label>
          </div>
        </div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
