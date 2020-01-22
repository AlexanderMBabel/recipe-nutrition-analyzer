import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const edamamAutocompleteBase = 'http://api.edamam.com/auto-complete?q=';
const edamamIngredientBase = 'https://api.edamam.com/api/food-database/parser?ingr=';

const selectOptions = [
  { value: 'gram', label: 'grams' },
  { value: 'ounce', label: 'ounce' },
  { value: 'cup', label: 'cup' },
  { value: 'teaspoon', label: 'teaspoon' },
  { value: 'tablespoon', label: 'tablespoon' },
  { value: 'pound', label: 'pound' }
];

const AddIngredient = ({ setIngredientData, ingredientData, ingredientAddedNotify }) => {
  const [ingredient, setIngredient] = useState('');
  const [amount, setAmount] = useState('');
  const [measurementUnit, setMeasurementUnit] = useState('');
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [validateWarning, setValidateWarning] = useState('');

  useEffect(() => {
    if (ingredient !== '') {
      axios(edamamAutocompleteBase + ingredient + process.env.REACT_APP_AUTOCOMPLETE_END)
        .then(results => {
          setAutoCompleteData(results.data);
        })
        .catch(err => console.log(err));
    }
  }, [ingredient]);

  const changeHandler = e => {
    const value = e.target.value;
    switch (e.target.name) {
      case 'ingredient':
        setIngredient(value);
        break;
      case 'amount':
        setAmount(value);
        break;

      default:
        break;
    }
  };
  const chooseHandler = e => {
    setAutoCompleteData([]);
    setIngredient(e.currentTarget.dataset.item);
  };
  // change the state on measurementUnit with select box
  const selectHandler = selected => {
    setMeasurementUnit(selected.value);
  };

  //  *** Validate Inputs ***
  const isValitdated = () => {
    if (ingredient === '' || amount === '' || measurementUnit === '') {
      return false;
    } else {
      return true;
    }
  };

  //  *** Clear Inputs ***
  const clearInputs = () => {
    setAmount('');
    setIngredient('');
    setMeasurementUnit('');
  };

  //   *** Add ingredient data to ingredient array  ***
  const ingredientToList = async () => {
    setAutoCompleteData([]);
    if (isValitdated) {
      axios
        .get(edamamIngredientBase + ingredient + process.env.REACT_APP_EDAMAM_END)
        .then(results => {
          let itemObj = results.data.hints[0];
          itemObj.amount = amount;
          itemObj.unit = measurementUnit;
          setIngredientData([...ingredientData, itemObj]);
          ingredientAddedNotify(ingredient);
          clearInputs();
        })
        .catch(err => console.log(err));
    } else {
      setValidateWarning('inputs cannot be blank');
    }
  };

  return (
    <div className="relative">
      <div className="flex  items-center flex-row flex-wrap">
        <div id="ingredient-name" className="w-full p-2">
          <label htmlFor="name" className="p-2">
            Ingredient
          </label>
          <input onChange={changeHandler} name="ingredient" value={ingredient} type="text" className="bg-blue-100 p-2 w-full input-outline " placeholder="swiss cheese" />
        </div>
        <div id="ingredient-amount" className=" w-1/2 p-2">
          <label htmlFor="amount" className="p-2 w-1/4">
            Amount
          </label>
          <input onChange={changeHandler} onFocus={() => setAutoCompleteData([])} name="amount" value={amount} type="number" className="bg-blue-100 p-2 w-full input-outline" />
        </div>
        <div className="w-1/2  flex p-2 ">
          <Select onChange={selectHandler} label={measurementUnit} options={selectOptions} className="w-full align-bottom" placeholder="unit" name={measurementUnit} />
        </div>
        <div className="w-full  flex jusitfy-center">
          <button onClick={ingredientToList} className="btn bg-green-200 p-2 w-full ">
            Add
          </button>
        </div>
      </div>
      <div className="flex-row flex-wrap showdow-md  w-full">
        {autoCompleteData.map(item => (
          <p onClick={chooseHandler} className="hover:bg-orange-100 " key={item} data-item={item}>
            {item}
          </p>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 text-red-300">{validateWarning}</div>
    </div>
  );
};

export default AddIngredient;
