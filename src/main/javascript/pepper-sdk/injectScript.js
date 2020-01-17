export default function injectScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = src;
        script.addEventListener('load', resolve);
        script.addEventListener('error', (args) => reject({ message:'Error loading script.', args }));
        script.addEventListener('abort', (args) => reject({ message:'Script loading aborted.', args }));
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