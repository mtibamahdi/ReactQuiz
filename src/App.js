import { useEffect, useReducer } from 'react';
import Error from './Error';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import FinishScreen from './FinishScreen';
import Progress from './Progress';
import Timer from './Timer';
import Footer from './Footer';

const SECS_PER_QUESTION = 20;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'error':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: SECS_PER_QUESTION * state.questions.length,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case 'restart':
      return {
        ...initialState,
        highScore: state.highScore,
        status: 'ready',
        questions: state.questions,
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };

    default:
      throw new Error('Unknown Action');
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numberOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (init, curr) => init + curr.points,
    0
  );
  console.log(maxPossiblePoints);
  useEffect(function () {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'error' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === 'active' && (
          <>
            <Progress
              numberOfQuestions={numberOfQuestions}
              index={index}
              answer={answer}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <NextButton
                answer={answer}
                dispatch={dispatch}
                numberOfQuestions={numberOfQuestions}
                index={index}
              />
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
