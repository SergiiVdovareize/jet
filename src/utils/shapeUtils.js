// Utility function to generate polygon points for any n-sided shape
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

// Generate random shape configuration
export const generateRandomShape = (id) => {
  const shapes = ['circle', 'triangle', 'square', 'pentagon', 'hexagon', 'heptagon', 'octagon'];
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
  
  const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = 25 + Math.random() * 30;
  
  return {
    id,
    type: shapeType,
    color,
    size,
    x: 80 + Math.random() * 400, // Random position
    y: 150 + Math.random() * 200
  };
};

// Generate initial game state
export const generateGameState = () => {
  const shapes = Array.from({ length: 6 }, (_, i) => generateRandomShape(i));
  const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
  
  return {
    shapes,
    targetShape,
    score: 0,
    timeLeft: 30,
    gameActive: true,
    difficulty: 1
  };
};
