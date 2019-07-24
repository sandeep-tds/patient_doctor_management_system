// PSQL Library for node
var pg = require('pg');

// We get environment variables of the current application
var VCAPServices = JSON.parse(process.env.VCAP_SERVICES);

// When we bind a PSQL service to our application (done in the mta.yaml file),
// The service details are addedd to the application's environment variables.
// We access the the DB details (such as hostname, password, port etc.) from the VCAP services.
var PGConfig = VCAPServices.postgresql[0];

var config = {
	host: PGConfig.credentials.hostname, // Server hosting the postgres database
	database: PGConfig.credentials.dbname, //env var: PGDATABASE
	user: PGConfig.credentials.username, //env var: PGUSER
	password: PGConfig.credentials.password, //env var: PGPASSWORD
	port: PGConfig.credentials.port, //env var: PGPORT
	max: 10, // max number of clients in the pool (10)
	idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed (30 seconds)
};

//This initializes a connection pool with the specified configuration.
var pool = new pg.Pool(config);

/**
 * Checks if a table with name "products" exists. If the table doesn't exist, it creates a table.
 */
var psqlCreatePatientsTable = function () {

	//Prepare the create table query.
	// change made
	// var createProductsTableQuery = "CREATE TABLE IF NOT EXISTS patients ( " +
	// 	"patient_id serial CONSTRAINT patient_id PRIMARY KEY," +
	// 	"patient_name varchar(150) NOT NULL," +
	// 	"patient_symptoms varchar(500)," +
	// 	"patient_diagnosis varchar(500)," +
	// 	"doctor_id varchar (100) NOT NULL" +
	// 	")";

	var createProductsTableQuery = "CREATE TABLE IF NOT EXISTS patients ( " +
		"patient_id serial CONSTRAINT patient_id PRIMARY KEY," +
		"patient_name varchar(150) NOT NULL," +
		"patient_lastname varchar(150) NOT NULL," +
		"patient_email varchar(500)," +
		"patient_password varchar(500)," +
		"patient_address varchar(500)," +
		"patient_city varchar(500)," +
		"patient_zipcode varchar(500)," +
		"patient_country varchar(150)," +
		"doctor_id varchar (100) NOT NULL" +
		")";

	//Note: The product id is auto generated by the DB Table

	//Request the pool for a client connection and execute our query
	pool.connect().then(client => {
		client.query(createProductsTableQuery).then(res => {
			console.log(res);
			client.release();
		}).catch(e => {
			client.release();
			console.error('Query error: ', e.message, e.stack);
		});
	});
};

  //Change made

// var psqlAddPatient = function (name, symptoms, diagnosis, doctorId, callback) {

// 	//Prepare the insert query.
// 	var insertValuesIntoProductsTableQuery =
// 		"INSERT INTO patients (\"patient_name\",\"patient_symptoms\",\"patient_diagnosis\",\"doctor_id\")" +
// 		"VALUES($1,$2,$3,$4);";

// 	//Request the pool for a client connection and execute our query
// 	return pool.connect().then(client => {
// 		client.query(insertValuesIntoProductsTableQuery, [name, symptoms, diagnosis, doctorId]).then(res => {
// 			console.log(res);
// 			client.release();
// 			callback('success');
// 		}).catch(e => {
// 			console.error('Query error: ', e.message, e.stack);
// 			client.release();
// 			callback('failure');
// 		});
// 	});

// };
var psqlAddPatient = function (name, lastname, email, password, address, city, zipcode, country, doctorId, callback) {

	//Prepare the insert query.
	var insertValuesIntoProductsTableQuery =
		"INSERT INTO patients (\"patient_name\",\"patient_lastname\",\"patient_email\",\"patient_password\", \"patient_address\", \"patient_city\",\"patient_zipcode\",\"patient_country\",\"doctor_id\", )" +
		"VALUES($1,$2,$3,$4,$5,$5,$6,$7,$8,$9);";

	//Request the pool for a client connection and execute our query
	//change made
	// return pool.connect().then(client => {
	// 	client.query(insertValuesIntoProductsTableQuery, [name, symptoms, diagnosis, doctorId]).then(res => {
	// 		console.log(res);
	// 		client.release();
	// 		callback('success');
	// 	}).catch(e => {
	// 		console.error('Query error: ', e.message, e.stack);
	// 		client.release();
	// 		callback('failure');
	// 	});
	// });
	return pool.connect().then(client => {
		client.query(insertValuesIntoProductsTableQuery, [name, lastname, email, password, address, city,
		zipcode, country, doctorId]).then(res => {
			console.log(res);
			client.release();
			callback('success');
		}).catch(e => {
			console.error('Query error: ', e.message, e.stack);
			client.release();
			callback('failure');
		});
	});

};
/**
 * Fetch all the records in the products table where the tenant id matches.
 * @param  {} tenantId - Tenant id of the subscriber
 * @param  {} callback - Callback
 */
var psqlSelectUserPatients = function (doctorId, callback) {
	//Prepare the insert query.
	var selectMyProductsQuery = "SELECT * FROM patients WHERE \"doctor_id\" = $1";

	//Request the pool for a client connection and execute our query
	return pool.connect().then(client => {
		return client.query(selectMyProductsQuery, [doctorId]).then(function (result) {
			console.log(result);
			callback(result.rows);
			client.release();
		}).catch(e => {
			client.release();
			console.error('Query error: ', e.message, e.stack);
		});
	});
};

var psqlSelectAllPatients = function (callback) {
	//Prepare the insert query.
	var selectMyProductsQuery = "SELECT * FROM patients";

	//Request the pool for a client connection and execute our query
	return pool.connect().then(client => {
		return client.query(selectMyProductsQuery).then(function (result) {
			console.log(result);
			callback(result.rows);
			client.release();
			client.release();
			console.error('Query error: ', e.message, e.stack);
		});
	});
};

/* #region PSQL Test Methods */
// // Uncomment the following code for additional DB help methods.
// // Note: you will have to uncomment the changes in index.js and in the module.exports section of this file.

// /**
//  * Fetches all the records in the products table
//  * @param  {} callback - Callback
//  */
// var psqlTestSelectAllProducts = function (callback) {
// 	var selectAllProductsQuery = "SELECT * FROM products";

// 	return pool.connect().then(client => {
// 		return client.query(selectAllProductsQuery).then(function (result) {
// 			console.log(result);
// 			callback(result.rows);
// 			client.release();
// 		}).catch(e => {
// 			client.release();
// 			console.error('Query error: ', e.message, e.stack);
// 		});
// 	});
// };

// /**
//  * Deletes the products table
//  */
// var psqlTestDropProductTables = function () {
// 	var dropTableQuery = "DROP TABLE products;";

// 	return pool.connect().then(client => {
// 		client.query(dropTableQuery).then(res => {
// 			console.log("***Deleted products table successfully***");
// 			client.release();
// 		}).catch(e => {
// 			client.release();
// 			console.error('Query error: ', e.message, e.stack);
// 		});
// 	});
// };

// /**
//  * Delete a specific product with proudct id as following
//  * @param  {} productId - product Id of the product that needs to be deleted
//  */
// var psqlTestDeleteValues = function (productId) {
// 	var deleteValuesForIdQuery = "DELETE FROM products WHERE products.patient_id = $1";

// 	pool.connect().then(client => {
// 		client.query(deleteValuesForIdQuery, [productId]).then(res => {
// 			console.log(res);
// 			client.release();
// 		}).catch(e => {
// 			client.release();
// 			console.error('Query error: ', e.message, e.stack);
// 		});
// 	});

// };

/* #endregion */

module.exports = {
	// deleteValues: psqlTestDeleteValues,
	// selectAllProducts: psqlTestSelectAllProducts,
	// dropTable: psqlTestDropProductTables,
	createPatientsTable: psqlCreatePatientsTable,
	addPatient: psqlAddPatient,
	selectMyPatients: psqlSelectUserPatients,
	selectAllPatients: psqlSelectAllPatients
};