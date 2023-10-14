const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express')

const db = require('./config/connection')
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());





