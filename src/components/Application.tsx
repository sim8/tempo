import React, { useCallback } from 'react';
import ListsView from './ListsView';
import PersistenceProvider from './PersistenceProvider';
import TodosView from './TodosView';
import useLists from '../hooks/useLists';
import { Todo } from '../types';

export default function Application() {
  const {
    lists,
    selectedListIndex,
    isCreating,
    isUpdating,
    onUpdateList,
    onCreateList,
    onDeleteList,
    onSelectList,
    onStartCreating,
    onStartUpdating,
    onStopEditing,
  } = useLists();

  return (
    <PersistenceProvider>
      <main className="h-full flex items-stretch">
        <section className="flex-1 bg-gray-800">
          <ListsView
            lists={lists}
            selectedListIndex={selectedListIndex}
            isCreating={isCreating}
            isUpdating={isUpdating}
            onUpdate={onUpdateList}
            onCreate={onCreateList}
            onDelete={onDeleteList}
            onSelect={onSelectList}
            onStartCreating={onStartCreating}
            onStartUpdating={onStartUpdating}
            onStopEditing={onStopEditing}
          />
        </section>
        <section className="flex-1 bg-indigo-500">
          {lists[selectedListIndex] && (
            <TodosView
              todos={lists[selectedListIndex].todos}
              onUpdateTodos={todos =>
                onUpdateList({
                  index: selectedListIndex,
                  fieldsToUpdate: { todos },
                })
              }
            />
          )}
        </section>
      </main>
    </PersistenceProvider>
  );
}
