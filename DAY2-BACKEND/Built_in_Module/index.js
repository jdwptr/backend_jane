// REVIEW - TIMERS MODULE
var timers= require('timers') //import timers from 'timers'

// timers.setTimeout(function waktu() {
//     console.log('hello coba timers module')
// }, 2000)

// REVIEW - ASSERT MODULE
// var assert= require('assert') //assert untuk unit testing
// var item= ['satu', 'dua', 'tiga']
// assert.strictEqual(item.length, 4, 'SALAH') = mengecek kecocokan

// assert.notStrictEqual(item.length, 3, "ERRORNOTSTRICTEQUAL") // mengecek ketidakcocokan (ngecek tidak samadengan 3)
// false karena kan dia sama dengan tiga, apakah 3 tidak sama dengan tiga? false

// console.log('program setelah assert')
// pas notStrictEqual jalan, kan false hasilnya, si console.log ga jalan, krn diatasnya error jd bawahnya ga jalan
// karena si assert & console itu synchronous

// REVIEW - URL MODULE
var url= require('url')
var link= 'http://localhost:2000/user/jakarta?umur=12&gender=wanita'
var objectUrl= url.parse(link, true)
// console.log(objectUrl)
// console.log('umur:', objectUrl.query.umur) // cara ambil umur di query
// console.log('gender:', objectUrl.query.gender) // cara ambil gender di query
// console.log('host:',objectUrl.host) // cara ambil host
// console.log('port:', objectUrl.port) // cara ambil port
// console.log('search:', objectUrl.search) // cara ambil hasil yg di search (hasilnya string)
// console.log('query:', objectUrl.query) // cara ambil hasil yg di query (hasilnya object)

// NOTE
// semua ngambilnya pake dot karena udah di parse jd object javascript

// REVIEW - OS MODULE
var os= require('os');
var namaCPU = os.hostname()
var osTipe = os.type()
var osPlatform = os.platform()
var osRilis = os.release()
var dirAwal = os.homedir()
var ramSisa = os.freemem()
var ramTotal = os.totalmem()
// console.log(namaCPU)
// console.log(osTipe)
// console.log(osPlatform)