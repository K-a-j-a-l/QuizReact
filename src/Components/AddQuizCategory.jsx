import React, { useState } from "react";
import { db } from "../config"; // Adjust the path based on your project structure
import { collection, addDoc } from "firebase/firestore";

function AddQuizCategory() {
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the quiz category to Firestore
      await addDoc(collection(db, "quizCategories"), {
        name: category,
        thumbnail: thumbnail,
        description: description,
      });

      // Optionally, reset the form fields after successful submission
      setCategory("");
      setThumbnail("");
      setDescription("");
    } catch (error) {
      console.error("Error adding quiz category: ", error);
    }
  };

  return (
    <div className="container mt-3 mx-2">
      <h2 className="admin-heading">Add Quiz Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-6">
            <label className="admin-form-label form-label">Category</label>
            <input
              type="text"
              className="admin-form-control form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-6">
            <label className="admin-form-label form-label">Thumbnail URL</label>
            <input
              type="text"
              className="admin-form-control form-control"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="admin-form-label form-label">Description</label>
          <textarea
            className="admin-form-control form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          ></textarea>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn admin-btn">
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddQuizCategory;
