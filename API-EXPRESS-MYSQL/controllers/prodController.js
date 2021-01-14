// NOTE import connection (import database nya dulu)
const db= require('../database')

module.exports= {
    getAllProd: (req, res) => {
        // NOTE define query SQL
        const queryProd= 'SELECT * FROM PRODUCTS'
        
        db.query(queryProd, (err, result) => {
            // NOTE check error
            if (err) return res.status(500).send(err)

            // NOTE kalau berhasil
            res.status(200).send(result)
        })  
    }
}