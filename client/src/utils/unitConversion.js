const unitConversion = (unit, amount, per100) => {
  const gram = per100 / 100;

  switch (unit) {
    case 'gram':
      return amount / per100;

    case 'cup':
      return (gram * 226.58824 * amount).toFixed(2);

    case 'teaspoon':
      return (gram * 4.26057 * amount).toFixed(2);
    case 'tablespoon':
      return (gram * 12.7817 * amount).toFixed(2);
    case 'ounce':
      return (gram * 28.34952 * amount).toFixed(2);
    case 'pound':
      return (gram * 453.59237 * amount).toFixed(2);
    default:
      break;
  }
};

export default unitConversion;
