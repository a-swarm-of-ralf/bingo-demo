let inst = axios


export default {

    authorized (access_token) {
        
        inst = axios.create({
            baseURL: 'https://api.spotify.com/v1/',
            timeout: 5000,
            headers: {'Authorization': 'Bearer ' + access_token }
        });
    },

    get (path) {
        console.log(`[Spotify] get "${path}"...`);
        return inst.get(path).then(res => {
            console.log(`[Spotify] "${path}" called with status ${res.status} ${res.statusText}`);
            return res.data;
        })
    },

    post (path, data = {}) {
        console.log(`[Spotify] post "${path}"...`);
        return inst.post(path, data).then(res => {
            console.log(`[Spotify] "${path}" called with status ${res.status} ${res.statusText}`);
            return res.data;
        })
    },

    put (path, data = {}) {
        console.log(`[Spotify] put "${path}"...`);
        return inst.put(path, data).then(res => {
            console.log(`[Spotify] "${path}" called with status ${res.status} ${res.statusText}`);
            return res.data;
        })
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
     */
    me () {
        return this.get('/me');
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
     */
    playlists () {
        return this.get('/me/playlists');
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
     */
    tracks (playlist_id) {
        return this.get(`/playlists/${playlist_id}/tracks`);
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/get-a-users-available-devices/
     */
    devices () {
        return this.get('/me/player/devices');
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/get-information-about-the-users-current-playback/
     */
    player () {
        return this.get('/me/player');
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
     */
    recentlyPlayed () {
        return this.get('/me/player/recently-played');
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/pause-a-users-playback/
     */
    pause () {
        return this.put('/me/player/pause', {});
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/seek-to-position-in-currently-playing-track/
     */
    seek (position_ms) {
        return this.put(`/me/player/seek?position_ms=${position_ms}`, {});
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/set-repeat-mode-on-users-playback/
     */
    repeat (state) {
        return this.put(`/me/player/repeat?state=${state}`);
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/set-volume-for-users-playback/
     */
    volume (volume_percent) {
        return this.put(`/me/player/volume?volume_percent=${volume_percent}`);
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/skip-users-playback-to-next-track/
     */
    next () {
        return this.post(`/me/player/next`);
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/skip-users-playback-to-previous-track/
     */
    previous () {
        return this.post(`/me/player/previous`);
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
     */
    play () {
        return this.put(`/me/player/play`);
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
     */
    playTrack (uri) {
        console.log(`[SPOTIFY] playTrack('${uri}')`);
        return this.put(`/me/player/play`, { "uris": [uri] });
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/toggle-shuffle-for-users-playback/
     */
    shuffle (state) {
        return this.post(`/me/player/shuffle?state=${state}`);
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
     */
    transfer (device_ids) {
        return this.put(`/me/player`, { device_ids, play:true});
    },

    /**
     * See: https://developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
     */
    search (q, type = 'track', limit = 20, offset = 0 ) {
        return this.get(`/search?q=${q}&type=${type}&limit=${limit}&offset=${offset}`);
    },
}