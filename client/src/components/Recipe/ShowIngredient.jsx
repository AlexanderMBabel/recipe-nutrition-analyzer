import React from 'react'

const ShowIngredient = ({itemData}) => {

    const unitConversion = (unit, amount, per100) => {
        const gram = per100/100


        
        switch(unit){
            case 'gram': 
                return amount/per100
                
            case 'cup': 
                return ((gram * 226.58824) * amount).toFixed(2) 
                
            case 'teaspoon':
                return  ((gram * 4.26057) * amount).toFixed(2)
            case 'tablespoon':
                return ((gram * 12.7817) * amount).toFixed(2)
            case 'ounce':
                return  ((gram * 28.34952) * amount).toFixed(2)
            case 'pound':
                return ((gram * 453.59237) * amount).toFixed(2)
            default: break

        }

    }

    const netCarbs = (unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.CHOCDF) - unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.FIBTG)).toFixed(2)

    return (
        <div className='flex-row flex-wrap relative p-4'>
            <div className='absolute m-1 p-1 rounded shadow-md top-0 right-0 hover:bg-red-400 '>x</div>
            <p className='font-bold '>{itemData.food.label}</p>
            <div clasName='flex'><p>{itemData.amount}</p>
            <p>{itemData.unit}</p></div>
            
            
            <p>Calories: {unitConversion(itemData.unit, itemData.amount,  itemData.food.nutrients.ENERC_KCAL)}</p>
            <p>Protien: {unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.PROCNT)} </p>
            <p>Fat: {unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.FAT)} </p>
            <p>Carbs: {unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.CHOCDF)} </p>
            <p>Fiber: {unitConversion(itemData.unit, itemData.amount, itemData.food.nutrients.FIBTG)} </p>
            <p>Net Carbs: {netCarbs } </p>
            
            
        </div>
    )
}

export default ShowIngredient
