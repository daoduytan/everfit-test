import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import moment from 'moment';
import update from 'immutability-helper';

const initialState = {
  exercises: [],
  week: moment().week() - 1,
};

const initialContext = {
  state: initialState,
  setState: (state) => state,
};

const Context = createContext(initialContext);

const ContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const value = { state, setState };

  useEffect(() => {
    const exercises = JSON.parse(localStorage.getItem('exercises'));
    setState({ ...state, exercises });
  }, []);

  useEffect(() => {
    localStorage.setItem('exercises', JSON.stringify(state.exercises));
  }, [state.exercises]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useData = () => {
  const { state, setState } = useContext(Context);

  const addExercises = (exercise) => {
    const exercises = [...state.exercises, exercise];
    setState({ ...state, exercises });
  };

  const addExercisesItem = (item) => {
    console.log('addExercisesItem', item);
    const { exerciseId } = item;

    const new_exercises = state.exercises.map((exercise) => {
      if (exercise.id === exerciseId) {
        return { ...exercise, items: [...(exercise.items || []), item] };
      }
      return exercise;
    });

    setState({ ...state, exercises: new_exercises });
  };

  const moveExercises = useCallback(
    (dragIndex, hoverIndex) => {
      const dragExercises = state.exercises[dragIndex];

      if (!dragIndex) return null;

      const exercises = update(state.exercises, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragExercises],
        ],
      });

      setState({ ...state, exercises });
    },
    [state, setState]
  );

  const removeExercise = (id) => {
    const exercises = state.exercises.filter((exercise) => exercise.id !== id);

    setState({ ...state, exercises });
  };

  return {
    ...state,
    addExercises,
    addExercisesItem,
    moveExercises,
    removeExercise,
  };
};

export { ContextProvider, useData };
