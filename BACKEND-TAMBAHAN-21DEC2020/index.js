const fs= require('fs')

// SYNCHRONOUS
// const data= fs.readFileSync('db.json', 'utf-8')
// console.log(JSON.parse(data))

// ASYNC
// fs.readFile('db.json', 'utf-8', (err,data) => {
//     if(err) throw err
//     console.log(data, 'ASYNC')
// })

const command= process.argv[2]
const input= process.argv[3]
const Controller= require('./controller/controller')

switch(command) {
    case 'get':
        // console.log('get data')
        Controller.getData()
        break
    case 'create':
        // console.log('create data')
        Controller.createData(input)
        break
    default:
        console.log('wrong input')
        break
}

// console.log(command, input)