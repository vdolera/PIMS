const express = require("express");
const cors = require("cors");



const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors({ 
    origin: ["http://localhost:3001"],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['content-type']    
}));



const inventoryRoutes = require('./routes/api/inventoryRoutes');
app.use('/inventory', inventoryRoutes);

// Server Start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





