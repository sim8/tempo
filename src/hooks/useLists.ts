import { useReducer, useCallback } from 'react';
import { TodoList, Todo } from '../types';

const INITIAL_STATE = {
  lists: [
    {
      name: 'Inbox',
      todos: [
        'Read emails',
        'Make progress on prototype',
        'Rough structure for presentation',
        'Plan team celebration',
      ],
    },
    {
      name: 'Backlog',
      todos: ['Biggy thinky', 'Rethink org structure'],
    },
  ],
  selectedListIndex: 0,
};

interface ListsState {
  lists: TodoList[];
  selectedListIndex: number;
}

enum ActionType {
  CREATE,
  UPDATE,
  DELETE,
  SELECT,
}

interface Action {
  type: ActionType;
  payload: unknown;
}

function listsReducer(
  state: ListsState,
  { type, payload }: Action
): ListsState {
  switch (type) {
    case ActionType.CREATE: {
      return {
        ...state,
        lists: state.lists.concat(payload as TodoList),
        selectedListIndex: state.lists.length + 1,
      };
    }
    case ActionType.UPDATE: {
      const { index, list } = payload as { index: number; list: TodoList };
      return {
        ...state,
        lists: Object.assign([], state.lists, { [index]: list }),
      };
    }
    case ActionType.DELETE: {
      return {
        ...state,
        lists: state.lists.filter((__value, i) => i !== (payload as number)),
        selectedListIndex: state.selectedListIndex - 1,
      };
    }
    case ActionType.SELECT: {
      return {
        ...state,
        selectedListIndex: payload as number,
      };
    }
    default:
      return state;
  }
}

export default function useLists(): {
  lists: TodoList[];
  selectedListIndex: number;
  onUpdateList: (payload: { index: number; list: TodoList }) => void;
  onCreateList: (list: TodoList) => void;
  onDeleteList: (index: number) => void;
  onSelectList: (index: number) => void;
  onUpdateTodos: (todos: Todo[]) => void;
} {
  const [{ lists, selectedListIndex }, dispatch] = useReducer(
    listsReducer,
    INITIAL_STATE
  );

  const makeAction = (actionType: ActionType) => (payload: unknown) =>
    dispatch({ type: actionType, payload });

  const onUpdateList = makeAction(ActionType.UPDATE);

  /**
   * Helper for updating Todos on TodoList
   */
  const onUpdateTodos = useCallback(
    (todos: Todo[]) => {
      onUpdateList({
        index: selectedListIndex,
        list: {
          ...lists[selectedListIndex],
          todos,
        },
      });
    },
    [onUpdateList, selectedListIndex] // not getting intellisense for missing deps?
  );

  return {
    lists,
    selectedListIndex,
    onUpdateList,
    onCreateList: makeAction(ActionType.CREATE),
    onDeleteList: makeAction(ActionType.DELETE),
    onSelectList: makeAction(ActionType.SELECT),
    onUpdateTodos,
  };
}
