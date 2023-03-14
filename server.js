const express = require("express")
const app = express()
const methodOverride = require('./middlewares/method_override')
const port =8080

const itemController = require('./controllers/item_controller')

app.set("view engine", "ejs")



app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride)
app.use(itemController)



app.listen(port, () =>{

    console.log(`listening on port ${port}`)
})
