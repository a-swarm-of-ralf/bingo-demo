import mock from './mock.js'
import spotify from './spotify.js'

const implementations = { mock, spotify }

const proxy = {} ;

proxy.loadImpl = (name) => {
    const impl = implementations[name];
    _(impl).keys().forEach(key => proxy[key] = (...args) => impl[key](...args));
}

proxy.loadImpl('mock');

export default proxy;