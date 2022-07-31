const express = require('express')
const passport = require('passport')

// pull in Mongoose model for sneakers
const Sneaker = require('../models/sneaker')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// ROUTES GO HERE
// we only need three, and we want to set them up using the same conventions as our other routes, which means we might need to refer to those other files to make sure we're using our middleware correctly

// POST -> create a shirt
// POST /shirts/<sneaker_id>
router.post('/shirts/:sneakerId', removeBlanks, (req, res, next) => {
    // get our shirt from req.body
    const shirt = req.body.shirt
    // get our sneaker's id from req.params.sneakerId
    const sneakerId = req.params.sneakerId
    // find the sneaker
    Sneaker.findById(sneakerId)
        .then(handle404)
        .then(sneaker => {
            console.log('this is the sneaker', sneaker)
            console.log('this is the shirt', shirt)

            // push the shirt into the sneaker's shirts array
            sneaker.shirts.push(shirt)

            // save the sneaker
            return sneaker.save()
            
        })
        // send the newly updated sneaker as json
        .then(sneaker => res.status(201).json({ sneaker: sneaker }))
        .catch(next)
})

// UPDATE a shirt
// PATCH /shirts/<sneaker_id>/<shirt_id>
router.patch('/shirts/:sneakerId/:shirtId', requireToken, removeBlanks, (req, res, next) => {
    // get the shirt and the sneaker ids saved to variables
    const sneakerId = req.params.sneakerId
    const shirtId = req.params.shirtId

    // find our sneaker
    Sneaker.findById(sneakerId)
        .then(handle404)
        .then(sneaker => {
            // single out the shirt (.id is a subdoc method to find something in an array of subdocs)
            const theShirt = sneaker.shirts.id(shirtId)
            // make sure the user sending the request is the owner
            requireOwnership(req, sneaker)
            // update the shirt with a subdocument method
            theShirt.set(req.body.shirt)
            // return the saved sneaker
            return sneaker.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE a shirt
// DELETE /shirts/<sneaker_id>/<shirt_id>
router.delete('/shirts/:sneakerId/:shirtId', requireToken, (req, res, next) => {
    // get the shirt and the pet ids saved to variables
    const sneakerId = req.params.sneakerId
    const shirtId = req.params.shirtId
    // then we find the sneaker
    Sneaker.findById(sneakerId)
        // handle a 404
        .then(handle404)
        // do stuff with the shirt(in this case, delete it)
        .then(sneaker => {
            // we can get the subdoc the same way as update
            const theShirt = sneaker.shirts.id(shirtId)
            // require that the user deleting this shirt is the pet's owner
            requireOwnership(req, sneaker)
            // call remove on the subdoc
            theShirt.remove()

            // return the saved sneaker
            return sneaker.save()
        })
        // send 204 no content status
        .then(() => res.sendStatus(204))
        // handle errors
        .catch(next)
})

// export the router
module.exports = router