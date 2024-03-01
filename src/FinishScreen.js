function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);

  let emoji;
  if (percentage === 100) emoji = '😎';
  if (percentage >= 80 && percentage < 100) emoji = '😁';
  if (percentage >= 50 && percentage < 80) emoji = '😐';
  if (percentage >= 0 && percentage < 50) emoji = '😥';
  if (percentage === 0) emoji = '😫';

  return (
    <div>
      <p className="result">
        {emoji} You Scored {points} out of {maxPossiblePoints} points (
        {percentage}%)
      </p>
      <p className="highscore">(Hight Score:{highScore} )</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quizz
      </button>
    </div>
  );
}

export default FinishScreen;
