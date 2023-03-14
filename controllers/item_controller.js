
// // router.get('/users')//list of user
// // router.post('/users')// create a user
// // router.delete('/users/:id')//delete a user
// // router.put('/users/:id')// update a user
// // router.get('/users/new')// get a new user form
// // router.get('/users/:id/edit')//get existing user form
// // router.get('usets/:id')// get single user


const express =require("express")
const router = express.Router()
const db = require("./../database/index")


router.get("/", (req,res)=>{
    // console.log(req.session)

    const sql = "select * from items;"

    db.query(sql, (err, dbRes) =>{
        console.log(dbRes.rows)
        const items = dbRes.rows
        // res.render("home", {dishes: dishes,email: req.session.email})
        res.render("home", {items: items})
    })
})

router.get('/items/new',(req,res)=>{

    res.render("new_item")
})

router.post("/items",(req, res)=>{


    const sql = 'insert into items (title, describe, image_url, price, available) values ($1,$2,$3,$4,$5);'
        

    db.query(sql,[req.body.title,req.body.describe,req.body.image_url,req.body.price, req.body.available], (err, dbRes)=>{

        res.redirect("/")
    })

})


router.get("/items/:item_id", (req, res) =>{

    const sql = `select * from items where id = $1;`
    //{req.params.id} sanatise the sql string
    db.query(sql,[req.params.item_id], (err,dbRes) => {
        if (err){
            console.log(err)

        }else {
        const item = dbRes.rows[0]
        res.render("itemDetail", {item: item})
        }
    })


})





router.get('/items/:item_id/edit', (req,res)=>{
    //fetch the record for this dish
    //so i can use it in the form in the template
    
        const sql = `select * from items where id = $1 ;`
    
        db.query(sql,[req.params.item_id],(err, dbRes)=>{
        if (err){
    
            console.log(err)
        }else {
            const item = dbRes.rows[0]
        res.render("edit_item",{item})
        }
    
    })
    })

router.put('/items/:item_id',(req, res)=>{

    const sql = `update items set title = $1, describe= $2, image_url = $3, price = $4, available = $5 where id = $6;` 

    db.query(sql, [req.body.title,req.body.describe, req.body.image_url, req.body.price, req.body.available, parseInt(req.params.item_id)],( err, dbRes)=>{
        res.redirect(`/items/${req.params.item_id}`)
        // res.redirect("/")

    })

})



router.delete("/items/:item_id", (req, res) => {
        // console.log(req.body.dish_id)
        const sql = `delete from items where id =$1;`
    
        db.query(sql,[req.params.item_id], (err, dbRes)=> {
    
            res.redirect("/")
        })
    
    })






module.exports = router