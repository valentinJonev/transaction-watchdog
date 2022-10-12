import express from 'express'

export class Router{
    constructor() {
        this.router = express.Router();
    }

    init() {
        this.router.get('/healthcheck', (req, res) => res.send('OK'));
    }
}