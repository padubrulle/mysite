import { createServer } from "node:http";
import { findAll, find, create, remove, update } from "./controller/api/experiences.js"
import { NotFoundError } from "./controller/errors.js";
import { createReadStream } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const server = createServer(async (req, res) => {
    try {
        res.setHeader("Content-Type", "application/json");
        const url = new URL(req.url, `http://${req.headers.url}`)
        const endpoint = `${req.method}:${url.pathname}`
        const id = Number(endpoint.split('/')[2]);
        let results
        switch(endpoint){
            case 'GET:/':
                res.setHeader("Content-Type", "text/html");
                createReadStream(dirname(fileURLToPath(import.meta.url)) +'/vue/index.html').pipe(res)
                return
            case 'GET:/experiences':
                results = await findAll(req,res)
                break
            case `GET:/experiences/${id}`:
                results = await find(req,res,id)  
                break
            case 'POST:/experiences':
                results = await create(req,res)
                break
            case `DELETE:/experiences/${id}`:
                results = await remove(req,res,id)
                break
            case `PUT:/experiences/${id}`:
                results = await update(req,res,id)
                break
            default:
                res.writeHead(404)
        }
        if(results){
            res.write(JSON.stringify(results))
        }
    }catch(e){
        if(e instanceof NotFoundError){
            res.writeHead(404)
        }else{
            throw e
        }
    }
    res.end()
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
})