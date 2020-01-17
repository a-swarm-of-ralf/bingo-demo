import uiSpotifyLogin from './ui-components/ui-spotify-login.js'
import uiWelcome from './ui-components/ui-welcome.js'
import uiSpotifyRedirect from './ui-components/ui-spotify-redirect.js'
import uiPepperConnect from './ui-components/ui-pepper-connect.js'
import uiGameSelect from './ui-components/ui-game-select.js'

export default [
    { path: '/welcome', name: 'welcome', component: uiWelcome },
    { path: '/spotify-login', name: 'spotify-login', component: uiSpotifyLogin },
    { path: '/spotify-redirect', name: 'spotify-redirect', component: uiSpotifyRedirect },
    { path: '/access_token*', name: 'spotify-token', component: uiSpotifyRedirect },
    { path: '/pepper-connect', name: 'pepper-connect', component: uiPepperConnect },
    { path: '/game-select', name: 'game-select', component: uiGameSelect }
  ]