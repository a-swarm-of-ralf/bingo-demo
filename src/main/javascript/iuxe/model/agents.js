const agents = {};

export default {

    register (name, agent) {
        console.log(`[Agents] Registering ${name}...`)
        agents[name] = agent;
        return agent;
    },

    find (name) {
        return agents[name];
    },

    agent (name) {
        console.log(`[Agents] Getting agent "${name}"...`)
        const a = agents[name];
        if (a) {
            return Promise.resolve(a);
        } else {
            return Promise.reject({ code: 'agent-not-found', message: `Agent ${name} not found.`});
        }
    },

    names () {
        return _.keys(agents);
    },

    routes () {
        return _.flatMap(agents, (agent, name) => 
            _.map(agent.ui, (ui, key) => ({ path: `/agent-${name}-${key}`, name: `agent-${name}-${key}`, component: ui })) )
    },

    setRouter (router) {
        this.$router = router;
    },

    navigate (name, key) {
        return this.$router.push(`/agent-${name}-${key}`);  
    }

}