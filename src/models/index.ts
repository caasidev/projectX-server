// @ts-nocheck

import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    dialect: 'postgres',
    host: process.env.DBHOST,
    logging: false,
})

export default sequelize
