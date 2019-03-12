const express = require('express');
const path = require('path');
const cors = require('cors');
const parser = require('body-parser');
const axios = require('axios');
let id = 123;

const app = express();
const port = 3004;

app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

// app.use('/', (req, res, next) => {
//     id = Math.ceil(Math.random() * 19);
//     console.log('proxy id', id)
//     next();
// })

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// app.post('/randomid', (req, res) => {
//     const {randomId} = req.body;
//     id = randomId;
//     console.log('proxy id', id)
// })

// app.get('/suggestions', (req, res) => {
//     axios
//         .get('http://18.216.95.88:3004/suggestions', {
//             params: {
//                 id: id
//             }
//         })
//         .then(({ data }) => res.send(JSON.stringify(data)))
//         .catch(err => res.send(JSON.stringify(err)))
// })

// app.get('/search/:keyword', (req, res) => {
//     let keyword = req.params.keyword;
//     axios
//         .get(`http://localhost:3001/search/${keyword}`)
//         .then(({data}) => res.send(JSON.stringify(data)))
//         .catch(err => console.log(err))
// })

// app.get('/abibas/product', (req, res) => {
//     axios
//         .get('http://3.86.105.203:3002/abibas/product', {
//             params: {
//                 id: id
//             }
//         })
//         .then(({ data }) => res.send((data)))
//         .catch(err => res.send(err))
// })

// app.get('/abibas/color', (req, res) => {
//     let colorId = req.query.id;
//     axios
//         .get('http://3.86.105.203:3002/abibas/product', {
//             params: {
//                 id: colorId
//             }
//         })
//         .then(({ data }) => res.send((data)))
//         .catch(err => res.send(err))
// })

app.get('/reviews', (req, res) => {
    // const {id} = req.params
    // console.log(id)
    console.log('in proxy server get')
    axios
        .get(`https://18.218.95.162:3005/reviews/${id}`)
        .then(({ data }) => console.log(JSON.stringify(data)))
        .catch(err => res.send(err))
})

app.get('/reviews/stats', (req, res) => {
    axios
        .get(`https://18.218.95.162:3005/reviews/stats/${id}`)
        .then(({ data }) => res.send(JSON.stringify(data)))
        .catch(err => res.send(err))
})

app.listen(port, () => console.log(`Server running on port ${port}`));