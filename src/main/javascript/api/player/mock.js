export default {

    authorized () {
        return this.me();
    },

    me () {
        return Promise.resolve({ display_name: 'Fake Music', product: 'mock', id:'fakemusicid', uri:'shheh:sfh:DFssdf' })
    }

}