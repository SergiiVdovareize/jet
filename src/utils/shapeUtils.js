// Utility function to generate polygon points for any n-sided shape
export const config = {
  boardWidth: 600,
  boardHeight: 400,
  maxShapes: 10,
  maxAttempts: 100
}

export const generatePolygonPoints = (sides, size = 50, centerX = 0, centerY = 0) => {
  const points = [];
  const angleStep = (2 * Math.PI) / sides;
  
  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep - Math.PI / 2; // Start from top
    const x = centerX + size * Math.cos(angle);
    const y = centerY + size * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  
  return points.join(' ');
};

// Get number of sides for polygon shapes
export const getShapeSides = (shapeType) => {
  const sidesMap = {
    triangle: 3,
    square: 4,
    pentagon: 5,
    hexagon: 6,
    heptagon: 7,
    octagon: 8
  };
  return sidesMap[shapeType] || 3;
};

// Check if two shapes overlap
const shapesOverlap = (shape1, shape2, minDistance = 80) => {
  const distance = Math.sqrt(
    Math.pow(shape1.x - shape2.x, 2) + Math.pow(shape1.y - shape2.y, 2)
  );
  return distance < minDistance;
};

// Check if a shape combination already exists
const shapeCombinationExists = (shapeType, color, existingShapes) => {
  return existingShapes.some(shape => 
    shape.type === shapeType && shape.color === color
  );
};

// Generate a position that doesn't overlap with existing shapes
const generateNonOverlappingPosition = (existingShapes, maxAttempts = 50) => {
  // const gameBoardWidth = 600;
  // const gameBoardHeight = 400;
  const margin = 40; // Keep shapes away from edges
  const minDistance = 60; // Minimum distance between shape centers
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const x = margin + Math.random() * (config.boardWidth - 2 * margin);
    const y = margin + Math.random() * (config.boardHeight - 2 * margin);
    
    const newPosition = { x, y };
    
    // Check if this position overlaps with any existing shape
    const overlaps = existingShapes.some(shape => 
      shapesOverlap(newPosition, shape, minDistance)
    );
    
    if (!overlaps) {
      return newPosition;
    }
  }
  
  // If we can't find a non-overlapping position, return a random one
  return {
    x: margin + Math.random() * (config.boardWidth - 2 * margin),
    y: margin + Math.random() * (config.boardHeight - 2 * margin)
  };
};

// Generate random shape configuration with non-overlapping positions and unique combinations
export const generateRandomShape = (id, existingShapes = []) => {
  const shapes = ['circle', 'triangle', 'square', 'pentagon', 'hexagon', 'heptagon', 'octagon'];
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
  
  let shapeType, color;
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loops
  
  // Try to find a unique shape-color combination
  do {
    shapeType = shapes[Math.floor(Math.random() * shapes.length)];
    color = colors[Math.floor(Math.random() * colors.length)];
    attempts++;
  } while (
    shapeCombinationExists(shapeType, color, existingShapes) && 
    attempts < maxAttempts
  );
  
  // If we couldn't find a unique combination, use the last generated one
  // This can happen if we have many shapes and limited combinations
  
  const size = 25 + Math.random() * 15; // Random size between 25-40
  
  // Generate non-overlapping position
  const position = generateNonOverlappingPosition(existingShapes);
  
  return {
    id,
    type: shapeType,
    color,
    size,
    x: position.x,
    y: position.y
  };
};

// Generate initial game state with non-overlapping shapes and unique combinations
export const generateGameState = () => {
  const { shapes, targetShape } = generateNewRound();
  
  return {
    shapes,
    targetShape,
    score: 0,
    timeLeft: 30,
    gameActive: true,
    difficulty: 1
  };
};

// Generate new shapes for a round with non-overlapping positions and unique combinations
export const generateNewRound = () => {
  const shapes = [];
  
  // Generate 6 shapes with non-overlapping positions and unique combinations
  for (let i = 0; i < config.maxShapes; i++) {
    const newShape = generateRandomShape(i, shapes);
    shapes.push(newShape);
  }
  
  const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
  
  return { shapes, targetShape };
};
