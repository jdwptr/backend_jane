const Model= require('../model/models')
const View= require('../view/views')

class Controller {
    static getData(){
        // console.log('controller get')
        const res= Model.getData()
        View.show(res)
        // console.log(res, 'controller')
    }

    static createData(data){
        Model.createData(data)
    }
}

module.exports= Controller