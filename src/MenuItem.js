import React from "react";
import {
    init,
    useFocusable
} from "@noriginmedia/norigin-spatial-navigation";
import { ReactComponent as Star } from './star.svg'

init({
    debug: false,
    visualDebug: false
});

export function MenuItem({ focusKey: focusKeyParam, onEnterPress, likedChannels, toggleLiked, ellement }) {
    const { focused, ref } = useFocusable({
        onEnterPress,
        focusKey: focusKeyParam,
    });

    if (ref.current && ref.current.dataset.isfocused == '1') {
        // console.log(ref);
        ref.current.scrollIntoView({ block: "center" })
    }
    return (
        <li ref={ref} className={(likedChannels.indexOf(ellement.id) != -1 ? 'liked' : '') + ' ' + (focused ? "focused" : "")} data-isfocused={focused ? "1" : ""} onClick={() => toggleLiked(ellement.id)}>
            <div className="channelList__logo">
                <img src="http://assets.iptv2022.com/static/channel/105/logo_256_1655386697.png" alt="" />
            </div>
            <div className="channelList__name"><h3>{ellement.title.split(' ')[0]}</h3></div>
            <div className="channelList__favorite"><Star className='channelList__star'></Star></div>
        </li >
    );
}