import React, { useState, useEffect } from 'react';
import AddIngredient from './AddIngredient';
import ShowIngredient from './ShowIngredient';
import NutritionTotals from './NutritionTotals';
import StoredRecipe from './StoredRecipes';
import firebase from '../../Firebase';

const Recipe = () => {
  const [addRecipeShown, setAddRecipeShown] = useState(false);
  const [showImports, setShowImports] = useState(false);
  const [addIngredient, setAddIngredient] = useState(false);
  const [ingredientData, setIngredientData] = useState([]);
  const [addedNotify, setAddedNotify] = useState(false);
  const [removedNotify, setRemovedNotify] = useState(false);
  const [removedItem, setRemovedItem] = useState('');
  const [recentItemAdded, setRecentItemAdded] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');

  //   *** Clear data in form and show recipe ***
  const showAddRecipe = () => {
    setIngredientData([]);
    setRecipeName('');
    setAddRecipeShown(true);
  };

  const addIndredientInput = () => {
    setAddIngredient(true);
  };

  // ***TODO*** compbine ingredientAddedNotify & ingredientRomoveNotify
  const ingredientAddedNotify = ingredient => {
    setRecentItemAdded(ingredient);
    setAddedNotify(true);
    setTimeout(() => {
      setAddedNotify(false);
    }, 2000);
  };

  const ingredientRemoveNotify = ingredient => {
    setRemovedItem(ingredient);
    setRemovedNotify(true);
    setTimeout(() => {
      setRemovedNotify(false);
    }, 2000);
  };

  // *** format Igredients data into object for storage ***
  const formatIngredientData = () => {
    let ingredientsObj = {};
    ingredientData.forEach(item => {
      const label = item.food.label;
      const food = item.food;
      const amount = item.amount;
      const unit = item.unit;
      ingredientsObj[label] = { food, amount, unit };
    });
    return ingredientsObj;
  };

  // *** Add recipe to database ***
  const addToFirestore = () => {
    ingredientAddedNotify(recipeName);
    const db = firebase.firestore();
    const ingredientsObj = formatIngredientData();

    db.collection('recipes')
      .add({
        name: recipeName,
        instructions,
        ingredientsObj
      })
      .then(docRef => console.log('Document written with id: ', docRef.id))
      .catch(err => console.error(err));
  };

  return (
    <div className="flex justify-center items-center font-raleway ">
      <section className=" bg-orange-100 rounded shadow-md relative w-3/4">
        <button className="btn text-sm md:text-md p-1 md:p-4" onClick={showAddRecipe}>
          New Recipe
        </button>
        <button className="btn text-sm md:text-md p-1 md:p-4" onClick={() => setShowImports(true)}>
          Load Saved Recipe
        </button>
        {addedNotify && <div className="absolute top-0 right-0 bg-green-200">{recentItemAdded} added</div>}
        {removedNotify && <div className="absolute top-0 right-0 bg-red-200 ">{removedItem} Removed</div>}
        {showImports && (
          <StoredRecipe
            setIngredientData={setIngredientData}
            setInstructions={setInstructions}
            setRecipeName={setRecipeName}
            setAddRecipeShown={setAddRecipeShown}
            setShowImports={setShowImports}
          />
        )}
        {addRecipeShown && (
          <div className=" flex flex-wrap items-end justify-center  bg-white ">
            <div className="block w-full  p-2 ">
              <label htmlFor="name" className="p-2 w-1/4 ">
                Name
              </label>
              <input type="text" value={recipeName} onChange={e => setRecipeName(e.target.value)} className="bg-blue-100 p-2 input-outline w-full  " />
            </div>

            <div className="md:w-full">
              <AddIngredient ingredientAddedNotify={ingredientAddedNotify} setIngredientData={setIngredientData} ingredientData={ingredientData} />
            </div>
            <div className="w-full flex flex-wrap">
              {ingredientData.map(item => (
                <div key={item.food.label} className="w-1/2 sm:w-1/3 md:w-1/5">
                  <ShowIngredient
                    className=""
                    ingredientData={ingredientData}
                    setIngredientData={setIngredientData}
                    itemData={item}
                    ingredientRemoveNotify={ingredientRemoveNotify}
                  />
                </div>
              ))}
            </div>
            <div className="bg-gray-100 w-1/2">
              <NutritionTotals ingredientData={ingredientData} />
            </div>
            <div className="font-raleway p-2 flex-col flex flex-wrap justify-center items-center w-full">
              <label htmlFor="instructions" className="text-md font-bold">
                Instructions
              </label>
              <textarea value={instructions} onChange={e => setInstructions(e.target.value)} name="instructions" className="p-3 mt-4 bg-blue-100 w-full" rows="4"></textarea>
            </div>

            <button className="btn" onClick={addToFirestore}>
              Save
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Recipe;
