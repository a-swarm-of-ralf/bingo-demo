export default function injectScript(src, emitter) {

    const emit = function (...args) {
        if (emitter) {
            return emitter.emit(...args);
        }
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = src;

        script.addEventListener('load', (args) => {
            resolve();
            emit('injected', true);
        });

        script.addEventListener('error', (args) => {
            reject({ code: 'inject-error', message: 'Error loading script.', args })
            emit('injected', false);
        });

        script.addEventListener('abort', (args) => {
            reject({ code: 'inject-abort', message: 'Script loading aborted.', args })
            emit('injected', false);
        });
        
        document.head.appendChild(script);
    });
}

/*
injectScript('http://localhost:3000/script.js')
    .then(() => {
        console.log('Script loaded!');
    }).catch(error => {
        console.log('error');
        console.log(error);
    });

*/