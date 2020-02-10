export default function (act, { interval=20 }) {

    let paused = true;
    let timeoutId = 0;

    const trigger = (interval, st) => {
        if (!paused) {
            const ft = _.clamp(interval - (st - performance.now()), 0, 500)
            timeoutId = setTimeout(step, ft, interval, st);
        }
    }

    const step = function (interval, lt) {
        const t = performance.now();
        const dt = t - lt;
        _.attempt(act, dt, t);
        trigger(interval, t)
    }

    const resume = function (interval) {
        paused = false;
        trigger(interval, performance.now())
    }

    const pause = function () {
        clearTimeout(timeoutId)
        paused = true;
    }


    return {
        resume () {
            resume(interval)
        },
        pause () {
            pause()
        }
    }
}