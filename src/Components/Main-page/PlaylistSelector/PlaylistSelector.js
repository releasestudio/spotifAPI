import React, { useState, useEffect, useContext } from 'react';
import './PlaylistSelector.css';
import Spotify from '../../../util/Spotify';
import {Context} from '../../../util/Context';

export default function PlaylistSelector (props) {
    const [playlistsList, setPlaylistsList] = useState([]);
    const {setSearchOrEdit, setSelectedPlaylistName, setSelectedPlaylistTracks } = useContext(Context);

    useEffect(() => {
        try {
            Spotify.getPlaylists().then(results =>{
                setPlaylistsList(results)
            });
        } catch (e) {
            window.location.assign("http://localhost:3000/");
        }
    }, [])

    function changeSelectedPl(e){
        let newName = e.target.name;
        setSearchOrEdit('edit')
        setSelectedPlaylistName(newName);
        let id = e.target.id;
        Spotify.getPlaylistTracks(id).then(trackList =>{
            setSelectedPlaylistTracks(trackList)
        })
    }

    return (
        <div className="PlaylistSelectorBox">
            {
                playlistsList.map(playlist => {
                    return <button key={playlist.plId} id={playlist.plId} className="PlaylistButton" name={playlist.plName} onClick={changeSelectedPl} >{playlist.plName}</button>;
                })
            }
        </div>
    );
}