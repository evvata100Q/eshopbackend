
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import User from './models/User.js'
import Product from './models/Product.js'
import Order from './models/Order.js'
import Orderitem from './models/Orderitem.js'

import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGO_URI
const localuri = 'mongodb://localhost:27017/eshopdb'

const app = express()

app.use(cors())
app.use(express.json())


mongoose.connect(uri)
    .then(() => console.log('did connect to db'))
    .catch(() => console.log('not connected to db'))

app.listen(5000, () => { console.log('server running on port 5000') })



app.get('/', (req, res) => {
    res.status(200).json({ umessage: 'hi' })
})

app.post('/signup', async (req, res) => {
    try {
        let { un: username, pw: password, rn: realname } = req.body
        let newuser = new User({ username, password, realname })
        await newuser.save()
        return res.status(201).json({ umessage: 'sign up success' })
    }
    catch (err) {
        res.status(400).json({ umessage: 'some error' })
    }
})


app.post('/login', async (req, res) => {
    let { un: username, pw: password } = req.body
    let user = await User.findOne({ username })
    if (!user) {
        return res.status(404).json({ umessage: 'user doesnt exist' })
    }
    if (user.password !== password) {
        return res.status(401).json({ umessage: 'wrong password' })
    }
    res.status(200).json({ token: `randomstring${user.realname}` })
})




app.get('/products', async (req, res) => {
    try {
        let products = await Product.find()
        res.status(200).json({ products })
    }
    catch (error) {
        res.status(500).json({ umessage: 'some error' })
    }
})




app.post('/orders', async (req, res) => {
    try {
        let { content: orders, who: realname } = req.body
        let oil = []
        for (let i of orders) {
            let newoi = new Orderitem({ whichproductid: i.productsid, quantity: i.quant })
            await newoi.save()
            oil.push(newoi)
        }
        let user = await User.findOne({ realname })
        let no = new Order({ customer: user, suborders: oil })
        await no.save()
        res.status(201).json({ umessage: 'order creation success' })
    } catch (error) {
        res.status(500).json({ umessage: 'some errorr' })
    }
})






app.get('/orders/:rn', async (req, res) => {
    try {
        const { rn } = req.params
        let user = await User.findOne({ realname: rn })
        let orders = await Order.find({ customer: user }).populate({
            path: 'suborders.whichproductid'
        })
        res.status(200).json({ orders })
    } catch (error) {
        res.status(500).json({ message: 'some error' })
    }
})