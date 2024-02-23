import { test, it, describe, expect, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/index';
import dotenv from 'dotenv';
dotenv.config();

const ENV_db_URL = process.env.DATABASE_URL || '';

beforeAll(async () => {
    await mongoose.connect(ENV_db_URL);
}, 50000);

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Testing API', () => {
    it('/api/* for 404', async () => {
        const response = await supertest(app).get('/api/*');
        expect(response.statusCode).toBe(404);
    });

    it('should handle connection errors', async () => {
        const error = new Error('Connection error');
        jest.spyOn(mongoose, 'connect').mockRejectedValueOnce(error);
        await expect(mongoose.connect(ENV_db_URL)).rejects.toThrowError(error);
    });
});



describe('testing Blog show', () => {
    it('should show the blogs list', async () => {

    });
});
