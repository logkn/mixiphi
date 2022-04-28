import { IconButton,  } from '@mui/material'
import React from 'react'
import EditableField from './EditableField'
import ClearIcon from '@mui/icons-material/Clear';


function IngredientLine({ingredient, updateIngredient, deleteIngredient}) {

    const changeNameCallback = (new_name) => {
        updateIngredient({name: new_name, index: ingredient.index, abv: ingredient.abv, vol: ingredient.vol})
    }

    const changeABVCallback = (new_abv) => {
        updateIngredient({name: ingredient.name, index: ingredient.index, abv: new_abv, vol: ingredient.vol})
    }

    const changeVolCallback = (new_vol) => {
        updateIngredient({name: ingredient.name, index: ingredient.index, abv: ingredient.abv, vol: new_vol})
    }

    const deleteClicked = () => {
        deleteIngredient(ingredient.index)
    }

return (
    <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 5, marginRight: 5}}>
        
        <div style={{display: 'flex', alignItems: 'center', 'justifyContent': 'space-between'}}>
            <EditableField sx={{display: 'inline'}} value={ingredient.name} placeholder={"Ingredient Name"} callback={changeNameCallback}/>
            <EditableField sx={{display: 'inline', width: '10'}} type="number" value={ingredient.abv} placeholder={"ABV"} callback={changeABVCallback} isNumber={true} trail="%"/>
            <EditableField sx={{display: 'inline'}} type="number" value={ingredient.vol} placeholder={"Liters"} callback={changeVolCallback} isNumber={true} trail="L"/>
        </div>
        <IconButton
            onClick={deleteClicked}
            sx={{marginLeft: 10}}
        >
            <ClearIcon />
        </IconButton>

    </div>
    
  )
}

export default IngredientLine