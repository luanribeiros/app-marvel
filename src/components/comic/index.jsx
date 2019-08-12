import React, { Fragment, PureComponent } from 'react'
import { Link } from 'react-router-dom'

const urlAPI = "https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=f8193ab013fef1d471e73016e2c433f6&hash=4367303eabe74df607ac7efcce830cea"

class App extends PureComponent {
  constructor() {
    super()

    this.state = {
      api: []
    }

  }

  async componentDidMount() {
    try {
      const res = await fetch(urlAPI)
      const resData = await res.json()
      
      this.setState({
        api: resData.data.results
      })
      console.log(this.state.api)
    }
    catch(err) {
      console.warn("Erro no Fetch", err)
    }
  }

  render() {
    const { api } = this.state
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
          api.map((comics) => {
            return (
              <section className="comics" key={comics.id}>
                <img src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`} alt="" title="" />
                <h2> {comics.title}</h2>
            </section>
            )
          })
        }
        </section>
      </main>
      </>
    )
  }
}

export default App