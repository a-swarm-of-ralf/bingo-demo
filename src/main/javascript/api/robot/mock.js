import pepper from './pepper.js'

const emitter = new EventEmitter2();


const method = function (key) {
    return (...args) => {
        console.log(`[Mock Pepper] ${key}(${_.join(args, ', ')}) called.`);
        emitter.emit('mock_called', { key, args });
        return Promise.resolve({});
    };
}


const mock = {

    on(...args) {
        emitter.on(...args);
    },

    beforeLoading () {
        console.log(`[Mock Pepper] setting up mock robot...`)
        _(pepper).keys().forEach(key => {
            if (!mock[key]) {
                console.log(`[Mock Pepper] adding method '${key}'`)
                mock[key] = method(key)
            }
        });
    },

    connect () {   
        emitter.emit('injected', true);
        emitter.emit('connected', true);
        console.log(`[Mock Pepper] resolving mock`);
        return Promise.resolve(mock);
    },

    call(mod, method, args, result = {}) {
        console.log(`[Mock Pepper] ${mod}.${method}(${_.join(args, ', ')}) called.`);
        return Promise.resolve(result);
    },

    subscribe(event, callback, result = {}) {
        emitter.on(event, callback);
        return Promise.resolve(result);    
    },

    isSubscribed(event) {
        return Promise.reject({code: 'qi-call/not-implemented', message: 'Not implemented in mock version.'})
    },

    unsubscribe(event) {
        return Promise.reject({code: 'qi-call/not-implemented', message: 'Not implemented in mock version.'})
    },
    
};


export default mock;