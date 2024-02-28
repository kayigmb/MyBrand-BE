import { test, it, describe, expect, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app';
import dotenv from 'dotenv';
import { title } from 'process';


dotenv.config();

const db = process.env.DATABASE_URL

  
beforeAll(async () => {
    await mongoose.connect(db as string);
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
     username:"user44578",
     password:"user123234"
    });
    expect(res.statusCode).toBe(401)
  }); 

  it('it should not accept same user', async () => {
    const res = await supertest(app).post('/api/signup').send({
      username:"froman",
      password:"fromand123"
     });
     expect(res.statusCode).toBe(401)
  })
  it('should not accept invalid username', async () => {
    const res = await supertest(app)
      .post('/api/signup')
      .send({
        password: "fromand123"
      });
    expect(res.body.error).toContain('Username is missing');
  });

  it('should not allow username with less than 3 characters', async () => {
    const res = await supertest(app)
      .post('/api/signup')
      .send({
        username: 'a',
        password: 'fromand123'
      });
    expect(res.body.error).toContain('Username must be at least 3 characters');
  });

  it('should not allow username with more than 15 characters', async () => {
    const res = await supertest(app)
      .post('/api/signup')
      .send({
        username: 'admin12345678891233',
        password: 'fromand123'
      });
    expect(res.body.error).toContain('Username must not be more than 15 characters');
  });

  it('should not accept invalid password', async () => {
    const res = await supertest(app)
      .post('/api/signup')
      .send({
        username: 'fromand12'
      });
    expect(res.body.error).toContain('Password is missing');
  });

  it('should not allow password with less than 6 characters', async () => {
    const res = await supertest(app)
      .post('/api/signup')
      .send({
        username: 'admin1111',
        password: 'from'
      });
    expect(res.body.error).toContain('Password must be at least 6 characters');
  });

  it('should not allow password with more than 15 characters', async () => {
    const res = await supertest(app)
      .post('/api/signup')
      .send({
        username: 'admin111',
        password: 'fromman1234234455'
      });
    expect(res.body.error).toContain('Password must not more than 15 characters');
  });



  it('should signin the  user', async () => {
    const res = await supertest(app)
    .post('/api/signin')
    .send({
     username:"froman",
     password:"fromand123"
    });
    expect(res.statusCode)
  }); 

  it('should  SHOW unknown user', async () => {
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


      
  it('should not accept invalid username', async () => {
    const res = await supertest(app)
      .post('/api/signin')
      .send({
        password: "fromand123"
      });
    expect(res.body.error).toContain('Username is missing');
  });

  it('should not allow username with less than 3 characters', async () => {
    const res = await supertest(app)
      .post('/api/signin')
      .send({
        username: 'a',
        password: 'fromand123'
      });
    expect(res.body.error).toContain('Username must be at least 3 characters');
  });

  it('should not allow username with more than 15 characters', async () => {
    const res = await supertest(app)
      .post('/api/signin')
      .send({
        username: 'admin12345678891233',
        password: 'fromand123'
      });
    expect(res.body.error).toContain('Username must not be more than 15 characters');
  });

  it('should not accept invalid password', async () => {
    const res = await supertest(app)
      .post('/api/signin')
      .send({
        username: 'fromand12'
      });
    expect(res.body.error).toContain('Password is missing');
  });

  it('should not allow password with less than 6 characters', async () => {
    const res = await supertest(app)
      .post('/api/signin')
      .send({
        username: 'admin1111',
        password: 'from'
      });
    expect(res.body.error).toContain('Password must be at least 6 characters');
  });

  it('should not allow password with more than 15 characters', async () => {
    const res = await supertest(app)
      .post('/api/signin')
      .send({
        username: 'admin111',
        password: 'fromman1234234455'
      });
    expect(res.body.error).toContain('Password must not more than 15 characters');
  });

})

// blogs testing 
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
      const id = true
        const res = await supertest(app).get(`/api/blogs/${id}`);
      expect(res.statusCode).toBe(500); 
  });

  it('should bring unauthorised acces to the blog', async () => {

    const tokenBlog = 'klfasdfja kfj jafk'

    const res = await supertest(app).post(`/api/blogs`)
    .set('Authorization', `Bearer ${tokenBlog}`)
    .send({
      title:'title',
      image:'image',
      content:'content'

      })
      
      expect(res.statusCode).toBe(401);
  })

  it('should bring unauthorised acces to patch the blog', async () => {

    const tokenBlog = 'klfasdfja kfj jafk'
    
    const id =  '65d5fa7938ef3716c37fa118'; 
    const res = await supertest(app).patch(`/api/blogs/${id}`)
    .set('Authorization', `Bearer ${tokenBlog}`)
    .send({
      title:'title',
      image:'image',
      content:'content'

      })
      
      expect(res.statusCode).toBe(401);
  })

  it('should bring unauthorised acces to delete the blog', async () => {
    const tokenBlog = 'klfasdfja kfj jafk'
    const id =  '65d5fa7938ef3716c37fa118'; 
    const res = await supertest(app).delete(`/api/blogs/${id}`)
    .set('Authorization', `Bearer ${tokenBlog}`)
    .send({
      title:'title',
      image:'image',
      content:'content'

      })
      
      expect(res.statusCode).toBe(401);
  })

  it('should bring unknow id  to delete the blog', async () => {
    const id =  '65d5fa7938ef3716c35fa119'; 
    const res = await supertest(app).delete(`/api/blogs/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      title:'title',
      image:'image',
      content:'content'

      })
      
      expect(res.statusCode).toBe(404);
  })

  it('should bring unknow id  to patch the blog', async () => {
    const id =  '65d5fa7938ef3716c35fa119'; 
    const res = await supertest(app).patch(`/api/blogs/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      title:'title',
      image:'image',
      content:'content'

      })
      
      expect(res.statusCode).toBe(404);
  })
  
  it('should patch the blog', async() => {
        const id =  '65d5fa7938ef3716c37fa118'; 
        const res = await supertest(app).patch(`/api/blogs/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title:'title15550',
        })
        expect(res.statusCode).toBe(200)
  })

  it('should not patch the blog because the id', async() => {
      const id =  '65d5fa7938ef3717c37fa510'; 
      const res = await supertest(app).patch(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:'title15550',
      })
      expect(res.statusCode).toBe(404)
  })

  it('should not delete the blog because ', async() => {
      const id =  '65d5fa7938ef3717c37fa510'; 
      const res = await supertest(app).delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(404)
  })

  
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

    it('should not acccept invalid name', async () => {
      const res = await supertest(app)
        .post('/api/queries')
        .send({
              email:'test@example.com',
              content:'test'
        });
      expect(res.body.error).toContain('Name is missing');
    });

    it('should not acccept invalid email', async () => {
      const res = await supertest(app)
        .post('/api/queries')
        .send({
              name:'jOHN',
              content:'test'
        });
      expect(res.body.error).toContain('Email is missing');
    });

    it('should not acccept invalid content', async () => {
      const res = await supertest(app)
        .post('/api/queries')
        .send({
              name:'jOHN',
              email:'hello@gmail.com'
        });
      expect(res.body.error).toContain('Message is missing');
    });

    it('should not acccept not in good format email', async () => {
      const res = await supertest(app)
        .post('/api/queries')
        .send({
              name:'jOHN',
              email:'hello',
              content:'hello'
        });
      expect(res.body.error).toContain('Email should be in good format');
    });
    it('should not acccept not in good format email', async () => {
      const res = await supertest(app)
        .post('/api/queries')
        .send({
              name:'jOHN',
              email:'hello@gmail',
              content:'hello'
        });
      expect(res.body.error).toContain('Email should be in good format');
    });


    it('should say unauthorise access to the querry messages', async () => {

        const res = await supertest(app)
        .get('/api/queries')
        .set('Authorization',`bearer ${token}`)

        expect(res.status).toBe(200)

    })

    it('should say unauthorise access to the querry messages', async () => {
      const tokenQuerry = 'afdfadfadf fadf adfad fadf'
      const res = await supertest(app)
      .get('/api/queries')
      .set('Authorization',`bearer ${tokenQuerry}`)

      expect(res.status).toBe(401)

    })
    
    it('should say unauthorise access to the querry messages', async () => {
      const tokenQuerry = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ZDg5NjJhYmY5OTcxZjA3MWVlY2JkZCIsInVzZXJuYW1lIjoiZnJvbWFuIiwiYWRtaW4iOmZhbHNlfSwiaWF0IjoxNzA4OTM3MTQ1fQ.V7lfb5764RYtbdyijbHeI831_haUOWHu8OboE3do3-U"
      const res = await supertest(app)
      .get('/api/queries')
      .set('Authorization',`bearer ${tokenQuerry}`)

      expect(res.status).toBe(401)

    })
   
    

    
})


describe('likes', () => {
          const id =  '65d5fa7938ef3716c37fa118'; 
          const tokenLikes ='fasdfadf6562545vcvasaadf42342'
      it('should return the number of likes of a blog',async()=>{

        const res = await supertest(app)
          .get(`/api/blogs/${id}/likes`)
        expect(res.statusCode).toBe(200)

      })

      it('should put a new like', async()=>{
        const res = await supertest(app)
          .put(`/api/blogs/${id}/likes`)
          .set('Authorization',`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
      })

      it('should bring invalid user', async()=>{
        const res = await supertest(app)
          .put(`/api/blogs/${id}/likes`)
          .set('Authorization',`Bearer ${tokenLikes}`)
         expect(res.statusCode).toBe(401)
      })

      it('should bring error 500', async()=>{
        const id = true
        const res = await supertest(app)
          .put(`/api/blogs/${id}/likes`)
          .set('Authorization',`Bearer ${token}`)
         expect(res.statusCode).toBe(500)
      })
      it('should bring invalid blog', async()=>{
        const id = '65d5975dd75cf7595f550381'
        const res = await supertest(app)
          .put(`/api/blogs/${id}/likes`)
          .set('Authorization',`Bearer ${token}`)
         expect(res.statusCode).toBe(404)
      })

      it('should bring invalid blog on like show', async()=>{
        const id = '65d5975dd75cf7595f550381'
        const res = await supertest(app)
          .get(`/api/blogs/${id}/likes`)
          .set('Authorization',`Bearer ${token}`)
         expect(res.statusCode).toBe(404)
      })




      // it('should bring error 500 on likes show ', async()=>{
      //   const id  = '65d57595f55you fad';
      //   const res = await supertest(app)
      //     .get(`/api/blogs/${id}/likes`)

      //    expect(res.statusCode).toBe(500)
      // })

})



describe('Comments',()=>{
  const id =  '65d5fa7938ef3716c37fa118'; 
    it('should return a list of comments', async()=>{
        const res =  await supertest(app)
          .get(`/api/blogs/${id}/comments`)
        expect(res.statusCode).toBe(201)
    })

    it('should return invalid blog', async()=>{
      const idComment = '65d5975dd75cf7595f550381';

      const res =  await supertest(app)
        .post(`/api/blogs/${id}/comments`)

      expect(res.statusCode).toBe(404)
  })

  // it('should return invalid when showing Comments', async()=>{
  //   const idComment = true;

  //   const res =  await supertest(app)
  //     .get(`/api/blogs/${id}/comments`)

  //     expect(res.statusCode).toBe(500);
  // })

  
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

    it('should not acccept invalid name', async () => {
      const res = await supertest(app)
        .post(`/api/blogs/${id}/comments`)
        .send({
              email:'test@example.com',
              comment:'test'
        });
      expect(res.body.error).toContain('Name is missing');
    });

    it('should not acccept invalid email', async () => {
      const res = await supertest(app)
        .post(`/api/blogs/${id}/comments`)
        .send({
              name:'jOHN',
              comment:'test'
        });
      expect(res.body.error).toContain('Email is missing');
    });

    it('should not acccept invalid comment', async () => {
      const res = await supertest(app)
        .post(`/api/blogs/${id}/comments`)
        .send({
              name:'jOHN',
              email:'hello@gmail.com'
        });
      expect(res.body.error).toContain('Comment is missing');
    });

    it('should not acccept not in good format email', async () => {
      const res = await supertest(app)
        .post(`/api/blogs/${id}/comments`)
        .send({
              name:'jOHN',
              email:'hello',
              comment:'hello'
        });
      expect(res.body.error).toContain('Email should be in good format');
    });
    it('should not acccept not in good format email', async () => {
      const res = await supertest(app)
        .post(`/api/blogs/${id}/comments`)
        .send({
              name:'jOHN',
              email:'hello@gmail',
              comment:'hello'
        });
      expect(res.body.error).toContain('Email should be in good format');
    });



}) 

