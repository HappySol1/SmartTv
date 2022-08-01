import React from "react";
import {
    FocusContext,
    useFocusable
} from "@noriginmedia/norigin-spatial-navigation";
import { ReactComponent as Star } from './star.svg'

function Favorite({ onEnterPress, currPage, fetchAllHandler }) {
    const { ref, focused } = useFocusable({ onEnterPress });

    const handlePress = e => {
        console.log(1)
    }
    return (
        <li className={(currPage == 'all' ? 'active-categorie' : '1') + " " + (focused ? "focused" : "")} onClick={() => fetchAllHandler()} ref={ref} onKeyPress={handlePress}> Избранные </li>
    );
}

function Popular({ onEnterPress, currPage, fetchFavoriteHandler }) {
    const { ref, focused } = useFocusable({ onEnterPress });
    return (
        <li className={(currPage == 'favorite' ? 'active-categorie' : '') + ' ' + (focused ? "focused" : "")} onClick={() => fetchFavoriteHandler()} ref={ref}> <Star className='favorite-star'></Star>Популярные </li>
    );
}

export function Categories({ focusKey: focusKeyParam, currPage, fetchFavoriteHandler, fetchAllHandler }) {
    const { ref, focusKey, focusSelf, hasFocusedChild } = useFocusable({
        focusable: true,
        saveLastFocusedChild: false,
        trackChildren: true
    });



    React.useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    return (
        <FocusContext.Provider value={focusKey}>
            <div className="categories" ref={ref}>
                <ul>
                    <Favorite onEnterPress={() => fetchAllHandler()} focusKey='favorite' currPage={currPage} fetchAllHandler={fetchAllHandler} />
                    <Popular onEnterPress={() => fetchFavoriteHandler()} focusKey='all' currPage={currPage} fetchFavoriteHandler={fetchFavoriteHandler} />
                </ul>
            </div>
        </FocusContext.Provider>
    );
}
