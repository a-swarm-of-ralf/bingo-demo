import agents from './agents.js'


export default {

    state: {
        name: '',
        running: false,
        ontology: {},
        list: [ 'test' ],
    },

    getters: {

        AgentName(state) {
            return state.name
        },

        AgentOntology(state) {
            return state.ontology
        },

        AgentRunning(state) {
            return state.running
        },

        AgentList(state) {
            return state.list;
        },

    },

    mutations: {

        updateAgentName(state, name) {
            state.name = name;
        },

        updateAgentRunning(state) {
            state.running = true;
        },

        updateAgentOntology(state, ontology) {
            state.ontology = _.clone(ontology);
        },

        updateAgentList(state) {
            console.log('[StoreAgent] updating agent list', agents.names())
            state.list = agents.names();    
        }
    },

    actions: {

        agentRun({ commit }, name) {
            agents.on('ontology.changed', ontology => commit('updateAgentOntology', ontology));
            agents.on('agent.initializing', name => commit('updateAgentName', name));
            agents.on('agent.running', () => commit('updateAgentRunning'));
            agents.run(name);
        },

        agentEmit({}, obj) {
            console.log(`[StoreAgent] agentEmit("${obj}"): `, obj);
            console.log(`[StoreAgent] agentEmit("${typeof obj}"): `, typeof obj);
            if (_.isString(obj)) {
                console.log(`[StoreAgent] emit("${obj}")`);
                agents.emit(obj);  
            } else {
                const { name, data, args } = obj;
                console.log(`[StoreAgent] emit("${name}", "${data}", ${_.chain(args).map(i => `"${i}"`).join(args, ', ').value()})`)
                agents.emit(name, data, ...args)
            }
        }
    }
}
