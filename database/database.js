const mongoose = require('mongoose')

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
    dbname : "todo-db"
}).then((res)=>{console.log(`Database is connected in  ${res.connection.host}`)})
.catch((err)=>{
    console.log(err);
})
}

module.exports = connectDatabase;