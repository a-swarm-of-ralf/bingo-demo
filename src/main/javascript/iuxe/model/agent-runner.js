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
            const init = Initialize(agent, actions);
            const update = Update(agent, state, actions);
            const execute = Execute(state, apis);
        
            init();
            loop(update, execute);
        }
    }
}