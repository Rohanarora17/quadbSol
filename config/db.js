const { Client } = require('pg');
require('dotenv').config();

class PgDb {

    constructor() {
        this.Client = this.connection();
    }

    connection() {
        const Conn = new Client({
            host: process.env.HOST,
            user: process.env.USER,
            port: process.env.PORT,
            password: process.env.PASSWORD,
            database: process.env.DB
        });

        //connect
        Conn.connect();
        return Conn;
    }
}

const insert= (Client,id,name, last, bs, volume, base_unit) => {
        Client.query(`
        INSERT INTO List(id, name, last, bs, volume, base_unit)
        VALUES ('${id}', '${name}', '${last}', '${bs}', '${volume}', '${base_unit}')
        ON CONFLICT (id) 
        DO UPDATE SET 
        name = '${name}', last = '${last}', bs = '${bs}', volume = '${volume}', base_unit = '${base_unit}'
        WHERE List.id = '${id}'
    `, (err, res) => {
            if (err){
                
                console.log("Error Occured: " + err);
            }
})};

const select = async (Client) => {
    let obj = [];
    try {
        const res = await Client.query(`SELECT * FROM List`);
        for (i in res.rows) {
            obj.push(res.rows[i]);
        }
    } catch (err) {
        console.log("Error Occured: " + err);
    }
    return obj;
};


const truncate= (Client) => {
    Client.query(`TRUNCATE TABLE List`, (err, res) => {
        if (err) {
            console.log("Error Occured: " + err);
        }
    });
};


module.exports = { PgDb, insert, select,truncate};
