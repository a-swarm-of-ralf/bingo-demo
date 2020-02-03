export default class Plan {

    constructor () {
        this.planless = [];
        this.plans = {
            default: {
                name: 'default',
                active: false,
                steps: []
            }
        };

        this._creating = 'default'
    }

    create (name) {
        this.plans[name] = {
            name,
            active: false,
            steps: []
        }
        this._creating = name;
        return this;
    }

    creating () {
        return this.plans[this._creating];
    }

    first (name, action, ...args) {
        thsi.clear(name);
        return this.then(name, action, ...args);
    }

    clear (name) {
        this.creating().steps = [];
        return this;    
    }

    then (name, action, ...args) {
        this.creating().steps.push({ plan: this._creating, name, action, args, completed: false, executing: false });
        return this;
    }

    suspend (name) {
        if (this.plans[name]) {
            this.plans[name].active = false;
        }
    }

    continue (name) {
        if (this.plans[name]) {
            this.plans[name].active = true;
        }    
    }

    start (name) {
        if (this.plans[name]) {
            this.plans[name].active = true;
            this.plans[name].steps = _.map(this.plans[name].steps, s => {
                s.completed = false;
                s.executing = false;
                return s;
            })
        }
    }

    nextActions () {
        return _(this.plans)
            .filter(p => p.active)
            .flatMap(p => this.nextActionsFromPlan(p));
    }

    nextActionsFromPlan (plan) {
        if (!plan.active) {
            return [];
        }

        const step = _.find(plan.steps, s => !s.completed);

        if (step && !step.executing) {
            step.executing = true;
            return [ step ]
        } else if (step && step.executing) {
            return []
        } else {
            return [ { plan: plan.name, name: 'plan-complete', action: 'plan-complete', args: [ plan.name ] } ]
        }
    }

    direct (api, method, ...args) {
        this.planless.push({api, method, args});
    }
}