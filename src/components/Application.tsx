import React from 'react';
import ListsView from './ListsView';
import TodosView from './TodosView';

export default function Application () {
  return <main className="h-full flex items-stretch">
    <section className="flex-1 bg-gray-800">
      <ListsView />
    </section>
    <section className="flex-1 bg-indigo-500">
      <TodosView/>
    </section>
  </main>
}
