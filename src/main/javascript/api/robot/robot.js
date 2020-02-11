import mock from './mock.js'
import pepper from './pepper.js'

const implementations = { mock, pepper }

const proxy = {} ;

proxy.loadImpl = (name) => {
    const impl = implementations[name];
    impl.beforeLoading();
    _(impl).keys().forEach(key => {
        console.log(`[Robot] mapping ${name}.${key}() to robot.${key}.`)
        proxy[key] = function(...args) {
            console.log(`[Robot] calling ${key}().`)
            const result = impl[key](...args);
            console.log(`[Robot] call ${key}() result result ${result}.`)
            return result;
        }
    });
}

proxy.loadImpl('mock');

export default proxy;