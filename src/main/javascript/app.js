// import injectScript from './injectScript.js'
// import settings from './iuxe/ontology/index.js'

import routes from './routes.js'

const router = new VueRouter({ routes })


router.beforeEach((to, from, next) => {
    console.log(`Route changing`);
    if (from) {
        console.log(`from route   name: '${from.name}'`);
        console.log(`from route   path: '${from.path}'`);
        console.log(`from route   hash: '${from.hash}'`);
        console.log(`from route params: '${JSON.stringify(from.params)}'`);
        console.log(`from route  query: '${JSON.stringify(from.query)}'`);
    }

    if (to) {
        console.log(`to route   name: '${to.name}'`);
        console.log(`to route   path: '${to.path}'`);
        console.log(`to route   hash: '${to.hash}'`);
        console.log(`to route params: '${JSON.stringify(to.params)}'`);
        console.log(`to route  query: '${JSON.stringify(to.query)}'`);
    }

    next()
})

export default new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify({
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: '#22A607', // 3DFF14	52BF3B	22A607	6DFF4F	94FF7E
                    secondary: '#BF723B', // FF7514	BF723B	A64907	FF984F	FFB37E
                    accent: '#FF14AD', // FF14AD	BF3B91	A6076E	FF4FC1	FF7ED2
                    error: '#FF4FC1',
                },
            },
        },
    }),
})

//router.push('spotify-login')

