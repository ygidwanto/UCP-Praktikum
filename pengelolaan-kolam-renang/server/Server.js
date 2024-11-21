const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const poolRoutes = require('./Routes/poolRoutes');  

const app = express();
const PORT = 8080 ;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/pools', poolRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
