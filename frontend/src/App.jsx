import React, { useState, useEffect } from 'react';
import './index.css'; // Assuming you have some basic CSS for responsiveness

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [editingPost, setEditingPost] = useState(null); // To store the post being edited

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewPost({ title: '', content: '' });
      fetchPosts(); // Refresh the list of posts
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (!editingPost) return;

    try {
      const response = await fetch(`http://localhost:3000/posts/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPost),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setEditingPost(null); // Clear editing state
      fetchPosts(); // Refresh the list of posts
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchPosts(); // Refresh the list of posts
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container">
      <h1>Blog Posts</h1>

      {/* Create New Post Form */}
      <div className="form-section">
        <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
        <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost}>
          <input
            type="text"
            placeholder="Title"
            value={editingPost ? editingPost.title : newPost.title}
            onChange={(e) => editingPost ? setEditingPost({ ...editingPost, title: e.target.value }) : setNewPost({ ...newPost, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Content"
            value={editingPost ? editingPost.content : newPost.content}
            onChange={(e) => editingPost ? setEditingPost({ ...editingPost, content: e.target.value }) : setNewPost({ ...newPost, content: e.target.value })}
            required
          ></textarea>
          <button type="submit">{editingPost ? 'Update Post' : 'Create Post'}</button>
          {editingPost && <button type="button" onClick={() => setEditingPost(null)}>Cancel Edit</button>}
        </form>
      </div>

      {/* Posts List */}
      <div className="posts-list">
        <h2>All Posts</h2>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-actions">
                <button onClick={() => setEditingPost(post)}>Edit</button>
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App
