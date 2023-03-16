const express =require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const db=require("./../database")

// const ensureLoggedIn=require("./../middlewares/ensure_logged_in")
// const viewHelpers = require("./../middlewares/view_helpers")


router.get('/users', (req, res)=>{

    const sql = "select * from users;"

    db.query(sql, (err, dbRes) =>{
        // console.log(dbRes.rows)
        const users = dbRes.rows
        // res.render("home", {dishes: dishes,email: req.session.email})
        res.render("allusers", {users: users})
    })
})

router.get('/users/new',(req,res)=>{

    res.render("new_user")
})


router.post('/users',(req, res)=>{

    const email = req.body.email
    console.log(email)
    const plainTextPassword = req.body.password


    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(plainTextPassword, salt, (err, digestedPassword)=>{

        console.log(digestedPassword)
        const sql = `insert into users (email, password_digest) values($1,$2);`

        db.query(sql,[email,digestedPassword],(err, dbRes)=>{


            console.log(err)
            res.redirect("/")
            
        })
    })

})
})

router.get('/users/:id/edit',(req, res)=>{
    console.log(req.params.id)
    if (req.params.id!==1){
        const userId = req.params.id
        const sql = `select * from users where id = ${userId};`

        db.query(sql, (err, dbRes) =>{
        // console.log(dbRes)
            const user = dbRes.rows[0]
        
        res.render("edit_user", {user: user})
        })
    } else if (req.params.id==1) {

        res.render('admin')
    }
})

router.put('/users/:id', (req,res)=>{

    console.log(req.body.email)
    const sql = `update users set email = $1, address = $2 where id = $3;` 

    db.query(sql, [req.body.email, req.body.address, req.params.id],( err, dbRes)=>{
        res.redirect('/users')
        

    })

})

router.get("/users/:id",(req, res)=>{

    console.log(req.params.id)
    const userId = req.params.id

    const sql = `select * from orders where customer_id = ${userId};`

    db.query(sql,(err,dbRes)=>{

        if (err){
            console.log(err)

        }else {
        const orders = dbRes.rows
        
        }
    })
    res.render("userDetail", {orders})

})


router.delete("/users/:user_id", (req, res) => {

    if (req.params.user_id!==1){
        const sql = `delete from users where id =${req.params.user_id};`

        db.query(sql, (err, dbRes)=> {
            // isLoggedIn()=false
            // req.session.destroy(()=>{

                res.redirect("/users")
            // })

        })
    }else {

        res.redirect("/admin")
    }

})

module.exports = router