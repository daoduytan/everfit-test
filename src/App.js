import React from 'react';
import moment from 'moment';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.css';

import Header from './components/header';
import Board from './components/board';
import { ContextProvider } from './context';

moment.updateLocale('en', {
  week: {
    dow: 1, // Monday is the first day of the week.
  },
});

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ContextProvider>
        <div className="App">
          <Header />
          <Board />
        </div>
      </ContextProvider>
    </DndProvider>
  );
}

export default App;
