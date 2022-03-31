import { useReducer } from 'react';
import { TodoList } from '../types';

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
    default:
      return state;
  }
}

export default function useLists() {
  const [lists, dispatch] = useReducer(listsReducer, INITIAL_STATE);

  const makeAction = (actionType: ActionType) => (payload: unknown) =>
    dispatch({ type: actionType, payload });

  return {
    lists,
    onUpdateList: makeAction(ActionType.UPDATE),
    onCreateList: makeAction(ActionType.CREATE),
    onDeleteList: makeAction(ActionType.DELETE),
  };
}
