import React, { useState } from 'react';
import AddQuizCategory from '../Components/AddQuizCategory';
import ViewCourses from '../Components/ViewCourses';
import ViewQuizCategories from '../Components/ViewQuizCategories';
import ViewQuizQuestions from '../Components/ViewQuizQuestions';
import AddCourse from '../Components/AddCourse';
import AddQuizQuestion from '../Components/AddQuizQuestion';
import Dashboard from '../Components/Dashboard'; // Import the Dashboard component
import { PersonCircle } from 'react-bootstrap-icons';

function AdminPanel() {
    const [activeComponent, setActiveComponent] = useState('Dashboard'); // Set initial component to Dashboard

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Dashboard':
                return <Dashboard />;
            case 'AddQuizQuestion':
                return <AddQuizQuestion />;
            case 'ViewQuizQuestions':
                return <ViewQuizQuestions />;
            case 'AddQuizCategory':
                return <AddQuizCategory />;
            case 'ViewQuizCategories':
                return <ViewQuizCategories />;
            case 'AddCourse':
                return <AddCourse />;
            case 'ViewCourses':
                return <ViewCourses />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="me-5" style={{ marginTop: "70px" }}>
            <div className="row">
                <div className="col-3 bg-dark px-5" style={{ height: "100vh" }}>
                    <div className='d-flex flex-column justify-content-center align-items-center my-3'>
                        <PersonCircle size={100} color="white" />
                        <p className='text-white fs-3'>John Doe</p>
                    </div>
                    <div className="group">
                        <button onClick={() => setActiveComponent('Dashboard')} className={`group-item group-item-action ${activeComponent==="Dashboard"?"bg-dark text-white":"bg-white text-dark"}`}>
                            Dashboard
                        </button>
                        <button onClick={() => setActiveComponent('AddQuizQuestion')} className={`group-item group-item-action ${activeComponent==="AddQuizQuestion"?"bg-dark text-white":"bg-white text-dark"}`}>
                            Add Quiz Question
                        </button>
                        <button onClick={() => setActiveComponent('ViewQuizQuestions')} className={`group-item group-item-action ${activeComponent==="ViewQuizQuestions"?"bg-dark text-white":"bg-white text-dark"}`}>
                            View Quiz Questions
                        </button>
                        <button onClick={() => setActiveComponent('AddQuizCategory')} className={`group-item group-item-action ${activeComponent==="AddQuizCategory"?"bg-dark text-white":"bg-white text-dark"}`}>
                            Add Quiz Category
                        </button>
                        <button onClick={() => setActiveComponent('ViewQuizCategories')} className={`group-item group-item-action ${activeComponent==="ViewQuizCategories"?"bg-dark text-white":"bg-white text-dark"}`}>
                            View Quiz Categories
                        </button>
                        <button onClick={() => setActiveComponent('AddCourse')} className={`group-item group-item-action ${activeComponent==="AddCourse"?"bg-dark text-white":"bg-white text-dark"}`}>
                            Add Course
                        </button>
                        <button onClick={() => setActiveComponent('ViewCourses')} className={`group-item group-item-action ${activeComponent==="ViewCourses"?"bg-dark text-white":"bg-white text-dark"}`}>
                            View Courses
                        </button>
                    </div>
                </div>
                <div className="col-9">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
