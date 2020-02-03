import agents from './agents.js'
import Plan from './agent-plan.js'


export default {

    load (name, ontology) {
        console.log(`[AgentRunner] Loading agent ${name}...`)
        return agents.agent(name)
            .then(agent => _.set(agent, '_plans', new Plan()))
            .then(agent => this._agent = agent)
            .then(agent => this.call(agent, 'loaded', ontology, agent._plans))
            .then(agent => ({ ontology }));
    },

    agent () {
        if (this._agent) {
            return Promise.resolve(this._agent);
        } else {
            return Promise.reject({ code: 'no-agent-loaded', message: `No agent was loaded.`});
        }
    },

    run (event, ontology) {
        return this.agent()
            .then(agent => this.call(agent, 'update', event, ontology, agent._plans))
            .then(agent => this.execute(agent, event, ontology, agent._plans))
    },

    execute (agent, event, ontology, plans) {
        console.log(`[AgentRunner] Executing agent ${agent.name} plan.`);
        _.forEach(plans.planless, ({ api, method, args }) => {
            
        });
        return agent
    },

    call(agent, method, ...args) {
        try {
            console.log(`[AgentRunner] Calling ${agent.name}.${method}()...`);
            agent[method](...args);
            console.log(`[AgentRunner] ${agent.name}.${method}() called.`);
            return Promise.resolve(agent);
        } catch (e) {
            console.log(`[AgentRunner] ${agent.name}.${method}() resulted in error`, e);
            return Promise.reject({ code: 'agent-execution-error', message: `An ${method} call to agent ${agent.name} resulted in error`, source: e});
        }
    } 
    
}