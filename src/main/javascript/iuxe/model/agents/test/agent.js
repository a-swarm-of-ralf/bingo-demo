import uiMain from './ui-main.js'


export default {

    name: "test",
    
    ui: { 
        main: uiMain
    },

    initialize({ web }) {
        web.showPage('main', { });
    },

    update({ web }, { name, data, args }) {
        
        if (name === 'web/page_shown') {
            console.log(`Now showing page '${args[0]}'...`)
        }

        if (name === 'clicked/left') {
            web.updatePage({ message: 'Hey you clicked left ...'})
        }

        if (name === 'clicked/right') {
            web.updatePage({ message: 'Hey you clicked right ...'})
        }
    }

}