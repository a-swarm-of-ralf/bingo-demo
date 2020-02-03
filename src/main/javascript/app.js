import uiPepperMock from './ui-components/ui-pepper-mock.js'
import routes from './routes.js'
import store from './store.js'
import web from './api/web/web.js'


Vue.component('ui-pepper-mock', uiPepperMock)

const router = new VueRouter({ routes })

web.setRouter(router);

router.beforeEach((to, from, next) => {
    console.log(`Route changing from route ${from.path} to route ${to.path}`);
    if (to.path === '/') {
        next('/spotify-login')
    } else {
        next()
    }
})

export default new Vue({
    el: '#app',
    router,
    store,
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

