import F from './agent-functions.js'


const executor = function (apis, callback, { api, method, args, event, data }) {
    console.log(`Executor calling ${api}.${method}(...)`);
    const exec = F.promisefy(_.bindKey(apis[api], method));
    exec(...args)
        .then((...results) => callback(event, data, ...results))
        .catch(err => callback('error/' + event, data, err, api, method, args))
}


/**
 *  Creates function:
 * 
 *  (...args) => executor(apis, state.addEvent, action, ...args)
 * 
 */
export default function(state, apis) {
    const prod = _.bindKey(state, 'dequeueAction')
    const event = _.bindKey(state, 'addEvent')
    const iter = _.partial(executor, apis, event)
    return F.processor(prod, iter)
}