import { Button, Card, CardContent, IconButton, Typography } from '@mui/material'
import React from 'react'
import IngredientLine from './IngredientLine'
import EditableField from './EditableField';
import ClearIcon from '@mui/icons-material/Clear';

function DrinkCard({drink, drinkNameEdited, editIngredient, addIngredient, deleteIngredient, deleteDrink, changeVolume}) {

    const getVolume = () => {
        let totalVol=0.;
        try {
            drink.ingredients.forEach(ingr => {
                let volFl = parseFloat(ingr.vol);
                totalVol += volFl;
            })
            return totalVol;
        }
        catch {
            return NaN
        }
    }

    const getABV = () => {
        let abv=0.;
        let totalVol=0.;
        try {
            drink.ingredients.forEach(ingr => {
                let abvFl = parseFloat(ingr.abv);
                let volFl = parseFloat(ingr.vol);
                abv += abvFl * volFl;
                totalVol += volFl;
            })
            return abv/totalVol;
        }
        catch {
            return NaN
        }
    }

    const volumeChanged = (vol) => {
        try {
            const volFl = parseFloat(vol);
            if (!isNaN(volFl)) {
                changeVolume(drink.index, volFl);
            }

        }
        catch {
            alert("bad")
        }
    }


    const addIngredientClicked = () => {
        addIngredient(drink.index)
    }

    const deleteClicked = () => {
        deleteDrink(drink.index)
    }

  return (
    <div>

    <Card sx={{'margin': 10}}>
        <CardContent>
            


            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <EditableField variant={"h6"} value={drink.name} placeholder={"Drink Name"} callback={x => drinkNameEdited(drink.index, x)}/>
                <IconButton
                    onClick = {deleteClicked}
                >
                    <ClearIcon />
                </IconButton>
            </div>
            <Button onClick={addIngredientClicked}>Add Ingredient</Button>

            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', 'alignItems': 'center'}}>
            {drink.ingredients.map(ingr => 
                <IngredientLine key={ingr.index} ingredient={ingr} updateIngredient={x=>editIngredient(drink.index, ingr.index, x)} deleteIngredient={deleteIngredient}/>
            )}
            </div>
            

            {!isNaN(getABV()) && <Typography>{`Total ABV: ${Number((getABV()).toFixed(1))}%`}</Typography>}
            {!isNaN(getVolume()) && getVolume() > 0 && <EditableField value={Number((getVolume()).toFixed(1))} lead="Total Volume: "trail="L" placeholder="Liters" isNumber callback = {volumeChanged} setback/>}
        </CardContent>
        
    </Card>
    </div>

  )
}

export default DrinkCard