#!/usr/bin/env node

import minimist from 'minimist';
import { rps, rpsls } from "./lib/rpsls.js"; // corrected import statement
import express from 'express';


const app = express();
app.use(express.json());

// setting the port to be 5000 or whatever was put in by the user
const argv = minimist(process.argv.slice(2));
const port = argv.port || 5000;

// endpoint at /app/ returns 200 OK
app.get("/app/", (req, res, next) => {
    res.status(200).json({"message":"200 OK"}); 
});

// endpoint at /app/rps/ returns {"player":"(rock|paper|scissors)"}
app.get("/app/rps/", (req, res, next) => {
    const player = rps(); 
    res.status(200).json({player});
});

// endpoint at /app/rpsls/ returns {"player":"(rock|paper|scissors|lizard|spock)"}
app.get("/app/rpsls/", (req, res, next) => {
    const player = rpsls(); 
    res.status(200).json({player});
});

// '/app/rps/play/' accepts the correct request bodies
app.get('/app/rps/play/', (req, res) => {
    const player = rps(req.query.shot);
    res.status(200).send(player);
});

app.post('/app/rps/play/', (req, res) => {
    const player = rps(req.body.shot);
    res.status(200).send(player);
});

// /app/rpsls/play/' accepts the correct request bodies
app.get('/app/rpsls/play/', (req, res) => {
    const player = rpsls(req.query.shot);
    res.status(200).send(player);
});

app.post('/app/rpsls/play/', (req, res) => {
    const player = rpsls(req.body.shot);
    res.status(200).send(player);
});

// the endpoint at '/app/rps/play/:shot/' returns the proper shot params
app.get('/app/rps/play/:shot/', (req, res) => {
    const player = rps(req.params.shot);
    res.status(200).send(player);
});

// the endpoint at '/app/rpsls/play/:shot/' returns the proper shot params
app.get('/app/rpsls/play/:shot/', (req, res) => {
    const player = rpsls(req.params.shot);
    res.status(200).send(player);
});

// Default undefined endpoint catcher
app.use(function(req, res){
    res.status(404).json({"message":"404 NOT FOUND"});
});

// running the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
