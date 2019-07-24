//Using the express framework
var express = require('express');
var router = express.Router();
var xsenv = require('@sap/xsenv');
var xssec = require('@sap/xssec');

//Using a Database Interface file which has all the DB specific code
var dbInterface = require('../dbConnector/dbInterface');
var doctorLogonId;

//------------------------------------------------------------------------------------------------------------
//

/* This route is just to test that your app is running.
** There is no other value added by this route.
*/
router.get('/', function (req, res) {
	var accessToken = req.headers['authorization'];
	accessToken = accessToken.substring('Bearer '.length);
	var uaa = xsenv.getServices({
	  uaa: {
		tag: 'xsuaa'
	  }
	}).uaa;
	return xssec.createSecurityContext(accessToken, uaa, (err, securityContext) => {
	  if (err) {
		res.status(400).send("Error");
	  }
	  doctorLogonId = securityContext.userInfo.logonName;
	  res.status(200).json("Hello from the backend " + doctorLogonId);
	});
});

//------------------------------------------------------------------------------------------------------------
//Database task routes

/* DB Task 1: Select all patients for the doctor
*/
router.get('/dbtask/selectMyPatients', function (req, res) {
	var doctorId = doctorLogonId;
	console.log("***!!!***\n");
	console.log("\nDoctor Logon Id\n" + doctorId + "\n\n**!!**");
	dbInterface.selectMyPatients(doctorId, function (result, error) {
		if (error) {
			res.send(error);
		}
		res.send(result);
	});
});

/* DB Task 2: Add a patient
*  We pass the parameters in the body of our URL call
*/
router.put('/dbtask/addPatient', function (req, res) {
	//Change made
	// var name = req.body.name;
	// var symptoms = req.body.symptoms;
	// var diagnosis = req.body.diagnosis;
	// var doctorId = doctorLogonId;
	
	var name = req.body.name;
	var lastname = req.body.symptoms;
	var email = req.body.email;
	var password = req.body.password;
	var address = req.body.address;
	var city = req.body.city;
	var zipcode = req.body.zipcode;
	var country = req.body.country;
	var doctorId = req.body.doctorId;
	res.send(dbInterface.addPatient(name, lastname, email, password, address, city, zipcode, country, doctorId, function (result, error) {
		if (error) {
			res.send(400, "Error! Could not insert values");
		}
		if (result === 'success') {
			res.send(200, "Values inserted");
		} else {
			res.send(400, "Error! Could not insert values");
		}
	}));
});

/* DB Task 3: Select all patients in the system
*/
router.get('/dbtask/selectAllPatients', function (req, res) {
	dbInterface.selectAllPatients(function (result, error) {
		if (error) {
			res.send(error);
		}
		res.send(result);
	});
});

// /* DB Task 3: Remove a patient
// *  We pass the parameters in the body of our URL call
// */
// router.get('/dbtask/removePatient', function (req, res) {
// });


// // //Uncomment the following code to manage your Database.
// // /* DB Task 3: Delete your databse table
// // */
// router.get('/dbtask/dropTable', function (req, res) {
// 	res.send(dbInterface.dropTable());
// });


//------------------------------------------------------------------------------------------------------------


module.exports = router;