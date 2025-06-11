

let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    { id: 2, title: 'Second Post', content: 'Another interesting post here.' }
];
let nextId = 3;
const getAll = () => {
    return posts;
};

const getById = (id) => {
    return posts.find(post => post.id === parseInt(id));
};

// Function to create a new post
const create = (postData) => {
    if (!postData.title || !postData.content) {
        return null; 
    }
    const newPost = {
        id: nextId++,
        title: postData.title,
        content: postData.content
    };
    posts.push(newPost);
    return newPost;
};

// Function to update an existing post
const update = (id, updateData) => {
    const postId = parseInt(id);
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex === -1) {
        return null; // Post not found
    }

    // Only update fields that are provided
    const updatedPost = { ...posts[postIndex] };
    if (updateData.title !== undefined) {
        updatedPost.title = updateData.title;
    }
    if (updateData.content !== undefined) {
        updatedPost.content = updateData.content;
    }
    
    posts[postIndex] = updatedPost;
    return updatedPost;
};

// Function to delete a post
const remove = (id) => {
    const postId = parseInt(id);
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex === -1) {
        return false; // Post not found
    }

    posts.splice(postIndex, 1);
    return true; // Deletion successful
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};