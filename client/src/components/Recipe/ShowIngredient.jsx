import React, { useEffect, useState } from 'react';
import axios from 'axios';

import unitConversion from '../../utils/unitConversion';

const ShowIngredient = ({ itemData, ingredientData, setIngredientData }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    axios
      .get('https://pixabay.com/api/?key=14961132-3882de5a02bb912705c80926c&q=' + itemData.food.label + '&image_type=photo&category=food')
      .then(result => {
        setImageSrc(result.data.hits[0].webformatURL);
      })
      .catch(err => console.log(err));
  }, []);
  const removeIngredient = () => {
    const index = ingredientData.indexOf(itemData);
    const dataTemp = ingredientData;

    if (index > -1) {
      dataTemp.splice(index, 1);
      setIngredientData(dataTemp);
    }
  };

  const netCarbs = (
    unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.CHOCDF) - unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.FIBTG)
  ).toFixed(2);

  return (
    <div className="flex-row flex-wrap relative p-4 ">
      <div onClick={removeIngredient} className="absolute m-1 p-1 rounded shadow-md top-0 right-0 hover:bg-red-400 ">
        x
      </div>
      <p className="font-bold ">{itemData.food.label}</p>
      <img className="w-full" src={imageSrc} alt={itemData.food.label} />
      <div className="flex">
        <p>{itemData.amount}</p>
        <p>{itemData.unit}</p>
      </div>

      <p>Calories: {unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.ENERC_KCAL)}</p>
      <p>Protien: {unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.PROCNT)} </p>
      <p>Fat: {unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.FAT)} </p>
      <p>Carbs: {unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.CHOCDF)} </p>
      <p>Fiber: {unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.FIBTG)} </p>
      <p>Net Carbs: {netCarbs} </p>
    </div>
  );
};

export default ShowIngredient;
