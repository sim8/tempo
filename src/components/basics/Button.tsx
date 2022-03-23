import React from 'react';

export default function Button({
  className = '',
  ...buttonProps
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`border-1 border-white rounded-lg px-4 py-2 text-white text-lg ${className}`}
      {...buttonProps}
    />
  );
}
