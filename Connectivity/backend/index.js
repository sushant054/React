const express = require('express');
const cors = require('cors');
const app=express();
const PORT = 3000;

app.use(cors());
app.get ("/getData",(req,res)=>{res.send("Hello!");})
 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});