import inject from '../../api/robot/pepper/injectScript.js'
import connect from '../../api/robot/pepper/connect.js'


const emitter = new EventEmitter2();


export default {

    /**
     * I listen for events, without activating the event cycle.
     * @param {*} event 
     * @param {*} callback 
     */
    on(event, callback) {

    },

    connect ( ipAddress ) {
        return inject(ipAddress, emitter).then(() => connect(ipAddress, emitter))
    },

    /**
     * See Connection.call
     */
    call(...args) {
        if (this.connection) {
            return this.connection.call(...args)
        }
        return Promise.reject({code: 'qi-call/no-connection', message: 'Connection object not found.'})
    },

    /**
     * I subscribe to the specified event. On a successful subscription I
     * emit the specified event.
     *
     * See Connection.subscribe
     */
    subscribe(event, callback) {
        if (this.connection) {
            emitter.on(event, callback);
            return this.connection.subscribe(event, emitter)
        }
        return Promise.reject({code: 'qi-call/no-connection', message: 'Connection object not found.'})
    },

    /**
     * I return true if I am subscribed to the specified event. This means
     * I will emit the events as an EventEmitter
     *
     * See Connection.isSubscribed
     */
    isSubscribed(event) {
        if (this.connection) {
            return this.connection.isSubscribed(event)
        }
        return Promise.reject({code: 'qi-call/no-connection', message: 'Connection object not found.'})
    },

    /**
     * I unsubscribe to the specified event. After unsubscribing I will no longer
     * emit the specified events.
     *
     * See Connection.unsubscribe
     */
    unsubscribe(event) {
        if (this.connection) { 
            return this.connection.unsubscribe(event)
        }
        return Promise.reject({code: 'qi-call/no-connection', message: 'Connection object not found.'})
    },

    /**
     * Runs a script created by the curious brain stage
     * @param script
     */
    run(script) {
        console.log(`Running script '${script.title}'...`)
        if (script.type === 'simple-say') {
            console.log(`Running '${script.title}' as 'simple-say' script...`)
            return this.runSimpleSay(script)
        } else {
            console.warn('Unknown script type')
        }
    },

    /**
     * A simple-say script is the most basic script. It translates directly
     * to an animated say command based on the text or language
     * @param script
     */
    runSimpleSay(script) {
        if (script[this.state.language]) {
            return this.say(script[this.state.language])
        } else if (script.text) {
            return this.say(script.text)
        }
    },

    /*
     * Behavior Methods
     */

    getBehaviors() {
        return this.call('ALBehaviorManager', 'getInstalledBehaviors', [])
    },

    getRunningBehaviors() {
        return this.call('ALBehaviorManager', 'getRunningBehaviors', [])
    },

    getBehaviorTags(behavior) {
        return this.call('ALBehaviorManager', 'getBehaviorTags', [behavior])
    },

    getTags() {
        return this.call('ALBehaviorManager', 'getTagList', [])
    },

    runBehavior(behavior) {
        return this.call('ALBehaviorManager', 'runBehavior', [behavior])
    },
    
    startBehavior(behavior) {
        return this.call('ALBehaviorManager', 'startBehavior', [behavior])
    },

    stopBehavior(behavior) {
        return this.call('ALBehaviorManager', 'stopBehavior', [behavior])
    },

    /*
     * Tablet Methods
     */

    showWebview(url = null) {
        if (url) {
            return this.call('ALTabletService', 'showWebview', [url])
        } else {
            return this.call('ALTabletService', 'showWebview')
        }
    },

    loadUrl(url) {
        return this.call('ALTabletService', 'loadUrl', [url])
    },

    openTabletSettings() {
        return this.call('ALTabletService', '_openSettings', [])
    },

    robotName() {
        return this.call('ALSystem', 'robotName', [])
    },

    robotIcon() {
        return this.call('ALSystem', 'robotIcon', [])
    },

    systemVersion() {
        return this.call('ALSystem', 'systemVersion', [])
    },

    freeMemory() {
        return this.call('ALSystem', 'freeMemory', [])
    },

    totalMemory() {
        return this.call('ALSystem', 'totalMemory', [])
    },

    say(text) {
        return this.call('ALAnimatedSpeech', 'say', [text])
    },

    navigateTo(x, y) {
        return this.call('ALNavigation', 'navigateTo', [x, y])
    },

    move(x, y, theta) {
        return this.call('ALMotion', 'moveToward', [x, y, theta])
    },

    isAware() {
        return this.call('ALBasicAwareness', 'isRunning', [])
    },

    pauseAwareness() {
        return this.call('ALBasicAwareness', 'pauseAwareness', [])
    },

    resumeAwareness() {
        return this.call('ALBasicAwareness', 'resumeAwareness', [])
    },

    getLanguage() {
        return this.call('ALTextToSpeech', 'getLanguage', [])
    },

    getLanguages() {
        return this.call('ALTextToSpeech', 'getAvailableLanguages', [])
    },

    setLanguage(lang) {
        return this.call('ALTextToSpeech', 'setLanguage', [lang])
    },

    setBrightness(brightness) {
        return this.call('ALTabletService', 'setBrightness', [brightness])
    },

    getBrightness() {
        return this.call('ALTabletService', 'getBrightness', [])
    },

    getVolume() {
        return this.call('ALAudioDevice', 'getOutputVolume', [])
    },

    setVolume(v) {
        return this.call('ALAudioDevice', 'setOutputVolume', [v])
    },

}