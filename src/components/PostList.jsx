import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostList = ({ posts, setPosts }) => {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingBody, setEditingBody] = useState("");
  const [error, setError] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API_PROD}/posts`,
        {
          title: newPostTitle,
          body: newPostBody,
        }
      );
      setPosts([...posts, response.data]);
      setNewPostTitle("");
      setNewPostBody("");
    } catch (error) {
      setError("Error creating post");
      console.error("Error creating post:", error);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL_API_PROD}/posts/${editingPostId}`,
        {
          title: editingTitle,
          body: editingBody,
        }
      );
      setPosts(
        posts.map((post) => (post._id === editingPostId ? response.data : post))
      );
      setEditingPostId(null);
      setEditingTitle("");
      setEditingBody("");
    } catch (error) {
      setError("Error updating post");
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL_API_PROD}/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      setError("Error deleting post");
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl mb-4">Post List</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Create New Post Form */}
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Create New Post</h3>
        <form onSubmit={handleCreatePost}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Body</label>
            <textarea
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Create Post
          </button>
        </form>
      </div>

      {/* Display Posts */}
      <ul>
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post) => (
            <li key={post._id} className="border-b py-2">
              {editingPostId === post._id ? (
                <div>
                  <h3 className="text-lg font-bold mb-2">Edit Post</h3>
                  <form onSubmit={handleUpdatePost}>
                    <div className="mb-4">
                      <label className="block text-gray-700">Title</label>
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="border p-2 w-full"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Body</label>
                      <textarea
                        value={editingBody}
                        onChange={(e) => setEditingBody(e.target.value)}
                        className="border p-2 w-full"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2"
                    >
                      Update Post
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingPostId(null)}
                      className="ml-2 bg-gray-500 text-white px-4 py-2"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <p>{post.body}</p>
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        setEditingPostId(post._id);
                        setEditingTitle(post.title);
                        setEditingBody(post.body);
                      }}
                      className="text-blue-500 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PostList;
