import React from 'react';

export default function TodoCard({
  className = '',
  ...divProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center p-4 rounded-lg mb-2 ${className}`}
      {...divProps}
    />
  );
}
