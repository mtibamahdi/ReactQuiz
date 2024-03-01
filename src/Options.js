function Option({ questions, dispatch, answer }) {
  const hasAnswred = answer !== null;
  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswred
              ? index === questions.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          disabled={hasAnswred}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
