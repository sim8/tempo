import React, { useState, useMemo } from 'react';

export default function useIsHovering(): [
  boolean,
  {
    onMouseEnter: React.MouseEventHandler;
    onMouseLeave: React.MouseEventHandler;
  }
] {
  const [isHovering, setIsHovering] = useState(false);

  const mouseEventHandlers = useMemo(
    () => ({
      onMouseEnter: () => {
        setIsHovering(true);
      },
      onMouseLeave: () => {
        setIsHovering(false);
      },
    }),
    []
  );

  return [isHovering, mouseEventHandlers];
}
