// NOTE database
let products= [
    {
        id: 1,
        name: 'nike',
        price: 10000
    },
    {
        id: 2,
        name: 'adidas',
        price: 20000
    },
    {
        id: 3,
        name: 'puma',
        price: 30000
    }
]

// NOTE export semua controller, getprod, getprod by id, add prod, edit prod, delete prod
module.exports= {
    getProd: (req, res) => {
        res.status(200).send(products)
    },

    item: (req, res) => {
        const item= products[+req.params.index]
        // const id= products[+req.params.id]
        // let tempProd= products[item]
        // if (!item) return res.status(400).send(`NO ITEM WITH INDEX`)
        if (!item) return res.status(400).send(`NO ITEM WITH INDEX ${req.params.index}`)

        res.status(200).send(item)
    },

    addProd: (req, res) => {
        const {name, price} = req.body

        // NOTE make sure kalo itemnya yg mau tambahin udah klengkap atau belom
        if (!name || !price) return res.status(400).send(`PLEASE INPUT ALL PRODUCTS DATA CORRECTLY`)

        products.push({
            id: (products[products.length - 1].id) + 1,
            name,
            price
        })

        res.status(200).send(products)
    },

    editProd: (req, res) => {
        let tempProd= products[+req.params.index]

        // NOTE cek ketersediaan item nya, jadi kalau item nya gada
        if (!tempProd) return res.status(400).send(`NO ITEM WITH INDEX ${req.params.index}`)
        console.log(req.body)

        // NOTE looping untuk mengedit item
        for (let key in req.body) {
            for (let key2 in tempProd) {
                if (key === key2) {
                    tempProd[key2] = req.body[key]
                }
            }
        }

        res.status(200).send(products)
    },

    deleteProd: (req, res) => {
        let tempProd= products[+req.params.index]

        // NOTE kalau usernya tidak ada
        if (!tempProd) return res.status(400).send(`NO ITEM WITH INDEX ${req.params.index}`)
    
        products.splice([+req.params.index], 1)
    
        res.status(200).send(products)
    }
}