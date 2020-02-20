# Example Pepper/Spotify Agent Interface

The Bingo Demo is an example application that construct an agent interfacing with a Pepper Robot and Spotify to play musical bingo.

It is build fully in Javascript and makes full use of ES6 features like modules. As a consequence it only runs on browsers supporting this.

## Installing

```
git clone https://github.com/a-swarm-of-ralf/bingo-demo.git
```

There is no install required, the application is purely client side javascript. It does require a webserver to run though. Any webserver will do. We recommend either Node's [http-server](https://www.npmjs.com/package/http-server) or Python's [SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html).

'serve.sh' starts http-server while 'serve2.sh' starts the SimpleHTTPServer if they are already installed. 

## Running

Point your browser to http://localhost:8080/. Follow the step on screen to setup the environment.


## Write Your Own Agent

Agents are located in ```/src/main/javascript/iuxe/model/agents/```. To create an agent create a folder with the name of your agent and add a file name ```agent.js``` in it.

For create an agent named my_agent we could:

```bash
mkdir /src/main/javascript/iuxe/model/agents/my_agent
touch /src/main/javascript/iuxe/model/agents/my_agent/agent.js
```

An agent itself is a simple javascript object with two fields and two functions. below shows a minimal code for the my_agent agent we created above.
```javascript
export default {
    name: "my_agent",
    ui: { },
    initialize(actions) { 

    },
    update(actions, event) {

    }
}
```

The final step is to register the agent. In the ```/src/main/javascript/routes.js``` file there is 
a section that looks something like below:
```javascript
/* Register Agents */
import agents from './iuxe/model/agents.js'
agents.register('bingo', bingo);
agents.register('test', test);
```

Here we add our my_agent agent:
```javascript
/* Register Agents */
import agents from './iuxe/model/agents.js'
import myAgent from './iuxe/model/agents/my_agent/agent.js'
agents.register('bingo', bingo);
agents.register('test', test);
agents.register('my_agent', myAgent);
```

Note the second and the last line.