export default function (emitter) {

    const ontology = {};
    const eventQueue = [];
    const actionQueue = [];

    return {

        get(path, defaultValue) {
            return _.get(ontology, path, defaultValue);
        },

        set(path, value) {
            const result = _.set(ontology, path, value);
            emitter.emit('ontology.changed', ontology);
            return result
        },

        unset(path) {
            const result = _.unset(tontology, path);
            emitter.emit('ontology.changed', ontology);
            return result;
        },

        has(path) {
            return _.has(ontology, path)
        },

        addEvent(name, data, ...args) {
            console.log(`[Agent-State] addEvent("${name}", "${data}", ${_.chain(args).map(i => `"${i}"`).join(args, ', ').value()})`)
            const event = { id: _.uniqueId(), name, data, args };
            eventQueue.push(event);
            emitter.emit('event_added', event, eventQueue);
            emitter.emit('events_changed', eventQueue);
        },

        removeEvent(id) {
            const event = this.getEvent(id);

            if (event) {
                _.remove(eventQueue, i => i.id === id);
                emitter.emit('event_removed', event, eventQueue);
                emitter.emit('events_changed', eventQueue);
            }
        },

        dequeueEvent() {
            const item = eventQueue.shift();
            if (item) {
                emitter.emit('event_removed', item, eventQueue);
                emitter.emit('events_changed', eventQueue);
            }
            return item;
        },

        addAction(event, api, method, data, ...args) {
            const action = { id: _.uniqueId(), event, api, method, data, args }
            actionQueue.push(action);
            emitter.emit('action_added', action, actionQueue);
            emitter.emit('actions_changed', actionQueue);
        },

        removeAction(id) {
            const action = this.getAction(id);

            if (action) {
                _.remove(actionQueue, i => i.id === id);
                emitter.emit('action_removed', action, actionQueue);
                emitter.emit('actions_changed', actionQueue);
            }
        },

        dequeueAction() {
            const item = actionQueue.shift();
            if (item) {
                emitter.emit('action_removed', item, actionQueue);
                emitter.emit('action_changed', actionQueue);
            }
            return item;
        },

        getAction(id) {
            return _.find(actionQueue, a => a.id === id);
        },

        firstAction() {
            return _.head(actionQueue);
        },

        getEvent(id) {
            return _.find(eventQueue, e => e.id === id);
        },

        

        completeAction(id, ...results) {
            const action = this.getAction(id);

            if (action) {
                this.addEvent(action.event, action.data, ...results)
                this.removeAction(id);
                emitter.emit('action_completed', action, actionQueue);
            }
        },

        completeEvent(id) {
            const event = this.getEvent(id);

            if (event) {
                this.removeEvent(id);
                emitter.emit('event_completed', event, eventQueue);
            }
        }
    }
}