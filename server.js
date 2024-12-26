const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/devdiary', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/posts', async (req, res) => {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
});

app.post('/api/posts', async (req, res) => {
    const { title, body } = req.body;
    const newPost = new Post({ title, body });
    await newPost.save();
    res.json({ message: 'Post created' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
