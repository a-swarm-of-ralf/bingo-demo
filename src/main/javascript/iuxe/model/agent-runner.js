import Actions from './agent-actions.js'
import State from './agent-state.js'
import Update from './agent-update.js'
import Execute from './agent-execute.js'
import Initialize from './agent-initialize.js'
import loop from './agent-loop.js'


export default function (emitter, apis) {

    const state = State(emitter);
    const actions = Actions(state);

    return {
        run (agent) {

            apis.web.setAgent(agent.name);
            apis.web.setEmitter(emitter);

            const init = Initialize(agent, actions);
            const update = Update(agent, state, actions);
            const execute = Execute(state, apis);
        
            emitter.emit('agent.initializing', agent.name);
            init();
            loop(update, execute);
            emitter.emit('agent.running', agent.name);
        },

        emit (name, data, ...args) {
            console.log(`[Agent-Runner] emit("${name}", "${data}", ${_.chain(args).map(i => `"${i}"`).join(args, ', ').value()})`)
            state.addEvent(name, data, ...args);
        }
    }
}