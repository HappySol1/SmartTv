import React, { useState, useEffect, useRef } from 'react';
import "./App.css";
import { Menu } from "./Menu";
import { Categories } from "./Categories";

export default function App() {
  let [myChannels, setMyChannels] = useState([])
  let [likedChannels, setLikedChannels] = useState(JSON.parse(localStorage.getItem('likedChannels')) || [])
  let fetchedAmmount = useRef(0)
  let [canWeFenchMore, setCanWeFenchMore] = useState(false)
  let [currPage, setCurrPage] = useState('all') //Какой ужас. Но не подключать же роутер ради одного таба

  useEffect(() => {
    fetchMyChannels()
    // document.addEventListener("keydown", keydownhandler);
    // return document.removeEventListener("keydown", keydownhandler);
  }, [])
  function keydownhandler(e) {
    // console.log(e);
  }
  useEffect(() => {
    localStorage.setItem('likedChannels', JSON.stringify(likedChannels))
  }, [likedChannels])

  function fetchMyChannels(startNumber = 0) {
    fetch(`https://jsonplaceholder.typicode.com/todos?_start=${startNumber}&_limit=4`)    //Допустим это каналы
      .then(response => response.json())
      .then(json => {
        setMyChannels(prev => [...prev, ...json]);
        fetchedAmmount.current += 4;
        setCanWeFenchMore(json.length == 4 ? true : false)
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

  function toggleLiked(id) {
    if (likedChannels.indexOf(id) == -1) {
      setLikedChannels([...likedChannels, id])
    } else {
      setLikedChannels(likedChannels.filter((e) => e != id))
    }
  }

  return (
    <div className="App">
      <div className="header">Header</div>
      <div className="mainpage">


        <Menu focusKey="Menu" myChannels={myChannels} likedChannels={likedChannels} toggleLiked={toggleLiked} fetchMyChannels={fetchMyChannels} fetchedAmmount={fetchedAmmount.current} canWeFenchMore={canWeFenchMore} />
        <Categories focusKey="Categories" currPage={currPage} fetchAllHandler={fetchAllHandler} fetchFavoriteHandler={fetchFavoriteHandler} />
      </div>
      <div className="footer">Footer</div>
    </div>
  );
}
