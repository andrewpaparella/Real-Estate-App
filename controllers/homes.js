const mongoose = require('mongoose')
const Home = require('../models/home')
// const Realtor = require('../models/realtor')

module.exports = {
    index,
    show,
    new: newHome,
    create,
    delete: deleteHome,
    edit,
    update,
    // addToHome
}

async function index(req,res) {
    try {
        const homes = await Home.find({})
        res.render('homes/index', {
            title: 'All Homes',
            homes
        })
    } catch (err){
        res.send(err)
    }
}

async function show(req,res) {
    try {
        const home = await Home.findById(req.params.id)
        res.render('homes/show',{
            title: 'Home Detail',
            home
        })
    } catch (err) {
        res.send(err)
    }
}

function newHome(req,res) {
    res.render('homes/new', {title: 'Add Home'})
}

async function create(req,res) {
    req.body.pool = !!req.body.pool;
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    const homeNew = req.body
    const home = await Home.create(homeNew);
    home.save(function (err) {
        if (err) return res.render(`homes/new`, {title: 'Add Home'})
        res.redirect('homes')
    })
}

async function deleteHome (req,res) {
    try{
        const deletedHome = await Home.findByIdAndDelete(req.params.id)
        const homes = await Home.find({})
        res.render('homes/index', {
            title: 'All Homes',
            homes
    })
    } catch (err) {
        res.send(err)
    }
}

async function edit(req,res) {
    try {
        const home = await Home.findById(req.params.id)
        res.render('homes/edit', {
            title: 'Edit Home',
            home })
    } catch (err) {
        res.send(err)
    }
}

async function update(req,res) {
    try {
        req.body.pool = !!req.body.pool;
        for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
        }
        const updateHome = await Home.findByIdAndUpdate(req.params.id, req.body)
        updateHome.save()
        res.redirect(`/homes/${updateHome._id}`)
    } catch (err) {
        res.send(err)
    }
}

// async function addToHome(req,res) {
//     const realtors = await Realtor.find({})
//     const home = await Home.findById(req.params.id)
//     home.realtor.push(req.body.realtorId)
//     home.save(function (err) {
//         res.redirect(`/homes/${home._id}`, {
//             realtors
//         })
//     })
// }