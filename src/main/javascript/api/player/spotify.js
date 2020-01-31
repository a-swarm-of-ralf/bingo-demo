let inst = axios

export default {

    authorized (access_token) {
        
        inst = axios.create({
            baseURL: 'https://api.spotify.com/v1/',
            timeout: 5000,
            headers: {'Authorization': 'Bearer ' + access_token }
        });
    },

    me () {
        console.log(`[Spotify] me()...`);
        return inst.get('/me').then(res => {
            console.log(`[Spotify] /me called with status ${res.status} ${res.statusText}`);
            return res.data;
        })
    }

}