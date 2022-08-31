import React, { useState, useEffect } from 'react' 
import './App.css';
import tmdb from './tmdb'
import Header from './components/Header'
import FeaturedMovie from './components/FeaturedMovie'

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
    </div>
  );
}