import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import styles from './Shapes.module.css';
import Shape from './Shape';
// import { config } from '../../utils/shapeUtils';

const GameBoard = ({ shapes, targetShape, onShapeClick, onBoardInitialized, missClick }) => {
  const wrapperRef = useRef(null);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const { offsetWidth, offsetHeight } = wrapperRef.current;
    const boardConfig = {
      width: offsetWidth,
      height: offsetHeight
    }
    setWrapperSize(boardConfig);
  }, [])

  useEffect(() => {
    onBoardInitialized(wrapperSize)
  }, [wrapperSize, onBoardInitialized])

  return (
    <Box 
      className={styles.boardWrapper}
      ref={wrapperRef}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${wrapperSize.width} ${wrapperSize.height}`}
        className={`${styles.boardSvg} ${missClick ? styles.missClick : ''}`}
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
