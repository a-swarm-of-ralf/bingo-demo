import F from './agent-functions.js'


/**
 *  Creates function:
 * 
 *  (..args) => agent.update(actions, event, ..args)
 * 
 */
export default function(agent, state, actions) {

    const prod = _.bindKey(state, 'dequeueEvent')
    const iter = _.bindKey(agent, 'update', actions)
    return F.processor(prod, iter) // Creates function
}