import React, { useState, useEffect } from "react";
import { db } from "../config"; // Adjust the path based on your project structure
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Pencil, Trash } from "react-bootstrap-icons";
function ViewQuizCategories() {
  const [quizCategories, setQuizCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    // Fetch categories from Firestore
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizCategories"));
        const categoriesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuizCategories(categoriesList);
      } catch (error) {
        console.error("Error fetching quiz categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "quizCategories", id));
      setQuizCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category.id);
    setNewCategoryName(category.name);
    setNewThumbnail(category.thumbnail);
    setNewDescription(category.description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "quizCategories", editCategory), {
        name: newCategoryName,
        thumbnail: newThumbnail,
        description: newDescription,
      });
      setQuizCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === editCategory
            ? {
                ...category,
                name: newCategoryName,
                thumbnail: newThumbnail,
                description: newDescription,
              }
            : category
        )
      );
      setEditCategory(null);
      setNewCategoryName("");
      setNewThumbnail("");
      setNewDescription("");
    } catch (error) {
      console.error("Error updating category: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Quiz Categories</h2>
      <ul className="list-group">
        {quizCategories.map((category) => (
          <li
            key={category.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editCategory === category.id ? (
              <form onSubmit={handleUpdate} className="d-flex flex-column w-100">
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    className="admin-form-control form-control mb-2"
                    placeholder="Category Name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="admin-form-control form-control mb-2"
                    placeholder="Thumbnail URL"
                    value={newThumbnail}
                    onChange={(e) => setNewThumbnail(e.target.value)}
                    required
                  />
                  <textarea
                    className="admin-form-control form-control mb-2"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <button type="submit" className="btn admin-btn">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn admin-cancel-btn"
                    onClick={() => setEditCategory(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="d-flex flex-column">
                  <h5>{category.name}</h5>
                  <img
                    src={category.thumbnail}
                    alt={category.name}
                    style={{ maxWidth: "100px" }}
                  />
                  <p>{category.description}</p>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(category)}
                  >
                    {" "}
                    <Pencil size={20} color="black" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash size={20} color="black" />{" "}
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewQuizCategories;
