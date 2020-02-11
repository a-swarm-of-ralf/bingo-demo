const fpsmeter = new FPSMeter({ decimals: 0, graph: true, theme: 'dark', left: '5px', top: '55px' });


const timestamp = function () {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}


let now;
let dt;
let last = timestamp();
const step = 1/60;


let reason = _.noop;
let execute = _.noop;


const frame = function () {
    fpsmeter.tickStart();
    now = timestamp();
    dt = Math.min(1, (now - last) / 1000);   // duration in seconds

    while(dt > step) {
        dt = dt - step;
        reason(step);
    }

    execute(dt);

    last = now;
    requestAnimationFrame(frame);
    fpsmeter.tick();
}

requestAnimationFrame(frame);


export default function (reasonFunction, executeFunction) {
    reason = reasonFunction;
    execute = executeFunction;
}
