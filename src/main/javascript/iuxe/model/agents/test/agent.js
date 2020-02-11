export default {

    name: "test",
    
    ui: { },

    initialize({ web }) {
        web.log('Agent test initialized!');
    },

    update({ web }, { name, data, args }) {
        console.log(`Agent update ${name} ( ${args} )`);
    }
}