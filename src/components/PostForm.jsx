import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PostForm = ({ onPostCreated, onPostUpdated, posts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const post = posts.find((post) => post._id === id);
      if (post) {
        setTitle(post.title);
        setBody(post.body);
      }
    }
  }, [id, posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, body };
    if (id) {
      axios
        .put(`http://localhost:5000/posts/${id}`, post)
        .then((response) => {
          onPostUpdated(response.data);
          navigate("/");
        })
        .catch((error) => console.error("Error updating post:", error));
    }

    if (!id) {
      axios
        .post("http://localhost:5000/posts", post)
        .then((response) => {
          onPostCreated(response.data);
          navigate("/");
        })
        .catch((error) => console.error("Error creating post:", error));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl mb-4">{id ? "Edit Post" : "Create Post"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {id ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
