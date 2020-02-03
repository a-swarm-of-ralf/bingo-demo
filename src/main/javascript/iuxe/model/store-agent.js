import runner from './agent-runner.js';
import web from '../../api/web/web.js'


export default {

    state: {
        name: '',
        running: false,
        events: [],
        eventCounter: 0,
        ontology: {},
    },

    getters: {

        AgentName(state) {
            return state.name
        },

        AgentHasEvents(state) {
            return state.events.length > 0
        },

        AgentFirstEvent(state) {
            return _.head(state.events)
        },

        AgentOntology(state) {
            return state.ontology
        },

        AgentRunning(state) {
            return state.running
        },

    },

    mutations: {

        updateAgentName(state, name) {
            state.name = name;
        },

        updateAgentRunning(state) {
            state.running = true;
        },

        updateAgentAddEvent(state, event) {
            state.eventCounter = state.eventCounter + 1;
            event.id = state.eventCounter;
            state.events.push(event);
        },

        updateAgentRemoveEvent(state, eventId) {
            state.events = _.reject(state.events, event => event.id === eventId);
        },

        updateAgentOntology(state, ontology) {
            state.ontology = ontology;
        },

    },

    actions: {

        AgentLoad({ commit, dispatch, getters }, agentName) {
            console.log(`[StoreAgent] loading agent "${agentName}"`)
            commit('updateAgentName', agentName)
            return runner.load(agentName, getters.AgentOntology).then(({ ontology }) => {
                console.log(`[StoreAgent] Agent "${agentName}" loaded.`)
                commit('updateAgentOntology', ontology)
                commit('updateAgentRunning')
                dispatch('AgentEmitEvent', { name: 'agent/start', args: [] })
            })
        },

        AgentHandleEvent({ commit, getters, dispatch }, events) {
            const event = getters.AgentFirstEvent;
            const ontology = getters.AgentOntology
            console.log(`[StoreAgent] Agent "${getters.AgentName}" running ${getters.AgentRunning}...`)
            if (getters.AgentRunning && event) {
                console.log(`[StoreAgent] Agent "${getters.AgentName}" handling event ${event.name}[${event.id}]...`)
                runner.run(event, ontology)
                    .then(actions => dispatch('AgentHandleActions', ontology))
                    .then(() => commit('updateAgentOntology', ontology))
                    .then(() => commit('updateAgentRemoveEvent', event.id))
                    .catch(err => dispatch('AgentEmitEvent', { name: 'agent-error', args: [err] }))
            }
        },

        AgentHandleActions({ dispatch }, actions) {

            if (actions.length < 1) {
                return Promise.resolve([]);
            }

            const action = _.head(actions)
            const rest = _.tail(actions)

            return dispatch('AgentHandleAction', action).then(r => dispatch('AgentHandleActions', rest))
        },

        AgentHandleAction({ dispatch }, { api, method, args }) {

            const apis = {
                'robot': 'RobotCall',
                'player': 'PlayerCall',
                'web': 'WebCall'
            }

            if (!apis[api]) {
                return Promise.reject({ code: 'api-unknown', message: `Api ${api} is unknown. Api should be one of robot, player or web.` })
            }

            return dispatch(apis[api], method, args);
        },


        WebCall({ dispatch }, method, args) {
            console.log(`[StoreAgent] Calling web.${method}()...`)

            if (!web[method]) {
                console.log(`[StoreAgent] Error: Web has no method "${method}".`)
                return Promise.reject({ code: 'web-unknown-method', message: `Api "web" is has no method ${method}.` })
            }

            console.log(`[StoreAgent] Calling ${method}()...`)
            return web[method](...args).then(result => {
                console.log(`[StoreAgent] ${method}() called.`)
                return dispatch('AgentEmitEvent', { name: `web.${method}`, args: [result] });
            });
        },


        AgentEmitEvent({ commit, getters }, event) {
            console.log(`[StoreAgent] Emitting event "${getters.AgentName}"...`)
            commit('updateAgentAddEvent', event)
        }

    },

}
