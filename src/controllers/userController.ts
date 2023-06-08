import { Request, Response } from 'express'
import User from '../models/userModel'

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll()

        return res.status(200).json(users)
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const user = await User.findByPk(id)

        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).json({ error: 'User not found' })
        }
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        const user = await User.create({ name, email, password })

        return res.status(201).json(user)
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, email } = req.body

        const user = await User.findByPk(id)

        if (user) {
            user.name = name
            user.email = email

            await user.save()

            return res.status(201).json({ message: 'User updated', user: user })
        } else {
            return res.status(404).json({ error: 'User not found' })
        }
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const user = await User.findByPk(id)

        if (user) {
            await user.destroy()

            return res.status(200).json({ message: 'User deleted' })
        } else {
            return res.status(404).json({ error: 'User not found' })
        }
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}
