import React, { useState, useEffect } from 'react';
import { db } from '../config'; // Adjust the path based on your project structure
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const q = query(collection(db, 'quizScores'), orderBy('score', 'desc'), limit(5)); // Adjust limit as needed
        const querySnapshot = await getDocs(q);
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setLeaderboardData(fetchedData);
      } catch (error) {
        console.error('Error fetching leaderboard data: ', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  const calculateGrade = (score) => {
    if (score >= 140) {
      return 'A';
    } else if (score >= 120) {
      return 'B';
    } else if (score >= 100) {
      return 'C';
    } else if (score >= 80) {
      return 'D';
    } else {
      return 'F';
    }
  };

  return (
    <div className="container">
      <h2 className='quiz-title text-center fs-1 mb-2'>Quiz Leaderboard</h2>
      <p className='quiz-desc text-dark fs-5 text-center mb-5 mt-0'>Challenge others with your competitive abilities.</p>
      <table className="table table-striped w-100 mb-5">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.username}</td> {/* Assuming username is stored in Firestore */}
              <td>{player.score}</td>
              <td>{calculateGrade(player.score)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
