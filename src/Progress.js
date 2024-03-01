function Progress({
  numberOfQuestions,
  index,
  answer,
  points,
  maxPossiblePoints,
}) {
  return (
    <header className="progress">
      <progress
        max={numberOfQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>Question {`${index + 1}/${numberOfQuestions}`}</p>
      <p>
        {points}/{maxPossiblePoints} points
      </p>
    </header>
  );
}

export default Progress;
