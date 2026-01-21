"use client";
import { useMemo, useState } from "react";

// This component is responsible for managing and displaying posts
export default function Posts() {
  // State that stores all posts
  const [posts, setPosts] = useState([]);

  // State for form input fields
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState("");

  // Allows only English letters and spaces in text inputs
  function onlyEnglish(value) {
    return /^[a-zA-Z ]*$/.test(value);
  }

  // Allows only numeric values in the likes input
  function onlyNumbers(value) {
    return /^[0-9]*$/.test(value);
  }

  // Adds a new post to the posts list
  function addPost() {
    // Validate that all fields are filled
    if (
      !author.trim() ||
      !title.trim() ||
      !content.trim() ||
      likes.trim() === ""
    )
      return;

    // Add the new post immutably
    setPosts((prev) => [
      ...prev,
      {
        author: author.trim(),
        title: title.trim(),
        content: content.trim(),
        likes: Number(likes),
      },
    ]);

    // Reset input fields after adding a post
    setAuthor("");
    setTitle("");
    setContent("");
    setLikes("");
  }

  // Deletes a post by its index
  function deletePost(indexToDelete) {
    setPosts((prev) => prev.filter((_, i) => i !== indexToDelete));
  }

  // Calculates the total number of likes for all posts
  const totalLikes = useMemo(() => {
    return posts.reduce((sum, p) => sum + p.likes, 0);
  }, [posts]);

  // Finds the post with the longest content
  const mostLongPost = useMemo(() => {
    if (posts.length === 0) return null;
    let longest = posts[0];
    for (let i = 1; i < posts.length; i++) {
      if (posts[i].content.length > longest.content.length) {
        longest = posts[i];
      }
    }
    return longest;
  }, [posts]);

  return (
    <div
      style={{
        width: "720px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontFamily: "Arial",
      }}
    >
      <h1>All Posts</h1>

      {/* Form for adding a new post */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: "10px",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <label>Author</label>
        <input
          value={author}
          onChange={(e) =>
            onlyEnglish(e.target.value) && setAuthor(e.target.value)
          }
        />

        <label>Title</label>
        <input
          value={title}
          onChange={(e) =>
            onlyEnglish(e.target.value) && setTitle(e.target.value)
          }
        />

        <label>Content</label>
        <input
          value={content}
          onChange={(e) =>
            onlyEnglish(e.target.value) && setContent(e.target.value)
          }
        />

        <label>Likes</label>
        <input
          value={likes}
          inputMode="numeric"
          onChange={(e) =>
            onlyNumbers(e.target.value) && setLikes(e.target.value)
          }
        />
      </div>

      <button
        style={{
          padding: "6px 12px",
          cursor: "pointer",
        }}
        onClick={addPost}
      >
        Add Post
      </button>

      {/* Posts table */}
      <table
        border="1"
        cellPadding="6"
        style={{
          marginTop: "20px",
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Content</th>
            <th>Likes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p, i) => (
            <tr key={i}>
              <td>{p.author}</td>
              <td>{p.title}</td>
              <td>{p.content}</td>
              <td>{p.likes}</td>
              <td>
                <button onClick={() => deletePost(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary information */}
      <p>Total Likes: {totalLikes}</p>

      {mostLongPost && (
        <p>
          The Most Long Post is with the title = {mostLongPost.title} of{" "}
          {mostLongPost.author}
        </p>
      )}
    </div>
  );
}
