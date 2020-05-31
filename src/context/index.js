import React, { createContext, useState, useContext, useEffect } from 'react';
import moment from 'moment';

import days from './days';

const initialState = {
  exercises: [],
  week: moment().week(),
  dates: [],
  loading: true,
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
    setState({ ...state, loading: true });
    const weekStart = moment().year(2020).week(state.week).startOf('isoweek');

    let ds = [];

    for (let index = 0; index <= 6; index += 1) {
      const dateValue = moment(weekStart)
        .add(index, 'days')
        .format('DD/MM/YYYY');

      ds = [...ds, dateValue];
    }
    const dates = days.map((day, index) => ({ ...day, date: ds[index] }));

    setState({ ...state, dates, loading: false });
  }, [state.week]);

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

  const moveExercises = (dragIndex, hoverIndex) => {
    const item = state.exercises[dragIndex];

    const newItems = state.exercises.filter((i, idx) => idx !== dragIndex);

    newItems.splice(hoverIndex, 0, item);

    setState({ ...state, exercises: newItems });
  };

  const onDrop = (item, date) => {
    const newItems = state.exercises
      .filter((i) => i.id !== item.id)
      .concat({ ...item, day: date });

    setState({ ...state, exercises: newItems });
  };

  const removeExercise = (id) => {
    const exercises = state.exercises.filter((exercise) => exercise.id !== id);

    setState({ ...state, exercises });
  };

  const setWeek = (week) => {
    setState({ ...state, week });
  };

  return {
    ...state,
    addExercises,
    addExercisesItem,
    moveExercises,
    removeExercise,
    setWeek,
    onDrop,
  };
};

export { ContextProvider, useData };
