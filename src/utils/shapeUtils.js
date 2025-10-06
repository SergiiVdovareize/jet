// Utility function to generate polygon points for any n-sided shape
export const config = {
  boardWidth: 328,
  boardHeight: 544,
  maxShapes: 10,
  maxAttempts: 100
}

// Calculate responsive shape size based on screen dimensions
export const getResponsiveShapeSize = (baseSize = 30) => {
  return baseSize;
  // // Mobile breakpoints
  // const screenWidth = window.innerWidth;
  // if (screenWidth <= 480) {
  //   // Small mobile devices - larger shapes for better touch interaction
  //   return baseSize * 2;
  // } else if (screenWidth <= 768) {
  //   // Medium mobile devices/tablets
  //   return baseSize * 1.8;
  // } else if (screenWidth <= 1024) {
  //   // Small tablets/large phones
  //   return baseSize * 1.4;
  // } else {
  //   // Desktop - use base size
  //   return baseSize;
  // }
}

export const generatePolygonPoints = (sides, size = getResponsiveShapeSize(50), centerX = 0, centerY = 0) => {
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

// getDarkerColor removed; use explicit stroke values in COLOR_CONFIG

// Centralized color configuration
export const COLOR_CONFIG = {
  red:    { name: 'червоний',     circleName: 'червоне',     fill: '#ff0000', stroke: '#cc0000' },
  blue:   { name: 'синій',        circleName: 'синє',        fill: '#0000ff', stroke: '#0000b3' },
  green:  { name: 'зелений',      circleName: 'зелене',      fill: '#00ff00', stroke: '#00b300' },
  yellow: { name: 'жовтий',       circleName: 'жовте',       fill: '#ffff00', stroke: '#b3b300' },
  purple: { name: 'фіолетовий',   circleName: 'фіолетове',   fill: '#800080', stroke: '#4d004d' },
  orange: { name: 'помаранчевий', circleName: 'помаранчеве', fill: '#ffa500', stroke: '#cc8400' },
  pink:   { name: 'рожевий',      circleName: 'рожеве',      fill: '#ffc0cb', stroke: '#cc99a3' },
  cyan:   { name: 'блакитний',    circleName: 'блакитне',    fill: '#00ffff', stroke: '#00b3b3' },
  teal:   { name: 'бірюзовий',    circleName: 'бірюзове',    fill: '#008080', stroke: '#005959' },
  lime:   { name: 'лаймовий',     circleName: 'лаймове',     fill: '#32cd32', stroke: '#279b27' },
  brown:  { name: 'коричневий',   circleName: 'коричневе',   fill: '#8b4513', stroke: '#5e2f0d' }
};

export const getColorStyle = (colorName) => {
  const entry = COLOR_CONFIG[colorName];
  if (entry) return entry;
  // Fallback: assume provided value is a color
  return { name: colorName, fill: colorName, stroke: colorName };
};

// Centralized shape configuration with sides and i18n names
export const SHAPE_CONFIG = {
  circle:   { sides: null, name: 'коло' },
  triangle: { sides: 3,    name: 'трикутник' },
  square:   { sides: 4,    name: 'квадрат' },
  pentagon: { sides: 5,    name: "п'ятикутник" },
  hexagon:  { sides: 6,    name: 'шестикутник' },
  heptagon: { sides: 7,    name: 'семикутник' },
  octagon:  { sides: 8,    name: 'восьмикутник' }
};

// Get number of sides for polygon shapes
export const getShapeSides = (shapeType) => {
  return (SHAPE_CONFIG[shapeType] && SHAPE_CONFIG[shapeType].sides) || 3;
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
const generateNonOverlappingPosition = (existingShapes, boardConfig, maxAttempts = 50) => {
  const margin = 40; // Keep shapes away from edges (increased for larger board)
  const minDistance = 80; // Minimum distance between shape centers (increased for better spacing)
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const x = Math.floor(margin + Math.random() * (boardConfig.width - 2 * margin));
    const y = Math.floor(margin + Math.random() * (boardConfig.height - 2 * margin));

    const newPosition = { x, y };
    
    // const overlaps = false
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
    x: Math.floor(margin + Math.random() * (boardConfig.width - 2 * margin)),
    y: Math.floor(margin + Math.random() * (boardConfig.height - 2 * margin))
  };
};

// Generate random shape configuration with non-overlapping positions and unique combinations
export const generateRandomShape = (id, existingShapes = [], boardConfig) => {
  const shapes = Object.keys(SHAPE_CONFIG);
  const colors = Object.keys(COLOR_CONFIG);
  
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
  
  // Calculate responsive base size
  const baseSize = 30 + Math.random() * 20; // Random base size between 30-50
  const size = getResponsiveShapeSize(baseSize); // Apply responsive scaling
  
  // Generate non-overlapping position
  const position = generateNonOverlappingPosition(existingShapes, boardConfig);
  
  return {
    id,
    type: shapeType,
    color,
    size,
    x: position.x,
    y: position.y,
    rotation: Math.floor(Math.random() * 360)
  };
};

// Generate initial game state with non-overlapping shapes and unique combinations
export const generateGameState = (boardConfig) => {
  const { shapes, targetShape } = generateNewRound(boardConfig);
  
  return {
    shapes,
    targetShape,
    score: 0,
    timeLeft: 60,
    gameActive: true,
    difficulty: 1
  };
};

// Generate new shapes for a round with non-overlapping positions and unique combinations
export const generateNewRound = (boardConfig) => {
  const shapes = [];
  
  // Generate 6 shapes with non-overlapping positions and unique combinations
  for (let i = 0; i < config.maxShapes; i++) {
    const newShape = generateRandomShape(i, shapes, boardConfig);
    shapes.push(newShape);
  }
  
  const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
  
  return { shapes, targetShape };
};

// Returns a localized label for a given shape like "green triangle"
export const getLocalizedShapeName = (shape) => {
  const shapeLabel = (SHAPE_CONFIG[shape.type] && SHAPE_CONFIG[shape.type].name) || shape.type;
  const colorNamesEntry = COLOR_CONFIG[shape.color];
  const colorProp = shape.type === 'circle' ? (colorNamesEntry.circleName || colorNamesEntry.name) : colorNamesEntry.name;
  return `${colorProp} ${shapeLabel}`;
};
