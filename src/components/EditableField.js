import { IconButton, TextField, Tooltip, Typography, InputAdornment } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';


function EditableField({value, callback, placeholder, variant, InputProps, isNumber, lead, trail, setback}) {

    const [nanTrigger, setNanTrigger] = useState(false)
    

    const [editOn, setEditOn] = useState(false)
    const [v, setV] = useState(value)

    const valueChange = (val) => {
        setV(val);
    }

    const stopEdit = () => {
        

        if (isNumber && isNaN(parseFloat(v))) {
            setNanTrigger(true);
            if (setback) {
                setEditOn(false);
            }
        }
        else {
            setEditOn(false);
            callback(v);
        }
        

    }

    const keyDown = (e) => {
        if(e.keyCode === 13){
            stopEdit();
         }
    }


  return (
      <div>
          {(editOn || (value === undefined || value === null || value.length === 0))? 
            <div>
                <Tooltip disableFocusListener disableTouchListener open={nanTrigger} title="Not a number">
                    <TextField InputProps={{
                        startAdornment: <InputAdornment position="start">{lead}</InputAdornment>,
                        endAdornment: <InputAdornment position="end">{trail}</InputAdornment>,
                    }} onKeyDown={e => {keyDown(e)}} placeholder={placeholder} onBlur={() => {stopEdit();}} sx={{display: 'inline'}} variant = "standard" onChange={event => valueChange(event.target.value)} defaultValue={value}/> 
                </Tooltip>
            </div>:
            <div>
                <Typography variant={variant} sx={{display: 'inline'}}>{`${lead===undefined?'':lead}${value}${trail===undefined?'':trail}`}</Typography>
                <IconButton sx={{display: 'inline'}} onClick={() => {setEditOn(true)}}>
                    <EditIcon/>
                </IconButton>
                
            </div>
            }
          
      </div>
  )
}

export default EditableField