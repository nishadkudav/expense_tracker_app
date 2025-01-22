import express from 'express';
import { addexpensepage, deleteexpensepage, fetchexpensepage, loginactionpage, registeractionpage } from '../controller/authpages.js';

const signinroute = express.Router();
const signuproute = express.Router();
const expenseroute = express.Router();



signinroute
.post('/' , registeractionpage)

signuproute
.post('/', loginactionpage)

expenseroute
.post('/', addexpensepage)
.get('/',fetchexpensepage)
.delete('/:expenseId' , deleteexpensepage)

export{
    signinroute,
    signuproute,
    expenseroute
}