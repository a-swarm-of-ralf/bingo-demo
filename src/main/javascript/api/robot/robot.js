import mock from './mock.js'
import pepper from './pepper.js'

const implementations = { mock, pepper }

const proxy = {} ;
let emitter = new EventEmitter2();

proxy.loadImpl = (name) => {
    console.log(`[ROBOT] loading robot impl "${name}"...`)
    const impl = implementations[name];
    impl.beforeLoading();
    _(impl).keys().forEach(key => {
        console.log(`[Robot] mapping ${name}.${key}() to robot.${key}.`)
        proxy[key] = function(...args) {
            console.log(`[Robot] calling ${key}().`)
            const result = impl[key](...args);
            console.log(`[Robot] called ${key}() with result ${JSON.stringify(result)}.`);
            emitter.emit(`robot.${key}`, result, args);
            return result;
        }
    });
}

proxy.loadImpl('mock');

proxy.setEmitter = function (eventEmitter) {
    emitter = eventEmitter;
};

export default proxy;