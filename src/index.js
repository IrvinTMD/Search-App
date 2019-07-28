const express = require('express');
const path = require('path');
const hbs = require('hbs');
const {BigQuery} = require('@google-cloud/bigquery');
const queryHackerNewsStories = require('./utils/queryHackerNewsStories')

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('', (req, res) => {
    res.render('index', {
        title: "Search!",
        name: "TMD"
    })
})

app.post('/search', async (req, res) => {
    try {
        const { title, text, date } = req.body
        const final = await queryHackerNewsStories(title, text, date);
        console.log(`Search returned ${final['articles'].length} results.`)
        res.send(final)
    } catch (e) {
        res.status(400).send()
    }
});

// app.get('/main', (req, res) => {
//     res.render('indexTest', {
//         title: "Search!",
//         name: "TMD"
//     })
// })

// app.get('/search', async (req, res) => {
//     const { title, text, date } = req.query;
//     // const final = await queryHackerNewsStories(title, text, date);
//     const final = await queryHackerNewsStories(title, text, date);
//     res.send(final)
// });

app.listen(port, () => {
    console.log('Search Server is running on', port)
});