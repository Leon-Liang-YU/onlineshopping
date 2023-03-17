// const {Pool} = require("pg")
// const pool = new Pool({

//     database:"onlinestore"
// })

// module.exports = pool

const { Pool } = require("pg")

const config = {
  dev: {
    database: "onlinestore",
  },
  prod: {
    connectionString: process.env.DATABASE_URL,
  },
}

module.exports = new Pool(process.env.DATABASE_URL ? config.prod : config.dev)