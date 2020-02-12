import Runner from './agent-runner.js'
import robot from '../../api/robot/robot.js'
import player from '../../api/player/player.js'
import web from '../../api/web/web.js'


const emitter = new EventEmitter2();
const runner = Runner(emitter, { robot, player, web });
const agents = {};


const runAgent = function (agent) {
    runner.run(agent);
}


export default {

    register (name, agent) {
        console.log(`[Agents] Registering "${name}" as ${agent}...`)
        agents[name] = agent;
        return agent;
    },

    find (name) {
        return agents[name];
    },

    agent (name) {
        return new Promise((resolve, reject) => {
            console.log(`[Agents] Getting agent "${name}"...`)
            if (agents[name]) { return resolve(agents[name]) };
            return reject({ code: 'agent-not-found', message: `Agent ${name} not found.`});
        })
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
    },

    run (name) {
        return this.agent(name).then(runAgent)
    },

    emit (name, data, ...args) {
        data = data || '';
        args = args || [];
        console.log(`[Agents] emit("${name}", "${data}", ${_.chain(args).map(i => `"${i}"`).join(args, ', ').value()})`)
        runner.emit(name, data, ...args)
    },

    on (event, callback) {
        console.log(`[Agents] on ('${event}', callback)`)
        emitter.on(event, callback);
    }
}