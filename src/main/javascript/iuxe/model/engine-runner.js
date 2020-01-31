export default {

    initialize (player, robot) {
        this.player = player;
        this.robot = robot;
        this.events = {
            has () { return false; }
        };
        this.goals = {
            active () { return {} }
        };
        this.intents = {
            active () { return {} }
        };
        this.web = {};
        this.data = {};
        this.app = {
            updateBelieves (believes, events) {},
            selectGoals (believes, goals) {},
            selectIntent (believes, goal, intents) {},
            actOnIntent (intent, player, robot, web) {},   
        };
    },

    load (app, web) {
        this.app = app;
        this.web = web;
        this.data = {};

        this.believes = (...path) => _.get(this.data, path)
        this.believes.get = (...path) => _.get(this.data, path)
        this.believes.set = (...pathAndValue) => _.set(this.data, pathAndValue.slice(0,-1), pathAndValue.slice(-1)[0])
        this.believes.has = (...path) => _.has(this.data, path)
    },

    callAppFunction (funcName, ...args) {
        try {
            this.app[funcName](...args)
        } catch (err) {
            console.error(`An error during '${funcName}' step. Please check the ${this.app.name()}  app`, err);
        }
    },

    loadData () {

    },

    saveData () {

    },

    performActions (interface) {

    },

    start () {
        callAppFunction("initialize", this.believes)
    },
    
    step () {
        this.callAppFunction("updateBelieves", this.believes, this.events);

        this.saveData();

        this.callAppFunction("selectGoals", this.believes, this.goals);
        this.callAppFunction("selectIntent", this.believes, this.goals.active(), this.intents);
        this.callAppFunction("actOnIntent", this.intents.active(), this.player, this.robot, this.web);

        this.performActions(this.player);
        this.performActions(this.robot);
        this.performActions(this.web);
    }
}