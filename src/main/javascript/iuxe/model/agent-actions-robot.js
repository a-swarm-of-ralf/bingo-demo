export default function (state) {

    return {

        call (mod, method, data, event, ...args) {
            return state.addAction(event, 'robot', 'call', data, mod, method, ...args); 
        },

        /*
         * Event subscriptions
         */
        subscribe (event, data = '') { 
            return state.addAction('robot/subscribed', 'robot', 'subscribe', data, event, 
            (...args) => { state.addEvent(`robot/${event}`, data, ...args) }); 
        },

        isSubscribed(event, data = '') { return state.addAction('robot/subscribed', 'robot', 'isSubscribed', data, event); },
        unsubscribe(event, data = '') { return state.addAction('robot/unsubscribed', 'robot', 'unsubscribe', data, event); },
        
        /*
         * Behavior methods
         */
        getBehaviors(data = '') { return state.addAction('robot/behaviors', 'robot', 'getBehaviors', data); },
        getRunningBehaviors(data = '') { return state.addAction('robot/behaviors/running', 'robot', 'getRunningBehaviors', data); },
        getBehaviorTags(behavior, data = '') { return state.addAction('robot/behavior/tags', 'robot', 'getBehaviorTags', data), behavior; },
        getTags(data = '') { return state.addAction('robot/tags', 'robot', 'getTags', data); },
        runBehavior(behavior, data = '') { return state.addAction('robot/behavior/ran', 'robot', 'runBehavior', data, behavior); },
        startBehavior(behavior, data = '') { return state.addAction('robot/behavior/started', 'robot', 'startBehavior', data, behavior); },
        stopBehavior(behavior, data = '') { return state.addAction('robot/behavior/stopped', 'robot', 'stopBehavior', data, behavior); },
           
        /*
         * Tablet Methods
         */
        showWebview(url = null, data = '') { return state.addAction('robot/webview/shown', 'robot', 'showWebview', data, url); },
        loadUrl(url, data = '') { return state.addAction('robot/webview/loaded', 'robot', 'loadUrl', data, url); },
        openTabletSettings(data = '') { return state.addAction('robot/settings/opened', 'robot', 'openTabletSettings', data, url); },
        getBrightness (data = '') { return state.addAction('robot/brighness', 'robot', 'getBrightness', data); },
        setBrightness (brightness, data = '') { return state.addAction('robot/brighness', 'robot', 'setBrightness', data, brightness); },
        
        /* 
         * Basic robot information Methods
         */
        robotName(data = '') { return state.addAction('robot/name', 'robot', 'robotName', data ); },
        robotIcon(data = '') { return state.addAction('robot/icon', 'robot', 'robotIcon', data ); },
        systemVersion(data = '') { return state.addAction('robot/system/version', 'robot', 'systemVersion', data ); },
        freeMemory(data = '') { return state.addAction('robot/memory/free', 'robot', 'freeMemory', data ); },
        totalMemory(data = '') { return state.addAction('robot/memory/total', 'robot', 'totalMemory', data ); }, 
        
        /*
         * Speech Methods
         */
        say (text, data = '') { return state.addAction('robot/said', 'robot', 'say', data, text); },
        getLanguage (data = '') { return state.addAction('robot/language', 'robot', 'getLanguage', data); },
        getLanguages (data = '') { return state.addAction('robot/languages', 'robot', 'getLanguages', data); },
        setLanguage (lang, data = '') { return state.addAction('robot/language', 'robot', 'setLanguage', data, lang); },
        getVolume (data = '') { return state.addAction('robot/volume', 'robot', 'getVolume', data); },
        setVolume (v, data = '') { return state.addAction('robot/volume', 'robot', 'setVolume', data, v); },
    
        /*
         * Movement Methods 
         */
        navigateTo (x, y, data = '') { return state.addAction('robot/navigated', 'robot', 'navigateTo', data, x, y); },
        move (x, y, theta, data = '') { return state.addAction('robot/moving', 'robot', 'move', data, x, y, theta); },
    
        /**
         * Basic Awareness methods
         */
        isAware (data = '') { return state.addAction('robot/awareness', 'robot', 'isAware', data); },
        pauseAwareness (data = '') { return state.addAction('robot/awareness/paused', 'robot', 'pauseAwareness', data); },
        resumeAwareness (data = '') { return state.addAction('robot/awareness/resumed', 'robot', 'resumeAwareness', data); },
    
    }

    
}