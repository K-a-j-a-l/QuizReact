import React from 'react';

const dummyLeaderboardData = [
    { name: "John", score: 150 },
    { name: "Alice", score: 120 },
    { name: "Bob", score: 110 },
    { name: "Eva", score: 100 },
    { name: "Mike", score: 90 },
  ];

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

const Leaderboard = () => {
  return (
    <div className="leaderboard-container container">
      <h2 className='quiz-title text-center fs-1 mb-2'>Quiz Leaderboard</h2>
      <p className='quiz-desc text-dark fs-5 text-center mb-5 mt-0'>Challenge others with your compeititive abilities.</p>
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
          {dummyLeaderboardData.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
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
