import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { useData } from '../../context';

const DropWrapper = ({ children, date }) => {
  const { onDrop, dates } = useData();

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    canDrop: (item, monitor) => {
      const itemIndex = dates.findIndex((si) => si.date === item.date);
      const datesIndex = dates.findIndex((si) => si.dates === dates);
      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(datesIndex);
    },
    drop: (item, monitor) => {
      onDrop(item, date);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return (
    <div ref={drop} className={'drop-wrapper'}>
      {React.cloneElement(children)}
    </div>
  );
};

DropWrapper.propTypes = {
  children: PropTypes.node,
  date: PropTypes.string,
};

export default DropWrapper;
