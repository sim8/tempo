import React from 'react';
import classNames from 'classnames';
import { TodoList } from '../types';
import ListAffordanceAndEditor from './ListAffordanceAndEditor';
import ListNameEditor from './ListNameEditor';
import { EditorType } from './AbstractEditor';

export default function ListsView({
  lists,
  selectedListIndex,
  isCreating,
  isUpdating,
  onUpdate,
  onCreate,
  onDelete,
  onSelect,
  onStartCreating,
  onStartUpdating,
  onStopEditing,
}: {
  lists: TodoList[];
  selectedListIndex: number;
  isCreating: boolean;
  isUpdating: boolean;

  onUpdate: (payload: {
    index: number;
    fieldsToUpdate: Partial<TodoList>;
  }) => void;
  onCreate: (partialList: Partial<TodoList>) => void;
  onDelete: (index: number) => void;
  onSelect: (index: number) => void;
  onStartCreating: () => void;
  onStartUpdating: (index: number) => void;
  onStopEditing: () => void;
}) {
  // TODO just wire up editors, delete action somewhere?
  return (
    <div className="text-5xl m-20 text-white">
      <ul>
        {lists.map(({ name }, index) => {
          const isSelected = index === selectedListIndex;
          return isUpdating && isSelected ? (
            <ListNameEditor
              initialState={name}
              onSave={name => onUpdate({ index, fieldsToUpdate: { name } })}
              onCancel={onStopEditing}
              editorType={EditorType.UPDATE}
            />
          ) : (
            <li
              key={name}
              onClick={() => {
                onSelect(index);
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
      <ListAffordanceAndEditor
        onCreate={onCreate}
        onCancel={onStopEditing}
        onStartCreating={onStartCreating}
        isCreating={isCreating}
      />
    </div>
  );
}
