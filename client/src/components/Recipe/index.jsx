import React,{useState} from 'react'
import AddIngredient from './AddIngredient'
import ShowIngredient from './ShowIngredient'
import NutritionTotals from './NutritionTotals'

const Recipe = () => {
    const [addRecipeShown, setAddRecipeShown] = useState(false)
    const [addIngredient, setAddIngredient] = useState(false)
    const [ingredientData, setIngredientData] = useState([])
    const [addedNotify, setAddedNotify] = useState(false)
    const [recentItemAdded, setRecentItemAdded] = useState('')
    const showAddRecipe = () => {
        setAddRecipeShown(true)
    }
    const addIndredientInput = () => {
        setAddIngredient(true)
    }
    const ingredientAddedNotify = (ingredient) => {
        console.log('fired')
        console.log(ingredient)

        
        setRecentItemAdded(ingredient)
        setAddedNotify(true)
        setTimeout(() => {
            setAddedNotify(false)
        }, 7000);

    }

    
    return (
        <div className='flex justify-center items-center font-raleway '>
            <section style={{height: '50vh', width:'90vw'}} className=' bg-orange-100 rounded shadow-md relative'>
                <button className='btn' onClick={showAddRecipe}> Add a recipe</button>
                <button className='btn'>Import a recipe</button>
                {addedNotify && <div className='absolute top-0 right-0 bg-green-200'>{recentItemAdded} added</div>}
                {addRecipeShown && <div className=' flex flex-wrap items-center justify-center  bg-white p-4' >
                    <div className='flex'>
                    <label htmlFor="name" className='p-4'>Name of Recipe</label>
                    <input type="text" style={{width: '40vw'}} className="bg-blue-100 p-2 focus:outline-none"/>
                    </div>
                    <button className='btn' onClick={addIndredientInput}>new ingredient</button>
                    <div className='w-full flex flex-wrap flex-row'>{ingredientData.map(item => <ShowIngredient ingredientData={ingredientData} setIngredientData={setIngredientData} itemData={item} />)}</div>
                    {addIngredient && <AddIngredient ingredientAddedNotify={ingredientAddedNotify} setIngredientData={setIngredientData} ingredientData={ingredientData}/>}

                    </div>}
                    
            </section>
        </div>
    )
}

export default Recipe
