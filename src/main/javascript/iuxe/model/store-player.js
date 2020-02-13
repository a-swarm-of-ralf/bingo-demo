import player from '../../api/player/player.js'


const timestamp = function () {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}


export default {
    
    state: { 
        user: { display_name: '' },
        
        feedback: {
            status: 0,
            message: '',
        },

        access_token: '',
        token_type: '',
        expires_in: 0,
        expires_at: 0,
        
        clientId: '3848d012f506457997ebde1cb526ebcf',
        scope: 'user-follow-modify user-follow-read user-library-read user-top-read ' +
            'user-read-email user-read-private playlist-read-private playlist-read-collaborative ' +
            'user-modify-playback-state user-read-playback-state user-read-recently-played user-read-currently-playing ',
        redirect_uri: `http://${window.location.host}${window.location.pathname}`,
    },

    getters: {

        PlayerConnected (state) {
            return !!state.access_token; 
        },

        PlayerNotExpired (state) {
            return state.access_token && expires_at <= timestamp()
        },

        authorizationUrl (state) {
            return `https://accounts.spotify.com/authorize?client_id=${state.clientId}&` + 
                `redirect_uri=${encodeURIComponent(state.redirect_uri)}&` + 
                `scope=${encodeURIComponent(state.scope)}&response_type=token`;
        },

        userName (state) {
            return state.user.display_name
        },

        playerHasFeedback (state) {
            return state.feedback.status != 0
        },

        playerFeedbackMessage (state) {
            return state.feedback.message
        },

        playerFeedbackStatus (state) {
            return state.feedback.status
        },
    },

    mutations: {

        spotifyCredentials (state, access_token, token_type, expires_in) {
            state.access_token = access_token;
            state.token_type = token_type;
            state.expires_in = expires_in;
            state.expires_at = timestamp() + (parseInt(expires_in) * 1000);
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
        },

        loadPlaylists ({commit, state}) {
            return player.me().then(user => {
                console.log(`[StorePlayer] User ${user.display_name} logged in.`)
                return commit('authorizedUser', user) 
            });    
        },

        PlayerCall({ dispatch }, method, args) {
            console.log(`[StorePlayer] Calling ${method}()...`)
            
            if (!player[method]) {
                console.log(`[StorePlayer] Error: Player has no method "${method}".`)
                return Promise.reject({code: 'player-unknown-method', message: `Api "player" is has no method ${method}.` })
            }

            console.log(`[StorePlayer] Calling ${method}()...`)
            return player[method](...args).then(result => {
                console.log(`[StorePlayer] ${method}() called.`)
                return dispatch('AgentEmitEvent', { name: `player.${method}`, args: [result] });
            });    
        },
    }
  }