import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 3977;

mongoose.connect(
    `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@${ process.env.DB_HOST }/`, (error) => {
        
        if( error ) throw error;
        
        app.listen(PORT, () => {
            console.log('##################')
            console.log('#### API REST ####')
            console.log('##################')
            console.log(`http://${ process.env.IP_SERVER }:${ process.env.PORT }/api/${ process.env.API_VERSION }`)
    
     })
    } 
)

 