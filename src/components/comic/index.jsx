import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Comic () {
  useEffect(() => {
    fetchComics()
  }, [])

  const [comics, setComics] = useState([])

  const urlAPI = "https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=f8193ab013fef1d471e73016e2c433f6&hash=4367303eabe74df607ac7efcce830cea"

  const fetchComics = async () => {
    try {
      const data = await fetch(urlAPI)
      const comics = await data.json()
  
      console.log(comics.data.results)
      setComics(comics.data.results)
    }
    catch(err) {
      console.warn(err)
    }
  }

  return (
    <>
      <main>
        <header><h1> Characters Marvel Studios </h1></header>
        
        <div>
          <input type="text" />
          <button> Search </button>
        </div>

        <section>
        {
          comics.map((comics) => {
            return (
              <section className="comics" key={comics.id}>
                <img src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`} alt="" title="" />
                <h2> {comics.title}</h2>
                <Link to={`/${comics.id}`}> Siaba mais </Link>
              </section>
            )
          })
        }
        </section>
      </main>
    </>
  )
}

export default Comic