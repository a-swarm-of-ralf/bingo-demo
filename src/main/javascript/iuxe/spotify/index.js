import Client from '../../spotify-sdk/Client.js';
import UserHandler from '../../spotify-sdk/handlers/UserHandler.js';
import Ontology from '../ontology/index.js'


const key = 'spotify-settings';
const fields = ['settings', ' token', 'tokenType', 'expiresIn']


const restore = function (client = Client.instance) {
    if (!client.data) {
        console.log(`[Spotify] restoring stored settings...`);
        return Ontology.get(key)
            .then(data => _.assign(data, { restored: true }))
            .then(data => { client.data = data; return data;}) 
            .then(data => { 
                data.settings = data.settings || {};
                client.settings = data.settings; 
                client.token = data.token; 
                return client;
            }) 
    } else {
        console.log(`[Spotify] returning cached client...`);
        return Promise.resolve(client)    
    }
}

const commit = function (client) {
    console.log(`[Spotify] saving stored settings...`);
    console.log(`[Spotify] commiting client `, client);
    console.log(`[Spotify] commiting data `, client.data);
    return Ontology.set(key, client.data).then(() => client);
}

export default {

    settings () {
        return Ontology.get('spotify')
    },

    /**
     * Build authorization url based on Implicit Grant Flow
     *  
     * See: https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
     * @param {*} clientId 
     * @param {*} scope 
     * @param {*} redirectUri 
     */
    authorizationUrl (clientId, scope, redirectUri) {
        return `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`
    },

    login (clientId, secretId, scopes, redirect_uri) {
        console.log(`[Spotify] logging in...`);
        const url = this.authorizationUrl(clientId, scopes, redirect_uri)

        return restore(Client.instance)
            .then(client => {  _.set(client, 'data.settings', { clientId, secretId, scopes, redirect_uri }) ; return client; })
            .then(client => { client.settings = client.data.settings; return client; })
            .then(client => commit(client))
            .then(client => client.login())
            .then(url => {
                console.log(`[Spotify] redirecting to "${url}"...`);
                console.log(`[Spotify] url`, url);
                // window.location.href = url;
                return url;
            })
    },

    authorize (token, tokenType, expiresIn) {
        console.log(`Spotify authorized`)
        return restore()
            .then(client => { _.assign(client.data, { token, tokenType, expiresIn }); return client; })
            .then(client => { _.assign(client, { token }); return client; })
            .then(commit)
    },

    me (access_token) {
        const instance = axios.create({
            baseURL: 'https://api.spotify.com/v1/',
            timeout: 5000,
            headers: {'Authorization': 'Bearer ' + access_token }
        });
        return instance.get('/me')
            .then(function (response) {
                console.log(`[Spotify] /me called with status ${response.status} ${response.statusText}`);
                return response.data;
            });
    
    }
}

