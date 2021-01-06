const fs= require('fs')

class Model {
    static getData() {
        // console.log('model')
        let data= fs.readFileSync('./db.json', 'utf-8')
        data= JSON.parse(data)
        // console.log(data)

        return data
    }

    static createData(input) {
        // console.log(data, 'model')
        const data= JSON.parse(fs.readFileSync('./db.json', 'utf-8'))
        console.log(data)

        const newData= {
            id: data[data.length - 1].id + 1,
            name: input,
            isCompleted: false
        }
        data.push(newData)

        fs.writeFileSync('./db.json', JSON.stringify(data, null, 2))
    }
}

module.exports= Model