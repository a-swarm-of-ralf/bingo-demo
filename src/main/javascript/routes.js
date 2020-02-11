import uiSpotifyLogin from './ui-components/ui-spotify-login.js'
import uiSpotifyRedirect from './ui-components/ui-spotify-redirect.js'

import uiPepperConnect from './ui-components/ui-pepper-connect.js'
import uiPepperReady from './ui-components/ui-pepper-ready.js'

import uiAgentLoad from './ui-components/ui-agent-load.js'

/* load agents */
import bingo from './iuxe/model/agents/bingo/agent.js'
import test from './iuxe/model/agents/test/agent.js'

/* Register Agents */
import agents from './iuxe/model/agents.js'
agents.register('bingo', bingo);
agents.register('test', test);


export default _.concat(agents.routes() ,[
    { path: '/spotify-login', name: 'spotify-login', component: uiSpotifyLogin },
    { path: '/spotify-redirect', name: 'spotify-redirect', component: uiSpotifyRedirect },
    { path: '/access_token*', name: 'spotify-token', component: uiSpotifyRedirect },
    { path: '/pepper-connect', name: 'pepper-connect', component: uiPepperConnect },
    { path: '/pepper-ready', name: 'pepper-ready', component: uiPepperReady },
    { path: '/agent-load', name: 'agent-load', component: uiAgentLoad }
  ]);