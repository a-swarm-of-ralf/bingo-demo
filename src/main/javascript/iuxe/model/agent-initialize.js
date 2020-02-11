import F from './agent-functions.js'

/**
 *  Creates function:
 * 
 *  (...args) => agent.initialize(actions, ...args)
 * 
 */
export default function(agent, actions) {
    const f = _.bindKey(agent, 'initialize', actions);
    return F.ensure(f);
}