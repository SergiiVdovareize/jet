import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Shape from './Shape';
import { config } from '../../utils/shapeUtils';

const GameBoard = ({ shapes, targetShape, onShapeClick, onBoardInitialized }) => {
  const wrapperRef = useRef(null);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });



  // console.log('wrapperRef', wrapperRef.current)

  useEffect(() => {
    const { offsetWidth, offsetHeight } = wrapperRef.current;
    const boardConfig = {
      width: offsetWidth,
      height: offsetHeight
    }
    setWrapperSize(boardConfig);
    // onBoardInitialized(boardConfig)
  }, [])

  useEffect(() => {
    onBoardInitialized(wrapperSize)
  }, [wrapperSize, onBoardInitialized])

  return (
    <Box 
      p={0} 
      width="100%" 
      height="100%" 
      // minHeight={{ base: "300px", md: "400px" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      ref={wrapperRef}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${wrapperSize.width} ${wrapperSize.height}`}
        style={{ 
          border: '2px solid #ccc', 
          borderRadius: '8px',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
        preserveAspectRatio="xMidYMid meet"
      >
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
