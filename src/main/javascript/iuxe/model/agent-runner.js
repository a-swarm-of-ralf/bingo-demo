import Worker from './agent-worker.js'
import Actions from './agent-actions.js'
import State from './agent-state.js'

const emitter = new EventEmitter2();


const invoke = function (obj, path, ...args) { 
    try {
        const result = _.invoke(obj, path, ...args);  
        
        if (_.hasIn(result, 'then')) {
            return Promise.resolve(result);
        } else {
            return result;
        }

    } catch (err) {
        return Promise.reject(err);
    }
}

const handleAction = function (apis, { api, method, args, event, data }, state) {
    invoke(apis, `${api}.${method}`, ...args)
        .then((...results) => state.addEvent(event, data, ...results))
        .catch(err => state.addEvent('error/' + event, data, err, api, method, args))
}

const handleQueuedActions = function (apis, state) {
    let action = state.dequeueAction();
    while (action) {
        handleAction(apis, action, state)
    }
}

const handleEvent = function (agent, event, actions) { 
    invoke(agent, `update`, event, actions)
        .catch(err => console.warn("Agent update genrated error.", err))
}

const handleQueuedEvents = function (agent, state, actions, max = 5) {
    let event = state.dequeueEvent()
    let n = 0;
    while (event && n < max) {
        handleEvent(agent, event, actions)
        n = n + 1;
    }
}

const handleInitialize = function (agent, actions) { 
    invoke(agent, `initialize`, actions)
        .catch(err => console.warn("Agent update genrated error.", err))
}

export default function (emitter, apis) {

    const state = State(emitter);
    const actions = Actions(state);

    let agent = {
        initialize (actions) { },
        update (event, actions) { }
    }
    
    
    const update = function (dt, t) {
        handleQueuedEvents(agent, state, actions)
        handleQueuedActions(apis, state)
    };

    const worker = Worker(update, { interval: 30 });

    return {
        load (agentToLoad) {
            handleInitialize(agentToLoad, actions);
            agent = agentToLoad;
        },

        resume () {
            worker.resume();
        },

        pause () {
            worker.pause();
        }
    }
}