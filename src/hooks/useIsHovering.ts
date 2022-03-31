import React, { useState, useMemo } from 'react';

export default function useIsHovering(): [
  boolean,
  {
    onMouseMove: React.MouseEventHandler;
    onMouseLeave: React.MouseEventHandler;
  }
] {
  const [isHovering, setIsHovering] = useState(false);

  const mouseEventHandlers = useMemo(
    () => ({
      onMouseMove: () => {
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
