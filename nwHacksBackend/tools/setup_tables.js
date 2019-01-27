const mysql = require("mysql");

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'rideshare',
});

conn.connect((err) => {
    if (err) {
        throw err;
    }

    console.log('Database connected');

    const usersQuery = `CREATE TABLE IF NOT EXISTS users (
                            id int NOT NULL AUTO_INCREMENT,
                            username varchar(255) NOT NULL,
                            rating float(4) NOT NULL DEFAULT 5,
                            currentRideID int,
                            sumEcoStat float(4) NOT NULL DEFAULT 0,
                            sumCostSavings float(4) NOT NULL DEFAULT 0,
                            CONSTRAINT pk PRIMARY KEY (id)
                        )`;

    conn.query(usersQuery, (err) => {
        if (err) {
            throw err;
        }
        console.log("Users table created");
    })

    const requestsQuery = `CREATE TABLE IF NOT EXISTS requests (
                            id int NOT NULL AUTO_INCREMENT,
                            status int NOT NULL,
                            created_at datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
                            startLocLon float(8) NOT NULL,
                            startLocLat float(8) NOT NULL,
                            endLocLon float(8) NOT NULL,
                            endLocLat float(8) NOT NULL,
                            expire_at datetime NOT NULL,
                            CONSTRAINT pk PRIMARY KEY (id)
                          )`;

    conn.query(requestsQuery, (err) => {
        if (err) {
            throw err;
        }
        console.log("Requests table created");
    })

    const ridesQuery = `CREATE TABLE IF NOT EXISTS rides (
                            id int NOT NULL AUTO_INCREMENT,
                            status int NOT NULL,
                            startLocLon float(8) NOT NULL,
                            startLocLat float(8) NOT NULL,
                            endLocLon float(8) NOT NULL,
                            endLocLat float(8) NOT NULL,
                            user_1 int NOT NULL,
                            user_2 int,
                            user_3 int,
                            user_4 int,
                            CONSTRAINT pk PRIMARY KEY (id)
                        )`;

    conn.query(ridesQuery, (err) => {
        if (err) {
            throw err;
        }
        console.log("Rides table created");
    });

    conn.end();
    console.log("Database closed");
});
