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

function ViewQuizQuestions() {
  const [questions, setQuestions] = useState([]);
  const [editQuestionId, setEditQuestionId] = useState(null);
  const [newQuestionData, setNewQuestionData] = useState({
    question: "",
    options: [],
    answer: "",
  });

  useEffect(() => {
    // Fetch questions from Firestore
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizQuestions"));
        const questionsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(questionsList);
      } catch (error) {
        console.error("Error fetching quiz questions: ", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "quizQuestions", id));
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
    } catch (error) {
      console.error("Error deleting question: ", error);
    }
  };

  const handleEdit = (question) => {
    setEditQuestionId(question.id);
    setNewQuestionData({
      question: question.question,
      options: question.options,
      answer: question.answer,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(
        doc(db, "quizQuestions", editQuestionId),
        newQuestionData
      );
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === editQuestionId
            ? { id: question.id, ...newQuestionData }
            : question
        )
      );
      setEditQuestionId(null);
      setNewQuestionData({ question: "", options: [], answer: "" });
    } catch (error) {
      console.error("Error updating question: ", error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...newQuestionData.options];
    newOptions[index] = value;
    setNewQuestionData({ ...newQuestionData, options: newOptions });
  };

  const addOption = () => {
    setNewQuestionData({
      ...newQuestionData,
      options: [...newQuestionData.options, ""],
    });
  };

  const removeOption = (index) => {
    const newOptions = newQuestionData.options.filter((_, i) => i !== index);
    setNewQuestionData({ ...newQuestionData, options: newOptions });
  };

  return (
    <div className="container mt-3 mx-2">
      <h2 className="admin-heading">Quiz Questions</h2>
      <ul className="list-group">
        {questions.map((question) => (
          <li key={question.id} className="list-group-item">
            {editQuestionId === question.id ? (
              <form onSubmit={handleUpdate}>
                <div className="row">
                  <div className="mb-3 col-6">
                    <label className="admin-form-label form-label">
                      Question
                    </label>
                    <input
                      type="text"
                      className="admin-form-control form-control"
                      value={newQuestionData.question}
                      onChange={(e) =>
                        setNewQuestionData({
                          ...newQuestionData,
                          question: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <label className="admin-form-label form-label">
                      Answer
                    </label>
                    <input
                      type="text"
                      className="admin-form-control form-control"
                      value={newQuestionData.answer}
                      onChange={(e) =>
                        setNewQuestionData({
                          ...newQuestionData,
                          answer: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="admin-form-label form-label">Options</label>
                  {newQuestionData.options.map((option, index) => (
                    <div key={index} className="input-group mb-2">
                      <input
                        type="text"
                        className="admin-form-control form-control"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeOption(index)}
                        disabled={newQuestionData.options.length === 1}
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
                  <div className="d-flex justify-content-center mt-2">
                  <button type="submit" className="btn admin-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="btn admin-cancel-btn"
                  onClick={() => setEditQuestionId(null)}
                >
                  Cancel
                </button>
                  </div>
              </form>
            ) : (
              <>
                <h5>{question.question}</h5>
                <ul className="list-group mb-3">
                  {question.options.map((option, index) => (
                    <li
                      key={index}
                      className={`list-group-item ${
                        option === question.answer
                          ? "list-group-item-success"
                          : ""
                      }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
                  <div className="d-flex justify-content-between">
                  <div><strong>Answer:</strong> {question.answer}</div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(question)}
                  >
                   <Pencil size={20} color="black"/>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(question.id)}
                  >
                   <Trash size={20} color="black"/> 
                  </button>
                </div>
                  </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewQuizQuestions;
