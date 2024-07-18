import React from 'react';

interface Grid2Props {
  children: React.ReactNode;
}

const Grid2: React.FC<Grid2Props> = ({ children }) => {
  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {children}
    </div>
  );
};

export default Grid2;