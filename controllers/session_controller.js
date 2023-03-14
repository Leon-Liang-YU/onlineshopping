const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const session = require('express-session')
const db=require("./../db")

router.get('/login',(req,res)=>{

    res.render("login")

})


router.post('/sessions',(req, res)=>{

    // console.log(req.session)

    const email = req.body.email

    const password = req.body.password

    // do you even existing the users table

    const sql = `select * from users where email= $1;`

    db.query(sql,[email], (err, dbRes)=>{

        if (dbRes.rows.length===0){

            res.render("login")
            return
        }
    const user = dbRes.rows[0]

        bcrypt.compare(password, user.password_digest,
            (err,result )=>{

                if(result){
                    // req.session.email=user.email
                    req.session.userId = user.id
                    res.redirect('/')
                } else {

                    res.render("login")
                }
            })

    })


    // res.json(req.body)

})

router.delete("/sessions", (req, res)=>{
    // req.session.userId=undefined
    
    req.session.destroy(()=>{
        // console.log(req.session.userId)

        res.redirect("/login")
    })
})

module.exports = router