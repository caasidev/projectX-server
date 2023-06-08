import request from 'supertest'
import { describe, expect, beforeAll, afterAll, it } from '@jest/globals'
import app from '../app'

describe('User API', () => {
    let userId: number, createdUserId: number

    beforeAll(async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'John Doe', email: 'john@doe.com', password: 'password' })

        userId = response.body.id
    })

    afterAll(async () => {
        await request(app).delete(`/users/${userId}`)
    })

    it('creates a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'Susan Doe', email: 'susan@doe.com', password: 'suepass' })

        createdUserId = response.body.id

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body.name).toBe('Susan Doe')
        expect(response.body.email).toBe('susan@doe.com')
        expect(response.body.password).toBe('suepass')
    })

    it('gets all users', async () => {
        const response = await request(app).get('/users')

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(2)
        expect(response.body[0].id).toBe(userId)
        expect(response.body[0].name).toBe('John Doe')
        expect(response.body[0].email).toBe('john@doe.com')
    })

    it('gets user by userId', async () => {
        const response = await request(app).get(`/users/${userId}`)

        expect(response.status).toBe(200)
        expect(response.body.id).toBe(userId)
        expect(response.body.name).toBe('John Doe')
        expect(response.body.email).toBe('john@doe.com')
    })

    it('updates DEFAULT user', async () => {
        const response = await request(app)
            .put(`/users/${userId}`)
            .send({ name: 'Updated name', email: 'updated@email.com' })

        expect(response.status).toBe(201)
        expect(response.body.user.id).toBe(userId)
        expect(response.body.user.name).toBe('Updated name')
        expect(response.body.user.email).toBe('updated@email.com')
    })

    it('deletes CREATED user', async () => {
        const response = await request(app).delete(`/users/${createdUserId}`)

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('User deleted')
    })

    it('returns 404 when user not found', async () => {
        const wrongId = userId + 999
        const response = await request(app).get(`/users/${wrongId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('User not found')
    })
})
