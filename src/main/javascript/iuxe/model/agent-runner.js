import agents from './agents.js'
import Plan from './agent-plan.js'


const state = {
    ontology: {},
    eventQueue: [],
    actionQueue: [],

    event (name, data, ...args) { this.eventQueue({ id: _.uniqueId(), name, data, args }); },
    action (event, api, method, data, ...args) { this.actionQueue.push({ id: _.uniqueId(), event, api, method, data, args }); }
}

const ontologyApi = {

    get (path, defaultValue) { return _.get(state.ontology, path, [defaultValue]); },
    set (path, value) { return _.set(state.ontology, path, value) },
    unset (path) { return _.unset(state.ontology, path) },
    has (path) { return _.has(state.ontology, path) },

    isTrue (path) { return !!_.get(his._data, path, [defaultValue]); },
    isFalse (path) { return !_.get(his._data, path, [defaultValue]); },
    isEqual (path1, path2) { return this.get(path1, path1) === this.get(path2, path2) },
    isNotEqual (path1, path2) { return this.get(path1, path1) !== this.get(path2, path2) },
    isLessThan (path1, path2) { return this.get(path1, path1) < this.get(path2, path2) },
    isGreaterThan (path1, path2) { return this.get(path1, path1) > this.get(path2, path2) },
    isEqualOrlessThan (path1, path2) { return this.get(path1, path1) <= this.get(path2, path2) },
    isEqualOrGreaterThan (path1, path2) { return this.get(path1, path1) >= this.get(path2, path2) },
};


const robotApi = {

    /*
     * Event subscriptions
     */
    subscribe (event, data = '') { 
        return state.action('robot/subscribed', 'robot', 'subscribe', data, event, 
        (...args) => { state.event(`robot/${event}`, data, ...args) }); 
    },
    isSubscribed(event, data = '') { return state.action('robot/subscribed', 'robot', 'isSubscribed', data, event); },
    unsubscribe(event, data = '') { return state.action('robot/unsubscribed', 'robot', 'unsubscribe', data, event); },
    
    /*
     * Behavior methods
     */
    getBehaviors(data = '') { return state.action('robot/behaviors', 'robot', 'getBehaviors', data); },
    getRunningBehaviors(data = '') { return state.action('robot/behaviors/running', 'robot', 'getRunningBehaviors', data); },
    getBehaviorTags(behavior, data = '') { return state.action('robot/behavior/tags', 'robot', 'getBehaviorTags', data), behavior; },
    getTags(data = '') { return state.action('robot/tags', 'robot', 'getTags', data); },
    runBehavior(behavior, data = '') { return state.action('robot/behavior/ran', 'robot', 'runBehavior', data, behavior); },
    startBehavior(behavior, data = '') { return state.action('robot/behavior/started', 'robot', 'startBehavior', data, behavior); },
    stopBehavior(behavior, data = '') { return state.action('robot/behavior/stopped', 'robot', 'stopBehavior', data, behavior); },
       
    /*
     * Tablet Methods
     */
    showWebview(url = null, data = '') { return state.action('robot/webview/shown', 'robot', 'showWebview', data, url); },
    loadUrl(url, data = '') { return state.action('robot/webview/loaded', 'robot', 'loadUrl', data, url); },
    openTabletSettings(data = '') { return state.action('robot/settings/opened', 'robot', 'openTabletSettings', data, url); },
    getBrightness (data = '') { return state.action('robot/brighness', 'robot', 'getBrightness', data); },
    setBrightness (brightness, data = '') { return state.action('robot/brighness', 'robot', 'setBrightness', data, brightness); },
    
    /* 
     * Basic robot information Methods
     */
    robotName(data = '') { return state.action('robot/name', 'robot', 'robotName', data ); },
    robotIcon(data = '') { return state.action('robot/icon', 'robot', 'robotIcon', data ); },
    systemVersion(data = '') { return state.action('robot/system/version', 'robot', 'systemVersion', data ); },
    freeMemory(data = '') { return state.action('robot/memory/free', 'robot', 'freeMemory', data ); },
    totalMemory(data = '') { return state.action('robot/memory/total', 'robot', 'totalMemory', data ); }, 
    
    /*
     * Speech Methods
     */
    say (text, data = '') { return state.action('robot/said', 'robot', 'say', data, text); },
    getLanguage (data = '') { return state.action('robot/language', 'robot', 'getLanguage', data); },
    getLanguages (data = '') { return state.action('robot/languages', 'robot', 'getLanguages', data); },
    setLanguage (lang, data = '') { return state.action('robot/language', 'robot', 'setLanguage', data, lang); },
    getVolume (data = '') { return state.action('robot/volume', 'robot', 'getVolume', data); },
    setVolume (v, data = '') { return state.action('robot/volume', 'robot', 'setVolume', data, v); },

    /*
     * Movement Methods 
     */
    navigateTo (x, y, data = '') { return state.action('robot/navigated', 'robot', 'navigateTo', data, x, y); },
    move (x, y, theta, data = '') { return state.action('robot/moving', 'robot', 'move', data, x, y, theta); },

    /**
     * Basic Awareness methods
     */
    isAware (data = '') { return state.action('robot/awareness', 'robot', 'isAware', data); },
    pauseAwareness (data = '') { return state.action('robot/awareness/paused', 'robot', 'pauseAwareness', data); },
    resumeAwareness (data = '') { return state.action('robot/awareness/resumed', 'robot', 'resumeAwareness', data); },

}

const playerApi = {
    me(data = '') { return state.action('player/me', 'robot', 'me', data ); },
}



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