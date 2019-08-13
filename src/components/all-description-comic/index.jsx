import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ComicDescAll ({ match }) {
  useEffect(() => {
    fetchComic()
    console.log(match)
  }, [])

  const [comic, setComic] = useState({})

  const urlAPI_id = `https://gateway.marvel.com:443/v1/public/comics/${match.params.id}?ts=1&apikey=f8193ab013fef1d471e73016e2c433f6&hash=4367303eabe74df607ac7efcce830cea`

  const fetchComic = async () => {
    try {
        const fetchComic = await fetch(urlAPI_id)
        const comic = await fetchComic.json()
    
        setComic(comic)
        console.log(comic)
    }
    catch(err) {
        console.warn(err)
    }
  }

  return (
    <>
        {
            <section className="comics">
              { match.params.id }
            </section>
        }
    </>
  )
}

export default ComicDescAll