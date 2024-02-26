import express,{ Express,Request,Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from  "swagger-ui-express";
import { version } from "../../package.json";
import './logger'

const options: swaggerJSDoc.Options= {
        definition:{
            openapi:"3.0.0",
            info:{
                title:"Swagger",
                version
            },
            components:{
                securitySchemas:{
                    bearerAuth:{
                        type:"http",
                        scheme:"bearer",
                        bearerFormat:"JWT",
                    }
                }
            },
            security:[
                {
                    bearerAuth:[]
                }
            ]
        },
        apis:['./src/routers/routes']
}


const swaggerSpec  =  swaggerJSDoc(options)

function swaggerDoc(app:Express, port:number){
        app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDoc))

        app.get('docs.json',(req:Request,res:Response)=>{
            res.setHeader('Content-Type', 'application/json')
            res.send(swaggerSpec)
            // res.json('This is available at https://localhost:3000/docs.json')

        })
        
}


export {swaggerDoc}