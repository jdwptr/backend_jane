var http= require('http')
var fs= require('fs')
const port= 2001

const serverJane= http.createServer((req, res) => {
    // console.log(req)
    console.log('URL:', req.url)
    console.log('Headers:', req.headers)
    if(req.url === '/users') {
        let user= {
            name: 'Jane',
            age: 25,
            gender: 'Female'
        }
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(user))
    } 
    else if(req.url === '/buah') {
        let buah= [
            {
                name: 'apple',
                color: 'red'
            },
            {
                name: 'melon',
                color: 'green'
            }
        ]
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(buah))
    } 
    else if(req.url === '/home') {
        let home= fs.readFileSync('home.html', 'utf-8', () => console.log('Home Berhasil Ditampilkan'))
        res.writeHead(200, {'content-type': 'text/html'})
        res.end(home)
    }
    else if(req.url === '/products') {
        // data yg didptkan dr FS adalah berbentuk BUFFER
        let products= fs.readFileSync('product.json').toString()
        console.log(products)
        // agar data dapat terbaca kembali, harus kita satukan dengan mengubahnya jadi string
        // console.log(products.toString())

        // let obj= JSON.parse(products.toString())
        // console.log(obj)

        // let result= JSON.stringify(obj)
        // console.log(result)
        // console.log(typeof(result))

        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(products.toString())
    }
    else if(req.url === '/add_products') {
        let input= ''
        req.on('data', (chunk) => {

            console.log(chunk)

            input= chunk.toString()

            console.log(input)
        })
        .on('end', () => { //pengumpulan data
            let obj= JSON.parse(input)
            console.log(obj)

            let products= JSON.parse(fs.readFileSync('product.json').toString())
            products.push(obj)

            fs.writeFileSync('product.json', JSON.stringify(products))
            res.writeHead(200, {'content-type': 'text/html'})
            res.end('Add Product Done')
        })
    }
})

// u/ yang home, res.end nya gaperlu pake JSON.stringify lagi karena hasil dari module FS itu sudah string

serverJane.listen(port, () => console.log(`Server Jane is running at ${port}`))