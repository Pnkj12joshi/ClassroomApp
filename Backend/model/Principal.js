const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const PrincipalSchema = mongoose.Schema({
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            
        },
        role:{
            type:String,
            required:true,  
            default:"principal",
        },

});
// PrincipalSchema.pre("save", async function(next){
//     if(!this.isModefied("password")){
//         return next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// })
const Principaluser = mongoose.model("Principaluser", PrincipalSchema);


module.exports = Principaluser;
