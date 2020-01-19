import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Select from 'react-select'



const edamamBase = 'http://api.edamam.com/auto-complete?q='
const edamamEnd = `limit=10&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`

const selectOptions = [
    {value:'gram', label: 'grams'},
    {value: 'ounce', label: 'ounce'},
    {value: 'cup', label: 'cup'},
    {value: 'teaspoon', label: 'teaspoon'},
    {value: 'tablespoon', label: 'tablespoon'},
    {value: 'pound', label: 'pound'}
]

const AddIngredient = ({setIngredientData, ingredientData, ingredientAddedNotify}) => {
    const [ingredient,setIngredient] = useState('')
    const [amount,setAmount] = useState('')
    const [measurementUnit, setMeasurementUnit] = useState('')
    const [autoCompleteData, setAutoCompleteData] = useState([])
    const [validateWarning, setValidateWarning] = useState('')

    useEffect(() => {
        if(ingredient !== ''){
            axios(edamamBase+ingredient+'&limit=10&app_id=d22c1824&app_key=b5f6e2d07fd95dbe265ba3173fa3643a').then(results => {setAutoCompleteData(results.data) 
        console.log(results.data)

        }).catch(err => console.log(err))
        }
        

    }, [ingredient])
    console.log(process.env.REACT_APP_APP_KEY)
    console.log(process.env.REACT_APP_APP_ID)
    console.log(ingredient)

    const changeHandler = (e) => {
        const value = e.target.value 
        switch(e.target.name){
            case 'ingredient': setIngredient(value)
            break;
            case 'amount': setAmount(value)
            break
            
            default: break
        }
        

    }
    const chooseHandler = e => {
        
        setIngredient(e.currentTarget.dataset.item)
        

    }
    // change the state on measurementUnit with select box 
    const selectHandler = selected => {
        console.log(selected.value)
        setMeasurementUnit(selected.value)
    }

    //  *** Validate Inputs ***
    const isValitdated = () => {
        if(ingredient === '' || amount === '' || measurementUnit ===''){
            return false
        }else {
            return true
        }
    }

    //  *** Clear Inputs ***
    const clearInputs = () => {
        setAmount('')
        setIngredient('')
        setMeasurementUnit('')
    }

    //   *** Add ingredient data to ingredient array  ***
    const ingredientToList = async () => {
        if(isValitdated){
            axios.get('https://api.edamam.com/api/food-database/parser?ingr=' + ingredient + '&app_id=d22c1824&app_key=b5f6e2d07fd95dbe265ba3173fa3643a').then(results => {
                console.log(results.data.hints[0])
                let itemObj = results.data.hints[0]
                itemObj.amount = amount
                itemObj.unit = measurementUnit
                setIngredientData([...ingredientData, itemObj])
                ingredientAddedNotify(ingredient)
                clearInputs()
                

                
                console.log(ingredientData)
            }).catch(err => console.log(err))


        }else{
            setValidateWarning('inputs cannot be blank')
        }
    }

    console.log(autoCompleteData)
    console.log(measurementUnit)
    return (
        <div className='relative'>
        <div className='flex justify-center items-center'>
            <label htmlFor="name" className='p-2'>ingredient</label>
            <input onChange={changeHandler} name='ingredient' value={ingredient} type="text"  className="bg-blue-100 p-2 w-1/2 focus:outline-none"/>
            <label htmlFor='amount' className='p-2'>amount</label>
            <input onChange={changeHandler} name='amount' value={amount} type='number' className='bg-blue-100 p-2 w-1/6'/>
            
            <div className='w-1/4 flex m-2'>
            {/* <label htmlFor='measurement' className='p-2 w-1/2'>Unit</label> */}
            <Select  value={measurementUnit} onChange={selectHandler} label={measurementUnit} options={selectOptions} className='w-full' placeholder='unit' name={measurementUnit}  />
            </div>

            <button onClick={ingredientToList} className='btn bg-green-200 p-2'>add</button>
             
                    
        </div>
        <div className='flex-row flex-wrap showdow-md border border-blue-100'>
        {autoCompleteData.map(item => <p onClick={chooseHandler} className='hover:bg-orange-100 ' key={item} data-item={item}>{item}</p> )}
        </div>
        <div className='absolute bottom-0 left-0 text-red-300'>{validateWarning}</div>
        </div>
    )
}

export default AddIngredient
