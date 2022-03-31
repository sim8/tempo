import React from 'react';
import classNames from 'classnames';
import { TodoList } from '../types';

export default function ListsView({
  lists,
  selectedListIndex,
  onSelect,
}: {
  lists: TodoList[];
  selectedListIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ul className="text-5xl m-20">
      {lists.map(({ name }, index) => {
        const isSelected = index === selectedListIndex;
        return (
          <li
            key={name}
            onClick={() => {
              if (!isSelected) {
                onSelect(index);
              }
            }}
            className={classNames('mb-8 hover:text-white', {
              'text-white': isSelected,
              'text-slate-400': !isSelected,
              'cursor-pointer': !isSelected,
            })}
          >
            {name}
          </li>
        );
      })}
    </ul>
  );
}
