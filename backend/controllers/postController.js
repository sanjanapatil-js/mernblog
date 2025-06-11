
const postData = require('../data/posts');

const getAllPosts = (req, res) => {
    const posts = postData.getAll();
    res.json(posts);
};

const getPostById = (req, res) => {
    const post = postData.getById(req.params.id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

const createPost = (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    const newPost = postData.create({ title, content });
    res.status(201).json(newPost);
};

const updatePost = (req, res) => {
    const { title, content } = req.body;
    if (title === undefined && content === undefined) {
        return res.status(400).json({ message: 'No update data provided (title or content)' });
    }

    const updatedPost = postData.update(req.params.id, { title, content });
    if (updatedPost) {
        res.json(updatedPost);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

const deletePost = (req, res) => {
    const success = postData.remove(req.params.id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};