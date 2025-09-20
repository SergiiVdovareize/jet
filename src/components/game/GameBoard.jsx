import React from 'react';
import { Box } from '@chakra-ui/react';
import Shape from './Shape';
import { config } from '../../utils/shapeUtils';

const GameBoard = ({ shapes, targetShape, onShapeClick }) => {
  return (
    <Box>
      <svg width={config.boardWidth} height={config.boardHeight} style={{ border: '2px solid #ccc', borderRadius: '8px' }}>
        {shapes.map((shape) => (
          <Shape
            key={shape.id}
            shape={shape}
            onClick={onShapeClick}
            isTarget={shape.type === targetShape.type && shape.color === targetShape.color}
          />
        ))}
      </svg>
    </Box>
  );
};

export default GameBoard;
