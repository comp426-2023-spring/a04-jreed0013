#!/usr/bin/env node

import minimist from 'minimist';
import { rps, rpsls } from "./lib/rpsls.js"
import express from 'express';


const app = express();
app.use(express.json());

// setting the port to be 5000 or whatever was put in by the user
const argv = minimist(process.argv.slice(2));
const port = argv.port || 5000;





// Default undefined endpoint catcher
app.use(function(req, res){
	res.json({"message":"404 NOT FOUND"});
    res.status(404);
});

// endpoint at /app/ returns 200 OK
app.get("/app/", (req, res, next) => {
    res.json({"message":"200 OK"});
	res.status(200);
});

// endpoint at /app/rps/ returns {"player":"(rock|paper|scissors)"}
app.get("/app/rps/", (req, res, next) => {
    res.json(rps());
	res.status(200);
});

// endpoint at /app/rpsls/ returns {"player":"(rock|paper|scissors|lizard|spock)"}
app.get("/app/rpsls/", (req, res, next) => {
    res.json(rpsls());
	res.status(200);
});

// '/app/rps/play/' accepts the correct request bodies
app.get('/app/rps/play/', (req, res) => {   
    res.status(200).send(rps(req.query.shot));
})

app.post('/app/rps/play/', (req, res) => {   
    res.status(200).send(rps(req.body.shot));
})

// /app/rpsls/play/' accepts the correct request bodies
app.get('/app/rpsls/play/', (req, res) => {   
    res.status(200).send(rpsls(req.query.shot));
})

app.post('/app/rpsls/play/', (req, res) => {   
    res.status(200).send(rpsls(req.body.shot));
})

// the endpoint at '/app/rps/play/:shot/' returns the proper shot params
app.get('/app/rps/play/:shot/', (req, res) => {     
    res.status(200).send(rps(req.params.shot));
})

// the endpoint at '/app/rpsls/play/:shot/' returns the proper shot params
app.get('/app/rpsls/play/:shot/', (req, res) => {   
    res.status(200).send(rpsls(req.params.shot));
})


// running the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});