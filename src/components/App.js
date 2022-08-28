import React, { useRef, useEffect, useState } from 'react';
import '../stylesheets/App.css';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Slidebar from './Slidebar';
 
mapboxgl.accessToken = 'pk.eyJ1IjoidGgtdGgiLCJhIjoiY2t3N2Q1YmNxOW8wajMxczE4ZndqaDRuNCJ9.UWfb1rN9Hl6lBXJGLC6Vrw';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.95);
  const [lat, setLat] = useState(40.78);
  const [zoom, setZoom] = useState(11);  
  
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
  });
  
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    map.current.on('load', () => {
      let filterHour = ['==', ['number', ['get', 'Hour']], 12];
      let filterDay = ['!=', ['string', ['get', 'Day']], 'placeholder'];
      

      map.current.addLayer({
        id: 'collisions',
        type: 'circle',
        source: {
          type: 'geojson',
          data: 'https://taka-2628.github.io/nyc-sidewalk-geojson/data/collisions1601.geojson' // replace this with the url of your own geojson
        },
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['number', ['get', 'Casualty']],
            0,
            4,
            5,
            24
          ],
          'circle-color': [
            'interpolate',
            ['linear'],
            ['number', ['get', 'Casualty']],
            0,
            '#2DC4B2',
            1,
            '#3BB3C3',
            2,
            '#669EC4',
            3,
            '#8B88B6',
            4,
            '#A2719B',
            5,
            '#AA5E79'
          ],
          'circle-opacity': 0.8
        },
        'filter': ['all', filterHour, filterDay]
      });
    });    

  });
  
  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        <Slidebar />
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
