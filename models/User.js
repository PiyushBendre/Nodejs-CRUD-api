const { getPool, sql } = require('../config/database');

class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.created_at = data.created_at;
    }

    // Create a new user
    static async create(userData) {
        try {
            const pool = getPool();
            const request = pool.request();
            
            request.input('name', sql.NVarChar, userData.name);
            request.input('email', sql.NVarChar, userData.email);
            
            const result = await request.query(`
                INSERT INTO users (name, email)
                OUTPUT INSERTED.*
                VALUES (@name, @email)
            `);
            
            return new User(result.recordset[0]);
        } catch (error) {
            throw error;
        }
    }

    // Get all users
    static async findAll() {
        try {
            const pool = getPool();
            const result = await pool.request().query(`
                SELECT id, name, email, created_at
                FROM users
                ORDER BY created_at DESC
            `);
            
            return result.recordset.map(user => new User(user));
        } catch (error) {
            throw error;
        }
    }

    // Get user by ID
    static async findById(id) {
        try {
            const pool = getPool();
            const request = pool.request();
            request.input('id', sql.Int, id);
            
            const result = await request.query(`
                SELECT id, name, email, created_at
                FROM users
                WHERE id = @id
            `);
            
            if (result.recordset.length === 0) {
                return null;
            }
            
            return new User(result.recordset[0]);
        } catch (error) {
            throw error;
        }
    }

    // Update user by ID
    static async updateById(id, updateData) {
        try {
            const pool = getPool();
            const request = pool.request();
            
            request.input('id', sql.Int, id);
            request.input('name', sql.NVarChar, updateData.name);
            request.input('email', sql.NVarChar, updateData.email);
            
            const result = await request.query(`
                UPDATE users
                SET name = @name, email = @email
                OUTPUT INSERTED.*
                WHERE id = @id
            `);
            
            if (result.recordset.length === 0) {
                return null;
            }
            
            return new User(result.recordset[0]);
        } catch (error) {
            throw error;
        }
    }

    // Delete user by ID
    static async deleteById(id) {
        try {
            const pool = getPool();
            const request = pool.request();
            request.input('id', sql.Int, id);
            
            const result = await request.query(`
                DELETE FROM users
                OUTPUT DELETED.*
                WHERE id = @id
            `);
            
            if (result.recordset.length === 0) {
                return null;
            }
            
            return new User(result.recordset[0]);
        } catch (error) {
            throw error;
        }
    }

    // Check if email exists
    static async findByEmail(email) {
        try {
            const pool = getPool();
            const request = pool.request();
            request.input('email', sql.NVarChar, email);
            
            const result = await request.query(`
                SELECT id, name, email, created_at
                FROM users
                WHERE email = @email
            `);
            
            if (result.recordset.length === 0) {
                return null;
            }
            
            return new User(result.recordset[0]);
        } catch (error) {
            throw error;
        }
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            created_at: this.created_at
        };
    }
}

module.exports = User;
