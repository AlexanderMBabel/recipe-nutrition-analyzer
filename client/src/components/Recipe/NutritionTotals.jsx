import React from 'react';
import unitConversion from '../../utils/unitConversion';

const NutritionTotals = ({ ingredientData }) => {
  const getTotal = nutrient => {
    if (ingredientData.length > 1) {
      return ingredientData
        .map(item => {
          const convertedItem = Math.ceil(unitConversion(item.unit, item.amount, item.food.nutrients[nutrient]));

          return +convertedItem || 0;
        })
        .reduce((iter, current) => {
          return iter + current;
        });
    }
  };

  // const nanToZero = num => {
  //   if (isNaN(num)) {
  //     return 0;
  //   } else {
  //     return num;
  //   }
  // };

  const nutrients = {
    calories: getTotal('ENERC_KCAL'),
    protien: getTotal('PROCNT'),
    fat: getTotal('FAT'),
    carbs: getTotal('CHOCDF'),
    fiber: getTotal('FIBTG')
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center font-lara">
        <div className="  bg-white p-2">
          <p className="text-lg">{nutrients.calories}</p>
          <p>Calories</p>
        </div>
        <div className="bg-teal-100 p-2">
          <p className="text-lg ">{nutrients.protien}</p>
          <p>Protien</p>
        </div>
        <div className="bg-white p-2 ">
          <p className="text-lg ">{nutrients.fat}</p>
          <p>Fat</p>
        </div>
        <div className="bg-indigo-100 p-2">
          <p className="text-lg ">{nutrients.carbs}</p>
          <p>carbs</p>
        </div>
        <div className="bg-white p-2">
          <p className="text-lg">{nutrients.fiber}</p>
          <p>Fiber</p>
        </div>
      </div>
    </div>
  );
};

export default NutritionTotals;
