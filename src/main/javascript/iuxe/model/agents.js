const agents = {};

export default {

    register (name, agent) {
        agents[name] = agent;
        return agent;
    },

    names () {
        return _.keys(agents);
    },

    routes () {
        return _.flatMap(agents, (agent, name) => 
            _.map(agent.ui, (ui, key) => ({ path: `/agent-${name}-${key}`, name: `agent-${name}-${key}`, component: ui })) )

    }

}