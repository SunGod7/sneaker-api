const mongoose = require('mongoose')
const Sneaker = require('./sneaker')
const db = require('../../config/db')



const startSneakers = [
    { name: 'off the grind high top', brand: 'GUCCI', price: 820, highFashion: true},
    { name: 'Rhyton Sneaker', brand: 'GUCCI', price: 890 , highFashion: true},
    { name: 'London Double-zip leather', brand: 'GIUSEPPE', price: 665, highFashion: true},
    { name: 'Cup high-top', brand: 'PRADA', price: 850, highFashion: true},
    { name: 'Air Force 1', brand: 'NIKE', price: 130, highFashion: false},
    { name: 'Air Max 97', brand: 'NIKE', price: 175 , highFashion: false},
    { name: 'Air Jordan 3 Retro', brand: 'JORDAN', price: 200, highFashion: false},
    // { name: '', brand: '', price: , highFashion: true},
    // { name: '', brand: '', price: , highFashion: true},
    // { name: '', brand: '', price: , highFashion: true},
    // { name: '', brand: '', price: , highFashion: true},
    // { name: '', brand: '', price: , highFashion: true},
]

// first we need to connect to the database
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        // first we remove all of the pets
        // here we can add something to make sure we only delete pets without an owner
        Sneaker.deleteMany({ owner: null })
            .then(deletedSneakes => {
                console.log('deletedPets', deletedSneakers)
                // the next step is to use our startPets array to create our seeded pets
                Sneaker.create(startSneakers)
                    .then(newSneakers => {
                        console.log('the new pets', newSneakers)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })