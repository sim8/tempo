import React from 'react';
import ListsView from './ListsView';
import PersistenceProvider from './PersistenceProvider';
import TodosView from './TodosView';
import useLists from '../hooks/useLists';

export default function Application() {
  const {
    lists,
    selectedListIndex,
    onUpdateList,
    onCreateList,
    onDeleteList,
    onSelectList,
  } = useLists();
  return (
    <PersistenceProvider>
      <main className="h-full flex items-stretch">
        <section className="flex-1 bg-gray-800">
          <ListsView
            lists={lists}
            selectedListIndex={selectedListIndex}
            onSelect={onSelectList}
          />
        </section>
        <section className="flex-1 bg-indigo-500">
          <TodosView
            todos={lists[selectedListIndex] && lists[selectedListIndex].todos}
          />
        </section>
      </main>
    </PersistenceProvider>
  );
}
