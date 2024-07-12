import React, { useState, useEffect } from "react";
import { db } from "../config"; // Adjust the path based on your project structure
import { collection, getDocs, addDoc } from "firebase/firestore";

function AddCourse() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tutorials, setTutorials] = useState([]);
  const [tutorial, setTutorial] = useState({
    title: "",
    url: "",
    thumbnail: "",
    description: "",
  });

  useEffect(() => {
    // Fetch categories from Firestore
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizCategories"));
        const categoriesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the course with tutorials to Firestore
      await addDoc(collection(db, "quizCourses"), {
        category: selectedCategory,
        tutorials: tutorials,
      });
      setSelectedCategory("");
      setTutorials([]);
    } catch (error) {
      console.error("Error adding course: ", error);
    }
  };

  const addTutorial = () => {
    setTutorials([...tutorials, tutorial]);
    setTutorial({
      title: "",
      url: "",
      thumbnail: "",
      description: "",
    });
  };

  return (
    <div className="container mt-3 mx-2">
      <h2 className="admin-heading">Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-6">
            <label className="admin-form-label form-label">Category</label>
            <select
              className="admin-form-control form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 col-6">
            <label className="admin-form-label form-label">Tutorial Title</label>
            <input
              type="text"
              className="admin-form-control form-control"
              value={tutorial.title}
              onChange={(e) =>
                setTutorial({ ...tutorial, title: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row">
        <div className="mb-3 col-6">
          <label className="admin-form-label form-label">URL</label>
          <input
            type="text"
            className="admin-form-control form-control"
            value={tutorial.url}
            onChange={(e) => setTutorial({ ...tutorial, url: e.target.value })}
          />
        </div>
        <div className="mb-3 col-6">
          <label className="admin-form-label form-label">Thumbnail</label>
          <input
            type="text"
            className="admin-form-control form-control"
            value={tutorial.thumbnail}
            onChange={(e) =>
              setTutorial({ ...tutorial, thumbnail: e.target.value })
            }
          />
        </div>
        </div>
        <div className="mb-3">
          <label className="admin-form-label form-label">Description</label>
          <textarea
            className="admin-form-control form-control"
            value={tutorial.description}
            rows={4}
            onChange={(e) =>
              setTutorial({ ...tutorial, description: e.target.value })
            }
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addTutorial}
        >
          Add Tutorial
        </button>
        <div className="mb-3">
          <h3 className="admin-heading">Tutorials</h3>
          {tutorials.map((tut, index) => (
            <div key={index} className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">{tut.title}</h5>
                <p className="card-text">{tut.description}</p>
                <a
                  href={tut.url}
                  className="card-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn admin-btn">
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;
