const mongoose = require('mongoose')
const { Schema, model } = mongoose
const sneakerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		
		toObject: { virtuals: true },
        toJSON: { virtuals: true }
	}
)
sneakerSchema.virtual('fullTitle').get(function () {
    // in here, we can do whatever javascripty things we want, to make sure we return some value that will be assigned to this virtual
    // fullTitle is going to combine the name and type to build a title
    return `${this.name} the ${this.brand}`
})

sneakerSchema.virtual('youWavvvy').get(function () {
    if (this.price < 200) {
        return "yeah, they're just a baby"
    } else if (this.price >= 200 && this.price < 500) {
        return "super wavvvy"
    } else {
        return "is that DIOR?"
    }
})
module.exports = model('Sneaker', sneakerSchema)
