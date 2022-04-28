import './App.css';
import Button from '@mui/material/Button';
import { useState} from 'react';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import DrinkCard from './components/DrinkCard';
import Typography from '@mui/material/Typography';

function App() {

  const [drinks, setDrinks] = useState([]);
 
  const [orderText, setOrderText] = useState(null);




  const getOrder = () => {
    var ingredients = {};
    drinks.forEach(drink => {
      drink.ingredients.forEach(ingr => {
        if (!(ingr.name in ingredients)) {
          ingredients[ingr.name] = 0;
        }
        ingredients[ingr.name] += parseFloat(ingr.vol);
      })
    })
    
    return Object.keys(ingredients).map(ingr => {
      return `${ingr}: ${Math.ceil(ingredients[ingr])}L`
    })
  }

  const showOrderClicked = () => {
    setOrderText(getOrder());
  }

  const addDrinkClicked = () => {
    var newDrinks = [...drinks];
    newDrinks.push({name: "", ingredients: [], index: newDrinks.length});
    setDrinks(newDrinks);
  }

  const getDrinkVolume = (drinkIndex) => {
    const drink = drinks[drinkIndex];
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

  const changeVolume = (drinkIndex, newVolume) => {
    const newDrinks = [...drinks];
    const scale = newVolume / getDrinkVolume(drinkIndex);
    newDrinks[drinkIndex].ingredients = newDrinks[drinkIndex].ingredients.map(ingr => {
      const newIngr = ingr;
      newIngr.vol = Number(newIngr.vol * scale).toFixed(2);
      return newIngr;
    })
    setDrinks(newDrinks);
  }

  const refactorIndexes = (these_drinks) => {
    const newDrinks = these_drinks.map((drink, index) => {
      const newDrink = drink;
      newDrink.index = index;
      newDrink.ingredients = newDrink.ingredients.map((ingr, index2) => {
        const newIngr = ingr;
        ingr.index = index2;
        return newIngr
      })

      return newDrink;
    })
    return newDrinks
  }

  const addIngredient = (drinkIndex) => {
    var newDrinks = [...drinks];
    newDrinks[drinkIndex].ingredients.push({name: "", abv: null, vol: null, index:newDrinks[drinkIndex].ingredients.length})
    setDrinks(newDrinks);
  }

  const drinkNameEdited = (index, new_name) => {
    var newDrinks = [...drinks];
    newDrinks[index] = {name: new_name, index: index, ingredients: newDrinks[index].ingredients}
    setDrinks(newDrinks);
  }

  const editIngredient = (drinkIndex, ingredientIndex, newIngredient) => {
    var newDrinks = [...drinks];
    newDrinks[drinkIndex].ingredients[ingredientIndex] = newIngredient;
    setDrinks(newDrinks);
  }

  const deleteIngredient = (drinkIndex, ingredientIndex) => {
    let newDrinks = [...drinks];
    newDrinks[drinkIndex].ingredients.splice(ingredientIndex, 1);
    setDrinks(refactorIndexes(newDrinks));
  }

  const deleteDrink = (drinkIndex) => {
    let filteredArray = drinks.filter(item => item.index !== drinkIndex);
    let newDrinks = [...filteredArray];
    setDrinks(refactorIndexes(newDrinks));
  }

  

  return (
    <div className="App">
      

      <Dialog open={orderText != null} onClose={() => {setOrderText(null);}}>
        <DialogContent>
          {orderText != null && orderText.map(t => (
            <Typography>{t}</Typography>
          ))}
        </DialogContent>
      </Dialog>

      <div style={{backgroundColor: 'blue', margin: 0, padding: 1}}>
        <h1 style={{color: "white"}}>
          Mixiphi
        </h1>
      </div>

      <div style={{display: 'inline'}}>
        
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <div></div>
          <Button sx={{marginRight: 5}} onClick={showOrderClicked}>Order Form</Button>
        </div>
        <Button  onClick={addDrinkClicked}>Add Drink</Button>
      </div>
      

      {drinks.length === 0 ? <p style={{color: "gray"}}>No drinks added. Click add drink to make a new jungle juice.</p> : <></>}

      <div style={{paddingInline: 10}}>
        {drinks.map(drink => 
          <DrinkCard key={drink.index} drink={drink} drinkNameEdited={drinkNameEdited} editIngredient={editIngredient} addIngredient={addIngredient} deleteDrink={deleteDrink} deleteIngredient={deleteIngredient} changeVolume={changeVolume}/>
        )}
      </div>
      
      
    </div>
  );
}

export default App;
