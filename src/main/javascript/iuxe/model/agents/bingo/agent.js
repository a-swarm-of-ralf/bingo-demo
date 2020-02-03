import uiMain from './ui-main.js'
import uiSelectPlaylist from './ui-playlist-select.js'


const app = {

    name: "bingo",
    ui: { 
        main: uiMain ,
        playlists: uiSelectPlaylist
    },

    loaded (ontology, plan) {
        console.log('Loading agent...')
    },
    
    update (event, ontology, plan)  {
        console.log(`Agent receives event "${event.name}"...`)

        if (event.name === 'agent-start') {
            ontology.game_state = main;
            plan.direct('robot', 'say', 'Let\'s play bingo');
            plan.direct('web', 'show', 'playlists');
        }
    },
}

export default app;