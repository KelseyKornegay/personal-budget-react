
//Also taken from old mongodb assignment. Unsure if this is correct and/or needs to be tweaked//
//I added  "type": "module",  to the package.json file so that it could read the import statements, not sure if this was the right move or not.//

import { Schema, model } from 'mongoose';

const budgetSchema = new Schema({
    title:{
        type:String,
        trim:true,
        required:true,
    },
    budget:{
        type:Number,
        required:true
    },
    color:{
        type:"String",
        validate: {
            validator: function(value) {
              // Using a regular expression to check if the value is a valid hexadecimal color code
              return /^#([A-Fa-f0-9]{6})$/.test(value);
            },
            message: 'Color code must be a valid hexadecimal color code (e.g., "#ED4523").'
        },
        required:true,
        trim:true,
        uppercase:true
    }
},{collection:'budget'})

export default model('budget',budgetSchema)
