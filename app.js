const express         = require('express');
const dotenv          = require('dotenv');
const cors            = require('cors');
const studentRouter   = require("./routes/student.routes");
const adminRouter     = require("./routes/admin.routes");
const companyRouter   = require("./routes/company.routes");
const hrRouter        = require("./routes/hr.routes");

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());

app.options("*",cors());

const port = Number(process.env.PORT || 3000);


//Routes
app.use('/api/v1/students',studentRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/company',companyRouter);
app.use('/api/v1/hr',hrRouter);


app.get('/',(req,res)=>{
    res.send('Welcome to placement management cell')
})


app.all('*',(req,res)=>{
    res.status(404).send('Endpoint not found....');
});

app.listen(port,()=>{
    console.log(`Server up and running on port ${port}`);
});

