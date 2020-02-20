import mock from './mock.js'
import spotify from './spotify.js'

const implementations = { mock, spotify }
let emitter = new EventEmitter2();

const proxy = {} ;

proxy.loadImpl = (name) => {
    const impl = implementations[name];
    _(impl).keys().forEach(key => {
        console.log(`[Player] mapping ${name}.${key}() to player.${key}().`)
        return proxy[key] = (...args) => {
            console.log(`[Player] calling ${key}().`);
            const result = impl[key](...args);
            console.log(`[Player] called ${key}() with result ${JSON.stringify(result)}.`);
            emitter.emit(`player.${key}`, result, args);
            return result;
        };
    });
}

proxy.loadImpl('mock');

proxy.setEmitter = function (eventEmitter) {
    emitter = eventEmitter;
};

export default proxy;