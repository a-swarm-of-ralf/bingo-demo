import Ontology from './agent-actions-ontology.js';
import Robot from './agent-actions-robot.js';
import Player from './agent-actions-player.js';
import Web from './agent-actions-web.js';


export default function (state) {
    
    return {
        ontology: Ontology(state),
        robot: Robot(state),
        player: Player(state),
        web: Web(state),
    }
}