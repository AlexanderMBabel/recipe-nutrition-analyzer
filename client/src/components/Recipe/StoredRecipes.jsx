import React, { useEffect, useState } from 'react';
import firebase from '../../Firebase';

const StoredRecipes = ({ setIngredientData, setAddRecipeShown, setShowImports, setRecipeName, setInstructions }) => {
  const [recipes, setRecipes] = useState([]);
  const db = firebase.firestore();
  useEffect(() => {
    db.collection('recipes')
      .get()
      .then(querySnapshot => {
        const mappedRecipes = querySnapshot.docs.map(doc => {
          return doc.data();
        });
        setRecipes(mappedRecipes);
      })
      .catch(err => console.error(err));
  }, [db]);

  const loadRecipe = recipe => {
    const ingredientsObj = recipe.ingredientsObj;
    //  *** format recipe information  ***
    //  *** Convert ingredient object to array
    const ingredients = Object.keys(ingredientsObj).map(key => ingredientsObj[key]);
    //  *** Load Data ***
    setIngredientData(ingredients);
    setRecipeName(recipe.name);
    setInstructions(recipe.instructions);
    //  *** Show Loaded data and hide import choices
    setAddRecipeShown(true);
    setShowImports(false);
  };

  return (
    <div className="flex flex-wrap">
      {recipes.map(recipe => (
        <div key={recipe.name}>
          <button
            className="btn rounded-full bg-teal-100 p-4 text-sm"
            onClick={() => {
              loadRecipe(recipe);
            }}
          >
            {recipe.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default StoredRecipes;
