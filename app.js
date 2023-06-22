
const express = require('express');
const app = express();
const ticketRoutes = require('./routers/tickets');
const userRoutes=require('./routers/users')

app.use(express.json());

//login
app.use('/user',userRoutes)

// Use ticket routes
app.use('/api/tickets', ticketRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
