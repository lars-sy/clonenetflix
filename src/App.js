import React, { useState, useEffect } from 'react' 
import './App.css';
import tmdb from './tmdb'
import Header from './components/Header'
import FeaturedMovie from './components/FeaturedMovie'
import MovieRow from './components/MovieRow';

export default () => {
  
  const [movieList, setMovieList] = useState([]); //cria variavel movielist com array vazio
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false)
  
useEffect(() => {
  const loadAll = async () => {
    let list = await tmdb.getHomeList();
    console.log(list)
    setMovieList(list)

    let originals = list.filter(i => i.slug === 'originals')
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length-1))
    let chosen = originals[0].items.results[randomChosen]
    let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv')
    console.log(chosenInfo)
    setFeaturedData(chosenInfo)
  }
  loadAll()
}, [])

useEffect(() => {
  const scrollListener = () => {
    if (window,scrollY > 10) {
      setBlackHeader(true)
    } else {
      setBlackHeader(false)
    }
  }
  window.addEventListener('scroll', scrollListener)

  return() => {
    window.removeEventListener('scroll', scrollListener)
  }
}, [])

  return (
    <div className="page">
      <Header black={blackHeader}/>

      {featuredData && 
        <FeaturedMovie item={featuredData}/>
      }

      <div className='lists'>
        {movieList.map((item, key) => 
          <MovieRow key={key} title={item.title} items={items.items} />
        )}
      </div>

      <footer>
          Feito por Larissy <br />
          Direitos de imagens para Netflix <br />
          Dados pegos do site Themoviedb.org
     </footer>
      {movieList.length <=0 && 
      <div className='loading'>
        <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="Carregando" />
      </div>
      }
    </div>
  );
}