const express =require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const db=require("./../db")

// const ensureLoggedIn=require("./../middlewares/ensure_logged_in")
// const viewHelpers = require("./../middlewares/view_helpers")




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
        const sql = `insert into users (email, password_digest) values($1,'$2);`

        db.query(sql,[email,digestedPassword],(err, dbRes)=>{


            console.log(err)
            res.redirect("/")
            
        })
    })

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
    res.render("user_detail", {orders})

})


router.delete("/users/:user_id", (req, res) => {
    // console.log(req.body.dish_id)

    const sql = `delete from users where id =${req.params.user_id};`

    db.query(sql, (err, dbRes)=> {
        // isLoggedIn()=false
        req.session.destroy(()=>{

            res.redirect("/login")
        })

    })

})

module.exports = router