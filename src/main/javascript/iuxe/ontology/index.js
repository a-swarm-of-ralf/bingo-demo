export default {
    get(id) { 
        console.log(`[Ontology] getting record '${id}'...`)
        return Promise.resolve({id})
    },
    set(id, data) { 
        console.log(`[Ontology] storing record id '${id}'...`)
        console.log(`[Ontology] storing record '${id}' with `, data)
        return Promise.resolve(data)
    },
    reset () {
        console.log(`[Ontology] Resetting IndexedDb 'iuxe_database'...`)
        return Promise.resolve({})
    }
}