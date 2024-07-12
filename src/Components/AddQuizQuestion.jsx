import React, { useState, useEffect } from "react";
import { db } from "../config"; // Adjust the path based on your project structure
import { collection, addDoc, getDocs } from "firebase/firestore";

function AddQuizQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([""]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
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
      const quizQuestion = {
        question,
        answer,
        options,
        category: selectedCategory, // Include the selected category
      };
      await addDoc(collection(db, "quizQuestions"), quizQuestion);
      setQuestion("");
      setAnswer("");
      setOptions([""]);
      setSelectedCategory("");
    } catch (error) {
      console.error("Error adding quiz question: ", error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <div className="container mt-3 mx-2">
      <h2 className="admin-heading">Add Quiz Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-6">
            <label className="admin-form-label form-label">Category</label>
            <select
              className="admin-form-control form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
          <div className="mb-3 col-6">
            <label className="admin-form-label form-label">Question</label>
            <input
              type="text"
              className="admin-form-control form-control"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-6">
            <label className="admin-form-label form-label">Answer</label>
            <input
              type="text"
              className="admin-form-control form-control"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-6">
            <label className="admin-form-label form-label">Options</label>
            {options.map((option, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  className="admin-form-control form-control"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeOption(index)}
                  disabled={options.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="d-flex justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addOption}
            >
              Add Option
            </button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn admin-btn">
            Add Question
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddQuizQuestion;
