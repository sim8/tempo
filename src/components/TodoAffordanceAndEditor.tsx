import React from 'react';
import useIsHovering from '../hooks/useIsHovering';

export default function TodoAffordanceAndEditor() {
  const [isHovering, mouseEventHandlers] = useIsHovering();
  return <div className="grow relative cursor-pointer" {...mouseEventHandlers}>
          <div className="absolute inset-0"  />
            {isHovering && <div className="flex items-center p-4 bg-slate-700/25 rounded-lg mb-2 border-dashed border-2 border-white">
              <span className="ml-2 text-white">New...</span>
            </div>}
          </div>
}
