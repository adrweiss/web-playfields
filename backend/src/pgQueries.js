// PostgreSQL Database Queries
import Client from 'pg'
const request = Client.request
const response = Client.response

const db_conn_info = {
  host: 'playfield-db.caz3wq73d2qn.eu-central-1.rds.amazonaws.com',
  port: 5432,
  database: 'postgres',
  user: 'karl',
  password: 'RvUVC0gObAlQp74hgnUJ',
  max: 1 // use up to 30 connections

  // "types" - in case you want to set custom type parsers on the pool level
};

const pgClient = new Client.Client(db_conn_info)

pgClient.connect((err) => {
  if (err) {
      console.error('connection error', err.stack)
  } else {
      console.log('connected')
  }
})



// GET All users
export function getUsers (request, response) {
    console.log('Test0')
    pgClient.query('SELECT * FROM playfield.usr ORDER BY id ASC', (error, results)=>{
        console.log('Test1')
        if(error){
            console.log('Test2')
        throw error
    };

    console.log('Test3');

    response.status(200).json(results.rows);
});
}

// GET User by id
export function getUserById (request, response){
    const id = parseInt(request.params.id);

    pgPool.query('SELECT * FROM usr WHERE id = $1', [id], (error, results)=>{
        if(error){
            throw error;
        };

        response.status(200).json(results.rows)
    });
};

// POST new User
export function createUser (request, response) {
    const {email, pword, nickname} = request.body;
    let tstamp = new Date().getTime();

    pgPool.query('INSERT INTO usr (email, pword, tstamp, nickname) VALUES ($1, $2, $3, $4)', [email, pword, tstamp, nickname], (error, results) =>{
        if(error){
            throw error;
        };

        response.status(201).send('User added with ID: ${result.insertId}');
    });
};

// PUT updated data to User
export function updateUser (request, response) {
    const id = parseInt(request.params.id);
    const {email, pword, nickname} = request.body;

    pgPool.query(
        'UPDATE usr SET email = $1, pword = $2, nickname = $3', 
        [email, pword, nickname],
        (error, results) => {
            if(error){
                throw error;
            };

            response.status(200).send('User modified with ID: ${id}');
        }
    );
};

// DELETE User
export function deleteUser (request, response) {
    const id = parseInt(request.params.id);
    
    pgPool.query('DELETE FROM usr WHERE id = $1', [id], (error, results) =>{
        if(error){
            throw error;
        };

        response.status(200).send('User deleted with ID: ${id}');
        }
    );
}


  