const User = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email } = req.validatedData;
        
        // Check if email already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists',
                data: null
            });
        }
        
        const user = await User.create({ name, email });
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user.toJSON()
        });
    } catch (error) {
        console.error('Error creating user:', error);
        
        // Handle specific database errors
        if (error.code === 'EREQUEST' && error.message.includes('UNIQUE constraint')) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists',
                data: null
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users.map(user => user.toJSON()),
            count: users.length
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const id = req.validatedId;
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: user.toJSON()
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    try {
        const id = req.validatedId;
        const updateData = req.validatedData;
        
        // Check if user exists
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }
        
        // If email is being updated, check if new email already exists
        if (updateData.email && updateData.email !== existingUser.email) {
            const emailExists = await User.findByEmail(updateData.email);
            if (emailExists) {
                return res.status(409).json({
                    success: false,
                    message: 'User with this email already exists',
                    data: null
                });
            }
        }
        
        const updatedUser = await User.updateById(id, updateData);
        
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser.toJSON()
        });
    } catch (error) {
        console.error('Error updating user:', error);
        
        // Handle specific database errors
        if (error.code === 'EREQUEST' && error.message.includes('UNIQUE constraint')) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists',
                data: null
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const id = req.validatedId;
        const deletedUser = await User.deleteById(id);
        
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser.toJSON()
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
