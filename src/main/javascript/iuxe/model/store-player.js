import player from '../../api/player/player.js'


export default {
    
    state: { 
        user: { display_name: '' },

        access_token: '',
        token_type: '',
        expires_in: 0,
        
        clientId: '3848d012f506457997ebde1cb526ebcf',
        scope: 'user-follow-modify user-follow-read user-library-read user-top-read user-read-email user-read-private',
        redirect_uri: `http://localhost:8080/`,
    },

    getters: {

        authorizationUrl (state) {
            return `https://accounts.spotify.com/authorize?client_id=${state.clientId}&` + 
                `redirect_uri=${encodeURIComponent(state.redirect_uri)}&` + 
                `scope=${encodeURIComponent(state.scope)}&response_type=token`;
        },

        userName (state) {
            return state.user.display_name
        }
    },

    mutations: {

        spotifyCredentials (state, access_token, token_type, expires_in) {
            state.access_token = access_token;
            state.token_type = token_type;
            state.expires_in = expires_in;
        },

        authorizedUser (state, user) {
            state.user = user;
        }
    },

    actions: {

        authorizeSpotify ({ getters }) {
            console.log(`[StorePlayer] authorizing spotify...`)
            window.location.href = getters.authorizationUrl
        },

        authorizeMock ({ dispatch }) {
            console.log(`[StorePlayer] authorizing player mock...`)
            return dispatch('authorizedMock')
        },

        authorizedSpotify ({ commit, dispatch }, access_token, token_type, expires_in) {
            console.log(`[StorePlayer] spotify authorized. received token "${access_token}"`)
            player.loadImpl('spotify')
            player.authorized(access_token);
            commit('spotifyCredentials', access_token, token_type, expires_in);
            return dispatch('loadUser')
        },

        authorizedMock ({ dispatch }) {
            console.log(`[StorePlayer] mock authorized.`)
            player.loadImpl('mock')
            player.authorized(access_token);
            return dispatch('loadUser')
        },

        loadUser ({ commit }) {
            return player.me().then(user => {
                console.log(`[StorePlayer] User ${user.display_name} logged in.`)
                return commit('authorizedUser', user) 
            });
        }
    }
  }