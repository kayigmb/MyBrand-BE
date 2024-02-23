import { test, it, describe, expect, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app';
import dotenv from 'dotenv';
import { validComments } from '../src/middlewares/valid';

dotenv.config();

const ENV_db_URL = process.env.DATABASE_URL || '';
console.log(ENV_db_URL)
beforeAll(async () => {
    await mongoose.connect(ENV_db_URL);
}, 50000);

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Test apo', () => {
    it('api fro 404', async () => {
        const response = await supertest(app).get('/api/*');
        expect(response.status).toBe(404);
    });
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ZDc2Y2ZiNDE1ZDZhMDhhNTcyNzVhYiIsInVzZXJuYW1lIjoiYWRtaW4xMSIsImFkbWluIjp0cnVlfSwiaWF0IjoxNzA4Njk2MDQ1fQ.6pHhvgzkJRR1YjE8CWi1nbyxxmtqJ8nXwZ339Acv2SQ'

describe('User', () => {

  // it creates a new user and dont touch now 
  it('should register user', async () => {
    const res = await supertest(app).post('/api/signup').send({
     username:"user4444",
     password:"user123234"
    });
    expect(res.statusCode).toBe(200)
  }); 

  it('it should not acceccept same user', async () => {
    const res = await supertest(app).post('/api/signup').send({
      username:"froman",
      password:"fromand123"
     });
     expect(res.statusCode).toBe(401)
  })
  it('it should not accept invalid usename', async () => {
    const res = await supertest(app)
    .post('/api/signup')
    .send({
      username:'',
      password:"fromand123"
     });
     expect(res.body.message).toContain('Usename is missing')
  })
  it('should signin the  user', async () => {
    const res = await supertest(app)
    .post('/api/signin')
    .send({
     username:"froman",
     password:"fromand123"
    });
    expect(res.statusCode)
  }); 

  it('should  SHOW unkown user', async () => {
    const res = await supertest(app).post('/api/signin').send({
     username:"froman668463",
     password:"fromand123"
    });
    expect(res.body.message).toContain('User not found');
  }); 
  it('should  SHOW incorrect password', async () => {
    const res = await supertest(app).post('/api/signin').send({
     username:"froman",
     password:"fromand12"
    });
    expect(res.body.message).toContain('Incorrect password');
  }); 


})

describe('Blog ', () => {    
  it('should show the blogs list', async () => {
    const res = await supertest(app).get('/api/blogs');
   
    expect(res.statusCode).toBe(200);
  });

  it('should view one blog if blog does not exist', async () => {
    const id =  '65d5fa7938ef3716c37fa118'; 
    const res = await supertest(app).get(`/api/blogs/${id}`);
    expect(res.statusCode).toBe(200); 
});



it('should fail to view one blog if blog does not exist', async () => {
  const id = '65d5fa7938ef3716c37fa118';
  const res = await supertest(app).get(`/api/blogs/${id}`);
  expect(res.statusCode).toBe(404); 
});


});




describe('messages', () => {
    it(' should create message', async() => {
      const res = await supertest(app).post('/api/queries').send({
          name: 'test',
          email:'test@example.com',
          content: 'test content'
      })
      expect(res.status).toBe(201)
    })

    
    it('should show all messages', async() => {
        const res = await supertest(app)
        .get('/api/queries')
        .set('Authorization',`Bearer ${token}`)
        expect(res.status).toBe(200)
    })
})


describe('likes', () => {
          const id =  '65d5fa7938ef3716c37fa118'; 
          it('should return the number of likes of a blog',async()=>{
            
            const res = await supertest(app)
            .get(`/api/blogs/${id}/likes`)
            expect(res.statusCode).toBe(200)
          })

          it('should return invalid blog', async () => {
            const res = await supertest(app).get(`/api/blogs/${id}/likes`);
            expect(res.status).toBe(404);
            expect(res.body.error).toBe('Blog not found');
        });


          it('should put a new like', async()=>{
            const res = await supertest(app)
            .put(`/api/blogs/${id}/likes`)
            .set('Authorization',`Bearer ${token}`)
            expect(res.statusCode).toBe(200)
          })
})



describe('Comments',()=>{
  const id =  '65d5fa7938ef3716c37fa118'; 
    it('should return a list of comments', async()=>{
   
      const res =  await supertest(app)
      .get(`/api/blogs/${id}/comments`)
      expect(res.statusCode).toBe(201)
    })

    it('shoudld create a new comment', async()=>{
        const res = await supertest(app)
        .post(`/api/blogs/${id}/comments`)
        .send({
              name:'comment1',
              email:"comment1@example.com",
              comment:'comment1 example here'
        })
        expect(res.statusCode).toBe(201)
    })


}) 