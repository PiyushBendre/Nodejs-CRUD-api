const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const {
    validateUserCreate,
    validateUserUpdate,
    validateId
} = require('../middleware/validation');

// POST /users - Create a new user
router.post('/', validateUserCreate, createUser);

// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - Get user by ID
router.get('/:id', validateId, getUserById);

// PUT /users/:id - Update user by ID
router.put('/:id', validateId, validateUserUpdate, updateUser);

// DELETE /users/:id - Delete user by ID
router.delete('/:id', validateId, deleteUser);

module.exports = router;
