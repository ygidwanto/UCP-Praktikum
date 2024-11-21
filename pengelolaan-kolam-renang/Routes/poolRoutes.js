const express = require('express');
const router = express.Router();

// Dummy data storage
let pools = [];

// Get all pools
router.get('/', (req, res) => {
  res.status(200).json(pools);
});

// Add a new pool
router.post('/', (req, res) => {
  const { name, location, capacity, status } = req.body;

  // Validate input
  if (!name || !location || typeof capacity !== 'number' || !status) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  // Create new pool
  const newPool = {
    id: pools.length + 1, // Auto-increment ID
    name,
    location,
    capacity,
    status,
  };
  pools.push(newPool);
  res.status(201).json(newPool);
});

// Edit pool data
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, location, capacity, status } = req.body;

  // Find pool by ID
  const poolIndex = pools.findIndex(pool => pool.id === parseInt(id));
  if (poolIndex === -1) {
    return res.status(404).json({ message: 'Pool not found' });
  }

  // Update pool data
  pools[poolIndex] = {
    ...pools[poolIndex],
    name: name || pools[poolIndex].name,
    location: location || pools[poolIndex].location,
    capacity: capacity || pools[poolIndex].capacity,
    status: status || pools[poolIndex].status,
  };

  res.status(200).json(pools[poolIndex]);
});

// Delete pool data
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Find pool by ID
  const poolIndex = pools.findIndex(pool => pool.id === parseInt(id));
  if (poolIndex === -1) {
    return res.status(404).json({ message: 'Pool not found' });
  }

  // Remove pool
  const deletedPool = pools.splice(poolIndex, 1);
  res.status(200).json({ message: 'Pool deleted successfully', deletedPool });
});

module.exports = router;
