import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import Login from "./components/Login";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_URL_API_PROD}/posts`)
        .then((response) => setPosts(response.data))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [user]);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <PostList posts={posts} setPosts={setPosts} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/create"
            element={
              user ? (
                <PostForm
                  onPostCreated={(post) => setPosts([...posts, post])}
                />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/edit/:id"
            element={
              user ? (
                <PostForm
                  posts={posts}
                  onPostUpdated={(updatedPost) =>
                    setPosts(
                      posts.map((post) =>
                        post._id === updatedPost._id ? updatedPost : post
                      )
                    )
                  }
                />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
