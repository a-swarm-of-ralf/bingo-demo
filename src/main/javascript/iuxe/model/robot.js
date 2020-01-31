import Pepper from '../pepper/index.js'
import Mock from '../pepper/mock.js'

const emitter = new EventEmitter2();

let client = Pepper

export default class Robot {

    inject (ipAddress) {
        client = Pepper
        return client.inject(ipAddress)
    }

    connect (ipAddress) {
        client = Pepper
        console.log(`[Robot] setting up connection to Pepper at ${ipAddress}`)
        return client.connect(ipAddress).then(() => {
            console.log(`[Robot] Robot interface now conencts to Pepper at ${ipAddress}`)
            return this;
        });
    }

    mock () {
        client = Mock
    }

    say (text) {
        emitter.emit('say', text)
        return client.say(text)
    }

    play (animation) {
        return client.play(animation)
    }

    show (url) {
        return client.show(url)    
    }

    reactToTouch () {
        client.onRightBumperPressed((args) => {
            if (args === 1) {
                this.say("Niet schoppen, als u blieft.")
            }  
        })
    }

    on (event, callback) {
        return emitter.on(event, callback)
    }
}