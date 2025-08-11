import React from 'react';

export const motion = {
  div: ({ children, ...props }) => React.createElement('div', props, children),
  button: ({ children, ...props }) => React.createElement('button', props, children),
  span: ({ children, ...props }) => React.createElement('span', props, children),
};

export const AnimatePresence = ({ children }) => children;


