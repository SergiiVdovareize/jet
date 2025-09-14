import React from 'react';
import { generatePolygonPoints, getShapeSides } from '../../utils/shapeUtils';

const Shape = ({ shape, onClick, isTarget }) => {
  const { type, color, size, x, y } = shape;
  
  const renderShape = () => {
    const centerX = x;
    const centerY = y;
    
    switch (type) {
      case 'circle': {
        return (
          <circle
            cx={centerX}
            cy={centerY}
            r={size}
            fill={color}
            // stroke={isTarget ? 'black' : 'transparent'}
            // strokeWidth={isTarget ? 3 : 0}
          />
        );
      }
      default: {
        const sides = getShapeSides(type);
        const points = generatePolygonPoints(sides, size, centerX, centerY);
        return (
          <polygon
            points={points}
            fill={color}
            // stroke={isTarget ? 'black' : 'transparent'}
            // strokeWidth={isTarget ? 3 : 0}
          />
        );
      }
    }
  };
  
  return (
    <g onClick={() => onClick(shape)} style={{ cursor: 'pointer' }}>
      {renderShape()}
    </g>
  );
};

export default Shape;
