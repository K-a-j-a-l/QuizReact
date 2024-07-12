import React, { useState, useEffect } from 'react';
import { db } from '../config'; // Your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import Loader from "./Loader";

const Dashboard = () => {
    const [data, setData] = useState({
        courses: 0,
        categories: 0,
        questions: 0,
        users: 0,
        loading: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch courses
                const coursesSnapshot = await getDocs(collection(db, 'quizCourses'));
                const coursesCount = coursesSnapshot.size;

                // Fetch categories
                const categoriesSnapshot = await getDocs(collection(db, 'quizCategories'));
                const categoriesCount = categoriesSnapshot.size;

                // Fetch questions
                const questionsSnapshot = await getDocs(collection(db, 'quizQuestions'));
                const questionsCount = questionsSnapshot.size;

                // Fetch users from leaderboard
                const usersSnapshot = await getDocs(collection(db, 'quizScores'));
                const usersCount = usersSnapshot.size;

                setData({
                    courses: coursesCount,
                    categories: categoriesCount,
                    questions: questionsCount,
                    users: usersCount,
                    loading: false,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setData({ ...data, loading: false });
            }
        };

        fetchData();
    }, []);

    if (data.loading) {
        return <><Loader/></>
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3 col-sm-6">
                    <div className="card text-white bg-primary mb-3" style={{cursor:"pointer"}}>
                        <div className="card-body">
                            <h5 className="card-title fs-2">Courses</h5>
                            <p className="card-text fs-3">{data.courses}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card text-white bg-success mb-3" style={{cursor:"pointer"}}>
                        <div className="card-body">
                            <h5 className="card-title fs-2">Categories</h5>
                            <p className="card-text fs-3">{data.categories}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card text-white bg-warning mb-3" style={{cursor:"pointer"}}>
                        <div className="card-body">
                            <h5 className="card-title fs-2">Questions</h5>
                            <p className="card-text fs-3">{data.questions}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card text-white bg-danger mb-3" style={{cursor:"pointer"}}>
                        <div className="card-body">
                            <h5 className="card-title fs-2">Users</h5>
                            <p className="card-text fs-3">{data.users}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
