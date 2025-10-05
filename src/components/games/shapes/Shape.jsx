import React from 'react';
import { generatePolygonPoints, getShapeSides, getColorStyle } from '../../../utils/shapeUtils';

const Shape = ({ shape, onClick }) => {
  const { type, color, size, x, y, rotation = 0 } = shape;
  
  const renderShape = () => {
    const centerX = x;
    const centerY = y;
    const { fill, stroke } = getColorStyle(color);
    const strokeWidth = 2;
    
    switch (type) {
      case 'circle': {
        return (
          <circle
            cx={centerX}
            cy={centerY}
            r={size}
            fill={fill}
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
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      }
    }
  };
  
  return (
    <g onClick={() => onClick(shape)} style={{ cursor: 'pointer' }} transform={`rotate(${rotation} ${x} ${y})`} filter="url(#shapeShadow)">
      {renderShape()}
    </g>
  );
};

export default Shape;
