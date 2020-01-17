
const db = new Dexie("iuxe_database");

db.version(1).stores({
    ontology: 'id'
});

export default {
    get(id) { 
        console.log(`[Ontology] getting record '${id}'...`)
        return db.ontology.get(id).then(function (record) {
            if(!record) {
                return db.ontology.put({ id: id }).then(function(){
                    return db.ontology.get(id)
                })
            }
            return record
        })
    },
    set(id, data) { 
        console.log(`[Ontology] storing record id '${id}'...`)
        console.log(`[Ontology] storing record '${id}' with `, data)
        return db.ontology.update(id, data)    
    },
    reset () {
        console.log(`[Ontology] Resetting IndexedDb 'iuxe_database'...`)
        return Dexie.delete('iuxe_database').then(function() {
            console.log(`[Ontology] IndexedDb 'iuxe_database' deleted.`)
            console.log(`[Ontology] Creating IndexedDb 'iuxe_database'...`)
            
            const db = new Dexie("iuxe_database");
            db.version(1).stores({
                ontology: 'id'
            });
        
            return db.ontology.get('spotify').then(function (spotify) {
                if(!spotify) {
                    return db.ontology.put({ id: 'spotify' })
                }
                return spotify;
            })
        });
    }
}