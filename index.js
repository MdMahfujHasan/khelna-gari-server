const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4hbo1s9.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const galleryCollection = client.db('khelnaGari').collection('gallery');
        const remoteControlCarsCollection = client.db('khelnaGari').collection('category1');
        const constructionAndBuildingCarsCollection = client.db('khelnaGari').collection('category2');
        const transformingCarsCollection = client.db('khelnaGari').collection('category3');

        app.get('/gallery', async (req, res) => {
            const result = await galleryCollection.find().toArray();
            res.send(result);
        });

        app.get('/category1', async (req, res) => {
            const result = await remoteControlCarsCollection.find().toArray();
            res.send(result);
        });

        app.get('/category1/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await remoteControlCarsCollection.findOne(query);
            res.send(result);
        });

        app.get('/category2', async (req, res) => {
            const result = await constructionAndBuildingCarsCollection.find().toArray();
            res.send(result);
        });

        app.get('/category2/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await constructionAndBuildingCarsCollection.findOne(query);
            res.send(result);
        });

        app.get('/category3', async (req, res) => {
            const result = await transformingCarsCollection.find().toArray();
            res.send(result);
        });

        app.get('/category3/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await transformingCarsCollection.findOne(query);
            res.send(result);
        });

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('khelna gari server running');
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});