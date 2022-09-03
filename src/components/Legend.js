function Legend( legendOne, legendTwo){
  return(
    <> 
      <div className='legend' id="legend-1" >
        <h3>People on Sidewalk</h3>
        <div className='row colors2'>
        </div>
        <div className='row labels'>
          <div className='label'>Less</div>
          <div className='label'></div>
          <div className='label'></div>
          <div className='label'></div>
          <div className='label'></div>
          <div className='label'>More</div>
        </div>
      </div>
      <div className='legend'id="legend-2" >
        <h3>People on Sidewalk</h3>
        <div className='row colors'>
        </div>
        <div className='row labels'>
          <div className='label'>Less</div>
          <div className='label'></div>
          <div className='label'></div>
          <div className='label'></div>
          <div className='label'></div>
          <div className='label'>More</div>
        </div>
      </div>
    </>
  )
}

export default Legend