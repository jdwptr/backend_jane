class View {
    static show(data) {
        console.log('--TO DO LIST--')
        // console.log(data, 'view')
        data.forEach(item => {
            console.log(`${item.name}: ${item.isCompleted ? 'Complete' : 'Not Complete'}`)
        })
    }
}

module.exports= View