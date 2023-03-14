const {Pool} = require("pg")
const pool = new Pool({

    database:"onlinestore"
})

module.exports = pool