import React from 'react';
import { generatePolygonPoints, getShapeSides } from '../../../utils/shapeUtils';

const Shape = ({ shape, onClick, isTarget }) => {
  const { type, color, size, x, y, rotation = 0 } = shape;
  
  const renderShape = () => {
    const centerX = x;
    const centerY = y;
    const stroke = isTarget ? 'black' : 'transparent';
    const strokeWidth = isTarget ? 1 : 0
    
    switch (type) {
      case 'circle': {
        return (
          <circle
            cx={centerX}
            cy={centerY}
            r={size}
            fill={color}
            stroke={stroke}
            strokeWidth={strokeWidth}
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
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      }
    }
  };
  
  return (
    <g onClick={() => onClick(shape)} style={{ cursor: 'pointer' }} transform={`rotate(${rotation} ${x} ${y})`}>
      {renderShape()}
    </g>
  );
};

export default Shape;
