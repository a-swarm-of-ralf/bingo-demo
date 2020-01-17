import injectScript from '../../pepper-sdk/injectScript.js'
import connectPepper from '../../pepper-sdk/connect.js'
import Pepper from '../../pepper-sdk/pepper.js'


let client = null;


export default {
    inject (ipAddress) {
        const src = `http://${ipAddress}:80/libs/qi/2/qi.js`;
        return injectScript(src).then(() => window.QiSession);
    },

    connect (ipAddress) {
        console.log(`[Pepper Facade] setting up connection to Pepper at ${ipAddress}`)
        return connectPepper(ipAddress).then((connection) => {
            console.log(`[Pepper Facade] connected to Pepper at ${ipAddress}`)
            client = new Pepper(connection)
            return this
        })
    },

    say (text) {
        return client.say(text)
    },

    play (animation) {
        return client.startBehavior(animation)
    },

    show (url) {
        return client.showWebview(url)    
    },

    getLanguage () {
        return client.getLanguage()
    },

    onRightBumperPressed(func) {
        return client.subscribe("RightBumperPressed").then(() => {
            client.on("RightBumperPressed", func)
        })
    }
}