export default function (state) {

    return {
        me(data = '') { return state.addAction('player/me', 'player', 'me', data ); },
        playlists(data = '') { return state.addAction('player/playlists', 'player', 'playlists', data ); },
        tracks (playlist_id, data = '') { return state.addAction('player/tracks', 'player', 'tracks', data, playlist_id ); },
        
        devices (data = '') { return state.addAction('player/devices', 'player', 'devices', data ); },
        player (data = '') { return state.addAction('player/player', 'player', 'player', data ); },
        recentlyPlayed (data = '') { return state.addAction('player/played', 'player', 'recentlyPlayed', data ); },
        pause (data = '') { return state.addAction('player/paused', 'player', 'pause', data ); },
        seek (position_ms, data = '') { return state.addAction('player/sought', 'player', 'seek', data, position_ms ); },
        repeat (pstate, data = '') { return state.addAction('player/repeating', 'player', 'repeat', data, pstate ); },
        volume (volume_percent, data = '') { return state.addAction('player/volume', 'player', 'volume', data, volume_percent ); },
        next (data = '') { return state.addAction('player/next', 'player', 'next', data ); },
        previous (data = '') { return state.addAction('player/previous', 'player', 'previous', data ); },
        play (data = '') { return state.addAction('player/playing', 'player', 'play', data ); },
        playTrack (uri, data = '') { return state.addAction('player/playing', 'player', 'playTrack', data, uri ); },
        shuffle (pstate, data = '') { return state.addAction('player/shuffling', 'player', 'shuffle', data, pstate ); },
        transfer (device_ids, data = '') { return state.addAction('player/transfered', 'player', 'transfer', data, device_ids ); },
        search (q, type = 'track', limit = 20, offset = 0, data = '') { return state.addAction('player/searched', 'player', 'search', data, q, type, limit, offset ); },
    }
}