export default {
    
    ensure (f) {
        return (...args) => _.attempt(f, ...args)
    },

    processor (producer, iterator) {
        const prod = this.ensure(producer);
        const iter = this.ensure(iterator);

        return (...args) => {
            let item = prod();
            console.log(`[PROCESSOR] produce ${JSON.stringify(item)}`);
            while (item && !_.isError(item)) {
                console.log(`[PROCESSOR] iterate ${JSON.stringify(item)}`);
                iter(item, ...args);
                item = prod();
            }
        }
    },

    promisefy (func) {
        const f = this.ensure(func);
        return (...args) => {
            const result = f(...args);
            if (_.isError(result)) { return Promise.reject(result); }
            if (_.hasIn(result, 'then')) { return result; }
            return Promise.resolve(result);
        }
    }
}
