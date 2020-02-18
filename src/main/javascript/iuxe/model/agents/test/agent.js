import uiMain from './ui-main.js'


export default {

    name: "test",
    
    ui: { 
        main: uiMain
    },

    initialize({ robot, web, ontology }) {
        ontology.set('message', 'Agent "test" loaded!');
        web.showPage('main', { });
        robot.say("Hello, starting agent now");
    },

    update({ web, ontology }, { name, data, args }) {
        
        /// hhf
        if (name === 'web/page_shown') {
            console.log(`Now showing page '${args[0]}'...`)
        }

        if (name === 'clicked/left') {
            ontology.set('message', 'Hey you clicked left ...');
            // web.updatePage({ message: 'Hey you clicked left ...'})
        }

        if (name === 'clicked/right') {
            ontology.set('message', 'Hey you clicked right ...');
            // web.updatePage({ message: 'Hey you clicked right ...'})
        }
    }

}