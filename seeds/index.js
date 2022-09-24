const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const random50 = Math.floor(Math.random() * 50) + 1;
        const camp = new Campground({
            author: '63257d304d54d993f7a0d908',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta non odio aperiam perspiciatis quisquam sint quaerat nemo, deleniti adipisci possimus nihil provident architecto? Quis, quisquam. Corporis blanditiis assumenda eum enim',
            price: `${random50}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/ddmmmdqyv/image/upload/v1663597457/YelpCamp/b5wi7dux5gesd9hks9de.jpg',
                    filename: 'YelpCamp/b5wi7dux5gesd9hks9de'
                },
                {
                    url: 'https://res.cloudinary.com/ddmmmdqyv/image/upload/v1663597457/YelpCamp/ds4a1nrfpkdkzp8csdzz.jpg',
                    filename: 'YelpCamp/ds4a1nrfpkdkzp8csdzz'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})