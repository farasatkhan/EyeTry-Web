const lensSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    brands: [{
        type: String,
        required: true
    }],
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    detailedDescription: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    reviews: [{
        username: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    lensType: {
        type: String,
        required: true
    },
    lensCoating: {
        type: [String],
        required: true
    }
});

const frameSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    brands: [{
        type: String,
        required: true
    }],
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    detailedDescription: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    reviews: [{
        username: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    frameMaterial: {
        type: String,
        required: true
    },
    frameStyle: {
        type: String,
        required: true
    },
    frameColor: {
        type: String,
        required: true
    },
    frameSize: {
        type: String,
        required: true
    }
});
