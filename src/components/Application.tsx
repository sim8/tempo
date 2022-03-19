import React from 'react';
import ListsView from './ListsView';
import TodosView from './TodosView';

export default function Application () {
  return <div className="flex">
    <div className="bg-gray-800">
      <ListsView />
    </div>
    <div className="bg-indigo-500">
      <TodosView/>
    </div>
  </div>
}
