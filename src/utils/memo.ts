import React from 'react';

/**
 * Utility to create memoized components with custom comparison
 * Helps prevent unnecessary re-renders for better performance
 */

// Simple memo wrapper for functional components
export const memo = <P extends object>(
  Component: React.ComponentType<P>,
  displayName?: string
): React.NamedExoticComponent<P> => {
  const memoized = React.memo(Component);
  if (displayName) {
    memoized.displayName = displayName;
  }
  return memoized;
};

// Memo with shallow prop comparison
export const memoShallow = <P extends object>(
  Component: React.ComponentType<P>,
  displayName?: string
): React.NamedExoticComponent<P> => {
  const memoized = React.memo(Component, (prevProps, nextProps) => {
    const prevKeys = Object.keys(prevProps);
    const nextKeys = Object.keys(nextProps);
    
    if (prevKeys.length !== nextKeys.length) return false;
    
    return prevKeys.every(key => 
      prevProps[key as keyof P] === nextProps[key as keyof P]
    );
  });
  
  if (displayName) {
    memoized.displayName = displayName;
  }
  return memoized;
};

// Memo that ignores function props (useful for components with callbacks)
export const memoIgnoreFunctions = <P extends object>(
  Component: React.ComponentType<P>,
  displayName?: string
): React.NamedExoticComponent<P> => {
  const memoized = React.memo(Component, (prevProps, nextProps) => {
    const prevKeys = Object.keys(prevProps).filter(
      key => typeof prevProps[key as keyof P] !== 'function'
    );
    const nextKeys = Object.keys(nextProps).filter(
      key => typeof nextProps[key as keyof P] !== 'function'
    );
    
    if (prevKeys.length !== nextKeys.length) return false;
    
    return prevKeys.every(key => 
      prevProps[key as keyof P] === nextProps[key as keyof P]
    );
  });
  
  if (displayName) {
    memoized.displayName = displayName;
  }
  return memoized;
};
