import React from 'react';

export default function ListsView() {
  const MOCK_LISTS = [
    'Inbox',
    'Backlog',
    'Code'
  ]
  const selectedList = MOCK_LISTS[0];
  return (
    <ul>
      {MOCK_LISTS.map(list => <li key={list} className={list === selectedList ? 'text-white' : 'text-slate-200'}>{list}</li>)}
    </ul>
  );
}
