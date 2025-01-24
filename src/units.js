// Unit conversion factors and definitions
const units = {
  length: {
    m: { name: 'meter', factor: 1 },
    km: { name: 'kilometer', factor: 1000 },
    cm: { name: 'centimeter', factor: 0.01 },
    mm: { name: 'millimeter', factor: 0.001 },
    mi: { name: 'mile', factor: 1609.344 },
    yd: { name: 'yard', factor: 0.9144 },
    ft: { name: 'foot', factor: 0.3048 },
    in: { name: 'inch', factor: 0.0254 }
  },
  mass: {
    kg: { name: 'kilogram', factor: 1 },
    g: { name: 'gram', factor: 0.001 },
    mg: { name: 'milligram', factor: 0.000001 },
    lb: { name: 'pound', factor: 0.45359237 },
    oz: { name: 'ounce', factor: 0.028349523125 }
  },
  volume: {
    l: { name: 'liter', factor: 1 },
    ml: { name: 'milliliter', factor: 0.001 },
    gal: { name: 'gallon', factor: 3.78541178 },
    qt: { name: 'quart', factor: 0.946352946 },
    pt: { name: 'pint', factor: 0.473176473 },
    cup: { name: 'cup', factor: 0.2365882365 }
  },
  temperature: {
    C: { name: 'Celsius' },
    F: { name: 'Fahrenheit' },
    K: { name: 'Kelvin' }
  },
  speed: {
    'ms': { name: 'meters per second', factor: 1 },
    'kmh': { name: 'kilometers per hour', factor: 0.277777778 },
    'mph': { name: 'miles per hour', factor: 0.44704 },
    'kn': { name: 'knot', factor: 0.514444444 }
  },
  area: {
    'm2': { name: 'square meter', factor: 1 },
    'km2': { name: 'square kilometer', factor: 1000000 },
    'cm2': { name: 'square centimeter', factor: 0.0001 },
    'mm2': { name: 'square millimeter', factor: 0.000001 },
    'ha': { name: 'hectare', factor: 10000 },
    'ac': { name: 'acre', factor: 4046.8564224 },
    'ft2': { name: 'square foot', factor: 0.09290304 }
  },
  digital: {
    'B': { name: 'byte', factor: 1 },
    'KB': { name: 'kilobyte', factor: 1024 },
    'MB': { name: 'megabyte', factor: 1048576 },
    'GB': { name: 'gigabyte', factor: 1073741824 },
    'TB': { name: 'terabyte', factor: 1099511627776 }
  }
};

// Special conversion functions for temperature
const tempConvert = {
  'C_to_F': (c) => (c * 9/5) + 32,
  'C_to_K': (c) => c + 273.15,
  'F_to_C': (f) => (f - 32) * 5/9,
  'F_to_K': (f) => (f - 32) * 5/9 + 273.15,
  'K_to_C': (k) => k - 273.15,
  'K_to_F': (k) => (k - 273.15) * 9/5 + 32
};

export function convert(value, fromUnit, toUnit, category) {
  if (category === 'temperature') {
    const conversion = `${fromUnit}_to_${toUnit}`;
    return tempConvert[conversion](value);
  }

  const categoryUnits = units[category];
  if (!categoryUnits) return null;

  const from = categoryUnits[fromUnit];
  const to = categoryUnits[toUnit];
  if (!from || !to) return null;

  return (value * from.factor) / to.factor;
}

export function getUnits(category) {
  return units[category] ? Object.keys(units[category]) : [];
}

export const categories = [
  { id: 'length', name: 'Length', icon: '📏' },
  { id: 'mass', name: 'Weight/Mass', icon: '⚖️' },
  { id: 'volume', name: 'Volume', icon: '🥛' },
  { id: 'temperature', name: 'Temperature', icon: '🌡️' },
  { id: 'speed', name: 'Speed', icon: '🏃' },
  { id: 'area', name: 'Area', icon: '📐' },
  { id: 'digital', name: 'Digital Storage', icon: '💾' }
];