
export default {

    setRouter (router) {
        this.$router = router;
    },

    setAgent (name) {
        this.name = name;
    },

    show (key) {
        this.$router.push(`/agent-${this.name}-${key}`); 
        return Promise.resolve(`/agent-${this.name}-${key}`);
    },

    log (...args) {
        console.log(...args);
    }

}