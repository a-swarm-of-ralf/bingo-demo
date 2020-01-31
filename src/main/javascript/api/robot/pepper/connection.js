

export default class Connection {
  
    constructor () {
      this.session = null;
      this.connected = false;
      this.feedback = false;
      this.events = {};
    }

    _connected (session) {
      this.session = session;
      this.connected = true;
      this.feedback = true;
    }

    _disconnected () {
      this.session = null;
      this.connected = false;
      this.feedback = true;
    }

    _timeout () {
      this.session = null;
      this.connected = false;
      this.feedback = true;
    }

    /**
     * I make a remote call to the connected qi service. I return a promise 
     * with the result. This depends on the function called.
     * 
     * First argument is the module, for example "ALMemory", "ALAnimatedSpeech", etc...
     * Second argument is the function to call "say", "setLanguage", etc...
     * Last argument is a list of arguments provided to the function.
     * 
     * Example:
     * 
     *  call("ALAnimatedSpeech", "say", ["Hello Human!"])
     * 
     * See http://doc.aldebaran.com/2-5/naoqi/index.html for a list of modules and functions
     * avaialible.
     *
     */
    call (mod, method, args) {
      if (this.connected && !!this.session) {
        if (_.isNil(args) || (_.isArrayLike(args) && args.length < 1)) {
          return this.session.service(mod).then((service) => service[method]())
        } else if (_.isArrayLike(args)) {
          return this.session.service(mod).then((service) => service[method](...args))
        } else {
          return this.session.service(mod).then((service) => service[method](args))
        }
      } else {
        console.log(`call(${mod}, ${method}, ${args}) failed because connected was ${this.connected} and session was ${!!this.session}`)
        return Promise.reject({code: 'qi-call/no-connection', message: 'Qi not loaded or not connected to pepper.'})
      }
    }

  /**
   * I subscribe to the specified event. On a successful subscription I
   * emit the specified event.
   *
   * Act on events by using the on(<event>, <callback>) method.
   *
   * @param event
   * @returns {Promise<Subscription>}
   */
  subscribe (event, emitter) {
    if (!this.events[event]) {
      return this.call('ALMemory', 'subscriber', [event])
        .then((subscriber) => {
          this.events[event] = subscriber
          subscriber.signal.connect((...args) => emitter.emit(event, ...args))
          return subscriber
        })
    } else {
      return Promise.resolve(this.events[event])
    }
  }

  /**
   * I return true if I am subscribed to the specified event. This means
   * I will emit the events as an EventEmitter
   *
   * @param event
   * @returns {boolean}
   */
  isSubscribed (event) {
    return !!this.events[event]
  }

  /**
   * I unsubscribe to the specified event. After unsubscribing I will no longer
   * emit the specified events.
   *
   * @param event
   * @returns {Promise<Event>}
   */
  unsubscribe (event) {
    if (this.events[event]) {
      this.events[event] = undefined
    }
    return Promise.resolve(event)
  }

  }