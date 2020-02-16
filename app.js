const express = require('express');
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 3000;
const app = express();

// check here is mainly to avoid refreshing the page and that is tthe main aim of this little project

// Check the difference between res.json and res.send


// const obj = {
//     id: 12345,
//     Username: "lion",
//     birthdate: {
//         year: 1990,
//         month: 'feb',
//         day: '2'
//     }
// }

app.use(express.urlencoded({ extended: false })) // this is to avoid this message: (cannot read property  'connString'con of undefined)
app.use(express.json()); // in case u use urlencoded please use this as well to be sure we have middleware for json too.


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    //res.send(obj)
})

app.post('/checkdbConnection', (req, res) => {
    //req.body.connString
    //res.send()
    //res.json(req.body.connString)
    const dburl = req.body.connString;
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(dburl, { useNewUrlParser: true })
            client.close();
            res.json(1);

        } catch (error) {
            res.json(0)

        }
    }())

})


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});



// To understand the difference between res.send and res.json, u can check it here:
//https://www.codingdefined.com/2016/06/difference-between-ressend-and-resjson.html