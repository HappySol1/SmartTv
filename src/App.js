import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { ReactComponent as Star } from './star.svg'
import { initNavigation, setKeyMap, withFocusable } from '@noriginmedia/react-spatial-navigation';
initNavigation();
setKeyMap({
  'left': 9001,
  'up': 9002,
  'right': 9003,
  'down': 9004,
  'enter': 9005
});

function App() {
  let [myChannels, setMyChannels] = useState([])
  let [likedChannels, setLikedChannels] = useState(JSON.parse(localStorage.getItem('likedChannels')) || [])
  let fetchedAmmount = useRef(0)
  let [canWeFenchMore, setCanWeFenchMore] = useState(false)
  let [currPage, setCurrPage] = useState('all') //Какой ужас. Но не подключать же роутер ради одного таба

  useEffect(() => {
    fetchMyChannels()
  }, [])

  useEffect(() => {
    localStorage.setItem('likedChannels', JSON.stringify(likedChannels))
  }, [likedChannels])

  function fetchMyChannels(startNumber = 0) {
    fetch(`https://jsonplaceholder.typicode.com/todos?_start=${startNumber}&_limit=12`)    //Допустим это каналы
      .then(response => response.json())
      .then(json => {
        setMyChannels(prev => [...prev, ...json]);
        fetchedAmmount.current += 12;
        setCanWeFenchMore(json.length == 12 ? true : false)
      })
  }

  function fetchAllHandler() {
    setMyChannels([])
    fetchedAmmount.current = 0;
    fetchMyChannels()
    setCurrPage('all')
  }

  function fetchFavoriteHandler() {
    setMyChannels([])
    setCanWeFenchMore(false)
    setCurrPage('favorite')
    //Я пока это писал у меня было ощущение, что я совершаю самую большую ошибку в своей жизни. 
    //Но подумав немного я решил, что не знаю как по другому это написать и наверно мой вариант таки имеет право на существование
    for (let i = 0; i < likedChannels.length; i++) {
      fetch(`https://jsonplaceholder.typicode.com/todos/${likedChannels[i]}`)
        .then(response => response.json())
        .then(json => { setMyChannels(prev => [...prev, json]) })
    }
  }

  const renderMyChannels = myChannels.map((e) => {
    return <li key={e.id} className={likedChannels.indexOf(e.id) != -1 ? 'liked' : null} onClick={() => toggleLiked(e.id)}>
      <div className="channelList__logo">
        <img src="http://assets.iptv2022.com/static/channel/105/logo_256_1655386697.png" alt="" />
      </div>
      <div className="channelList__name"><h3>{e.id + '' + e.title.split(' ')[0]}</h3></div>
      <div className="channelList__favorite"><Star className='channelList__star'></Star></div>
    </li >
  })

  function toggleLiked(id) {
    if (likedChannels.indexOf(id) == -1) {
      setLikedChannels([...likedChannels, id])
    } else {
      setLikedChannels(likedChannels.filter((e) => e != id))
    }
  }

  function ComponentNav() {
    return <ul>
      <li focusable className={currPage == 'all' ? 'active-categorie' : ''} onClick={() => fetchAllHandler()}>Популярные</li>
      <li focusable className={currPage == 'favorite' ? 'active-categorie' : ''} onClick={() => fetchFavoriteHandler()}><Star className='favorite-star'></Star>Избранные</li>
    </ul>
  }
  const FocusableComponent = withFocusable()(ComponentNav);


  return (
    <div className="App">
      <div className="header">Header</div>
      <div className="mainpage">
        <div className="categories">
          <FocusableComponent />
        </div>
        <div className="channels">
          <ul className='channelList'>
            {renderMyChannels}
          </ul>
          {canWeFenchMore ? <button className='showMore' onClick={() => fetchMyChannels(fetchedAmmount.current)}>Показать еще</button> : null}
        </div>
      </div>
      <div className="footer">Footer</div>
    </div>
  );
}

export default App;
