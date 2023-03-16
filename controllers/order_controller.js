
const express = require("express")
const router = express.Router()
const db = require("../database/index")
// const cart=[]

// // router.get('/users')//list of user
// // router.post('/users')// create a user
// // router.delete('/users/:id')//delete a user
// // router.put('/users/:id')// update a user
// // router.get('/users/new')// get a new user form
// // router.get('/users/:id/edit')//get existing user form
// // router.get('usets/:id')// get single user


router.get('/orders/:item_id/add', (req, res) => {
    // console.log(req.params.item_id)
    const itemId = req.params.item_id
    req.session.cart.push(itemId)
    // console.log(req.session.cart)
    res.redirect(`/items/${itemId}`)


})

router.get('/orders/:item_id/remove', (req, res) => {
    itemId = req.params.item_id
    // console.log(req.session.cart)
    if (req.session.cart.length > 0) {
        console.log(req.session.cart.indexOf(itemId))
        if (req.session.cart.indexOf(itemId) !== -1) {
            req.session.cart.splice(req.session.cart.indexOf(itemId), 1);
            // console.log(req.session.cart)
        }
    }

    // res.render("itemDetail",{})
    res.redirect(`/items/${itemId}`)
})

router.post('/orders/:user_id/confirm', (req, res) => {
    const intemInfoArr = []
    const customerid = Number(req.params.user_id)
    let orderid = 0


    sql1 = `insert into orders( customer_id ) values (${customerid});`
    db.query(sql1, (err, dbRes) => {

        sql2 = `SELECT * from orders getLastRecord ORDER BY id DESC LIMIT 1;`
        db.query(sql2, (err1, dbRes1) => {
            // console.log(dbRes1.rows)
            // console.log(Number(req.session.cart.length))

            orderid = dbRes1.rows[0].id
            // console.log(orderid)
            let sql3 = ""
        req.session.cart.forEach(element => {
            sql3 += `insert into order_items(orders_id, customer_id, item_id) values (${orderid}, ${customerid}, ${Number(element)} );`

            // console.log(dbRes2.rows)
        })
        db.query(sql3, (err2, dbRes2) => {
            sql4 = `select * from order_items join items on order_items.item_id = items.id where order_items.orders_id = ${orderid} `

            db.query(sql4,(err3,dbRes3) =>{

                const newOrderItems = dbRes3.rows
                // console.log(dbRes3.rows)
                while (req.session.cart.length) { req.session.cart.pop(); }
                res.render("userDetail", {newOrderItems: newOrderItems})

            })
            
            // res.redirect("/") 

        })

        // for(let i=0; i < Number(req.session.cart.length); i++){    
        

            // sql4= `insert into order_items(order_id, customer_id, item_id, item_name, item_img) values (${orderid}, ${customerid}, ${Number(dbRes2.rows[0].id)},'${dbRes2.rows[0].title}', '${dbRes2.rows[0].image_url}');`

            // db.query(sql4,(err, dbRes3)=>{
            //     console.log(dbRes3)

            // })
        })
        //         })
        // res.redirect("/")           
        // })
        // }

        // while (req.session.cart.length) { req.session.cart.pop(); }
        // console.log(dbRes.rows);
        // console.log(req.session.cart)
        // req.session.cart.splice(0)
        // }
    })
})



router.get('/orders/:user_id/cancel', (req, res) => {
    // req.session.cart.splice(0)
    // res.redirect('/')
    // res.render("home")
    // console.log(req.session.cart)
    // res.redirect("/")
    while (req.session.cart.length) { req.session.cart.pop(); }
    res.redirect("/login")


})

router.get('/orders', (req, res) => {
    const orderLists = []
    let totalCharge = 0
    for (let listItem of req.session.cart) {
        const sql = `select * from items where id = $1;`

        db.query(sql, [listItem], (err, dbRes) => {

            if (err) {
                console.log(err)

            } else {
                orderLists.push(dbRes.rows[0])
                totalCharge += dbRes.rows[0].price
                // console.log(orderLists)
                // console.log(totalCharge)


            }
            if (orderLists.length == req.session.cart.length) {
                const cartLength = req.session.cart.length
                res.render("checkout", { orderLists: orderLists, totalCharge: totalCharge, cartLength: cartLength })

            }
        })

    }


})




module.exports = router