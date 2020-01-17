import Spotify from '../spotify/index.js'
import Mock from '../spotify/mock.js'

let client = Spotify

const authorization = {
    token: null,
    expiresIn: 0
};

export default class Player {

    authorizationToken (token, expiresIn) {
        authorization.token = token;
        authorization.expiresIn = expiresIn    
    }
   
    connectSpotify (...args) {
        console.log(`[Player] connecting spotify to player...`);
        client = Spotify
        console.log(`[Player] calling spotify.login...`);
        return client.login(...args)
    }

    connectMock (...args) {
        console.log(`[Player] connecting mock to player...`);
        client = Mock
        console.log(`[Player] calling mock.login...`);
        return client.login(...args)
    }

    authorize (...args) {
        console.log(`[Player] authorizing client...`);
        return client.authorize(...args)    
    }

    settings () {
        return client.settings()
    }

    me () {
        return client.me()
    }
} 