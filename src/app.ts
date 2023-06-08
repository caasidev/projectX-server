import express, { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../swagger.json'
import userRoutes from './routes/userRoutes'
import sequelize from './models'

const app: Express = express()

app.use(express.json())
app.use('/users', userRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

sequelize.sync().then(() => {
    console.log('Database connected')
})

export default app
