import React from "react";
import {
    FocusContext,
    init,
    useFocusable
} from "@noriginmedia/norigin-spatial-navigation";
import { MenuItem } from './MenuItem'


init({
    debug: false,
    visualDebug: false
});

export function ShowMore({ focusKey: focusKeyParam, canWeFenchMore, fetchMyChannels, fetchedAmmount, onEnterPress }) {
    const { focused, ref, setFocus } = useFocusable({
        onEnterPress,
        focusKey: focusKeyParam,
    });

    return (
        <>
            {canWeFenchMore ? <button ref={ref} className={'showMore ' + (focused ? "focused" : "")} onClick={() => { fetchMyChannels(fetchedAmmount); setFocus('fk' + (fetchedAmmount - 1)); }} > Показать еще</button > : null}
        </>
    );
}

export function Menu({ focusKey: focusKeyParam, myChannels, likedChannels, toggleLiked, fetchMyChannels, fetchedAmmount, canWeFenchMore }) {
    const { ref, focusKey, focusSelf, hasFocusedChild, setFocus } = useFocusable({
        focusable: true,
        saveLastFocusedChild: false,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
        focusKey: focusKeyParam,
        onEnterPress: () => { },
        onEnterRelease: () => { },
        onArrowPress: () => true
    });

    React.useEffect(() => {
        focusSelf();
    }, [focusSelf]);


    return (
        <FocusContext.Provider value={focusKey}>
            <div className="channels" ref={ref}>
                <ul className='channelList'>
                    {myChannels.map((ellement, index) => {
                        return <MenuItem key={ellement.id} onEnterPress={() => toggleLiked(ellement.id)} focusKey={'fk' + index} likedChannels={likedChannels} toggleLiked={toggleLiked} ellement={ellement} />
                    })}
                    <ShowMore focusKey="showMoreBtn" onEnterPress={() => { fetchMyChannels(fetchedAmmount); setFocus('fk' + (fetchedAmmount - 1)); }} canWeFenchMore={canWeFenchMore} fetchMyChannels={fetchMyChannels} fetchedAmmount={fetchedAmmount} />
                </ul>
            </div>
        </FocusContext.Provider >
    );
}
