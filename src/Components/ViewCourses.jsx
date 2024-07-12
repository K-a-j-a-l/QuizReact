import React, { useState, useEffect } from "react";
import { db } from "../config"; // Adjust the path based on your project structure
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editCourseId, setEditCourseId] = useState(null);
  const [newCourseData, setNewCourseData] = useState({
    category: "",
    tutorials: [],
  });
  const [editTutorialIndex, setEditTutorialIndex] = useState(null);
  const [newTutorialData, setNewTutorialData] = useState({
    title: "",
    url: "",
    thumbnail: "",
    description: "",
  });

  useEffect(() => {
    // Fetch courses from Firestore
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizCourses"));
        const coursesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesList);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };
    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'quizCategories'));
            const categoriesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategories(categoriesList);
        } catch (error) {
            console.error('Error fetching categories: ', error);
        }
    };
    fetchCourses();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "quizCourses", id));
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== id)
      );
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
  };

  const handleEdit = (course) => {
    setEditCourseId(course.id);
    setNewCourseData({
      category: course.category,
      tutorials: course.tutorials,
    });
    setEditTutorialIndex(null); // Reset tutorial edit state
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "quizCourses", editCourseId), newCourseData);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === editCourseId
            ? { id: course.id, ...newCourseData }
            : course
        )
      );
      setEditCourseId(null);
      setNewCourseData({ category: "", tutorials: [] });
    } catch (error) {
      console.error("Error updating course: ", error);
    }
  };

  const handleEditTutorial = (index) => {
    setEditTutorialIndex(index);
    setNewTutorialData(newCourseData.tutorials[index]);
  };

  const handleUpdateTutorial = () => {
    const updatedTutorials = [...newCourseData.tutorials];
    updatedTutorials[editTutorialIndex] = newTutorialData;
    setNewCourseData({ ...newCourseData, tutorials: updatedTutorials });
    setEditTutorialIndex(null);
    setNewTutorialData({ title: "", url: "", thumbnail: "", description: "" });
  };

  return (
    <div className="container mt-5">
      <h2>Courses</h2>
      <ul className="list-group">
        {courses.map((course) => (
          <li key={course.id} className="list-group-item">
            {editCourseId === course.id ? (
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={newCourseData.category}
                    onChange={(e) =>
                      setNewCourseData({
                        ...newCourseData,
                        category: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tutorials</label>
                  <ul className="list-group mb-3">
                    {newCourseData.tutorials.map((tutorial, index) => (
                      <li key={index} className="list-group-item">
                        {editTutorialIndex === index ? (
                          <div>
                            <div className="mb-3">
                              <label className="form-label">Title</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newTutorialData.title}
                                onChange={(e) =>
                                  setNewTutorialData({
                                    ...newTutorialData,
                                    title: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">URL</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newTutorialData.url}
                                onChange={(e) =>
                                  setNewTutorialData({
                                    ...newTutorialData,
                                    url: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Thumbnail</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newTutorialData.thumbnail}
                                onChange={(e) =>
                                  setNewTutorialData({
                                    ...newTutorialData,
                                    thumbnail: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Description</label>
                              <textarea
                                className="form-control"
                                value={newTutorialData.description}
                                onChange={(e) =>
                                  setNewTutorialData({
                                    ...newTutorialData,
                                    description: e.target.value,
                                  })
                                }
                              ></textarea>
                            </div>
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={handleUpdateTutorial}
                            >
                              Save Tutorial
                            </button>
                          </div>
                        ) : (
                          <div>
                            <strong>{tutorial.title}</strong> -{" "}
                            {tutorial.description}
                            <button
                              type="button"
                              className="btn btn-warning btn-sm ms-2"
                              onClick={() => handleEditTutorial(index)}
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <button type="submit" className="btn btn-success">
                  Save Course
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => setEditCourseId(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h5>{course.category}</h5>
                <ul className="list-group mb-3">
                  {course.tutorials.map((tutorial, index) => (
                    <li key={index} className="list-group-item">
                      <strong>{tutorial.title}</strong> - {tutorial.description}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
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

export default ViewCourses;
