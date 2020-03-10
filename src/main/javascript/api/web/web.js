
export default {

    setRouter (router) {
        this.$router = router;
    },

    setAgent (name) {
        this.name = name;
    },

    setEmitter (emitter) {
        this.emitter = emitter;
    },

    showPage (key, pairs) {
        this.$router.push(`/agent-${this.name}-${key}`); 
        this.emitter.emit('web.update', pairs);
        return Promise.resolve(`/agent-${this.name}-${key}`);
    },

    updatePage (pairs) {
        console.log(`[web] updatePage ("${pairs.message}")`)
        this.emitter.emit('web.update', pairs);   
        console.log(`[web] page updated ("${pairs.message}")`)
        return Promise.resolve(`/agent-${this.name}`);
    },

    timeout (time_in_ms) {
        console.log(`[web] timeout ("${time_in_ms}")`)
        return new Promise((resolve, reject) => {
            setTimeout(resolve, time_in_ms)
        });
    },

    log (...args) {
        console.log(...args);
    },

    ajax (...args) {
        return axios(...args);
    }

}