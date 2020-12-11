// PostgreSQL Database Queries
import Client from 'pg'
import express from 'express'
import bcrypt from 'bcrypt'
const request = express.request
const response = express.response
const saltRounds = 10


const db_conn_info = {
    host: 'playfield-db.caz3wq73d2qn.eu-central-1.rds.amazonaws.com',
    port: 5432,
    database: 'postgres',
    user: 'karl',
    password: 'RvUVC0gObAlQp74hgnUJ',
    max: 10 // use up to 30 connections

    // "types" - in case you want to set custom type parsers on the pool level
};


function connectDB() {
    var pgClient = new Client.Pool(db_conn_info)

    pgClient.connect((err) => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    })

    return pgClient
}


// GET All users
export function getUsers(request, response) {
    console.log('getUsers');

    var pgClient = connectDB()

    pgClient.query('SELECT * FROM playfield.usr ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        };

        pgClient.end();
        response.status(200).json(results.rows);
    });

}

// GET User by id
export function getUserById(request, response) {
    console.log('getUsersById');
    
    const { id } = request.query;
    var pgClient = connectDB()

    pgClient.query('SELECT * FROM playfield.usr WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        };

        pgClient.end();
        response.status(200).json(results.rows);
    });
};

// GET id by email
export function getUserIdByEmail(request, response) {
    console.log('getUsersIdByEmail');

    const { email } = request.body;
    var pgClient = connectDB()

    pgClient.query('SELECT id FROM playfield.usr WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error;
        };

        pgClient.end();
        response.status(200).json(results.rows);
    });
};

// POST new User
export function createUser(request, response) {
    console.log('createUser');

    const { email, pword } = request.body;
    var pgClient = connectDB()

    let tstamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // temp nickname
    const nickname = 'Kevin';

    bcrypt.hash(pword, saltRounds, function (err, hash) {
        if (err) {
            throw err;
        };
        pgClient.query('INSERT INTO playfield.usr (email, pword, tstamp, nickname) VALUES ($1, $2, $3, $4)', [email, hash, tstamp, nickname], (error, results) => {
            if (error) {
                throw error;
            };

            pgClient.end();
            response.status(201).send('User successfully added');
        });
    })
};

// PUT updated password to User
export function updatePassword(request, response) {
    console.log('updatePassword');

    const { email, pword_old, pword_new } = request.body;
    var pgClient = connectDB()

    pgClient.query('SELECT pword FROM playfield.usr WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error;
        };
        const pword_old_hash = results.rows[0].pword;

        bcrypt.compare(pword_old, pword_old_hash, function (err, result) {
            if (result) {
                bcrypt.hash(pword_new, saltRounds, function (err, hash) {
                    pgClient.query(
                        'UPDATE playfield.usr SET pword = $1 WHERE email = $2',
                        [hash, email],
                        (error, results) => {
                            if (error) {
                                throw error;
                            };

                            pgClient.end();
                            response.status(200).send('Password changed');
                        }

                    );
                })
            }
            else {
                pgClient.end();
                response.status(401).send('Password wrong');
            }
        })
    });
};

// DELETE User
export function deleteUser(request, response) {
    console.log('deleteUser');

    const { email } = request.body;
    var pgClient = connectDB()

    pgClient.query('DELETE FROM playfield.usr WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error;
        };

        pgClient.end();
        response.status(200).send('User deleted with ID: ${id}');
    }
    );
}