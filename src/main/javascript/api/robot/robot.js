import mock from './mock.js'
import pepper from './pepper.js'

const implementations = { mock, pepper }

const proxy = {} ;

proxy.loadImpl = (name) => {
    const impl = implementations[name];
    _(impl).keys().forEach(key => proxy[key] = (...args) => impl[key](...args));
}

export default proxy;