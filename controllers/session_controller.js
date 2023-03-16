const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const session = require('express-session')
const db=require("./../database")

router.get('/login',(req,res)=>{

    res.render("login")

})

router.get('/sessions/admin', (req, res)=>{
    res.render('admin',{})
})
router.post('/sessions',(req, res)=>{

    // console.log(req.session)
    req.session.cart=[]
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
                    if(user.id==1){
                        req.session.userId = user.id
                        res.render('admin',{})
                    }else{
                        req.session.userId = user.id
                        res.redirect('/')
                    }
                } else {

                    res.redirect('/login')
                }
            }) 
        

    })




})

router.delete("/sessions", (req, res)=>{

    
    req.session.destroy(()=>{

        res.redirect("/login")
    })
})

module.exports = router