const express = require("express")
const app = express()
const methodOverride = require('./middlewares/method_override')
const port =8080
const session = require("express-session")
const itemController = require('./controllers/item_controller')
const sessionController = require('./controllers/session_controller')
const userController = require('./controllers/user_controller')
const orderController = require('./controllers/order_controller')
const setCurrentUser = require('./middlewares/set_currentUser')
const viewHelpers = require("./middlewares/view_helpers")
const viewHelpers1 = require("./middlewares/view_helpers1")

app.set("view engine", "ejs")



app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride)
app.use(
    session({
    // cart: [],
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    })
)
app.use(setCurrentUser)
app.use(viewHelpers)
app.use(viewHelpers1)


app.use(sessionController)
app.use(userController)
app.use(itemController)
app.use(orderController)




app.listen(port, () =>{

    console.log(`listening on port ${port}`)
})
