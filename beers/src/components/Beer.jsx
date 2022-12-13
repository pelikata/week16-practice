import React from 'react'

function Beer({beerData}) {
  return (
    <div className='sor'><h2>{beerData.name}</h2>
    <h3>{beerData.tagline}
    </h3>
    <h4>{beerData.abv}</h4>
    <img src={beerData.image_url} alt = "kep"></img></div>
  )
}

export default Beer