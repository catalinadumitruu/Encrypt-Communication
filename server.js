var express = require('express')
var path = require('path')
var fs = require("fs");
var bodyParser = require('body-parser')
const crypto = require('crypto')

var app = express()

const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"
const IV = "5183666c72eec9e4";

const host = 'localhost'
const port = 8081

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

var encrypt = ((val) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
});
  
var decrypt = ((encrypted) => {
   let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
   let decrypted = decipher.update(encrypted, 'base64', 'utf8');
   return (decrypted + decipher.final('utf8'));
});

app.get('/encryptJSONFile', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        dataForEnc = JSON.parse(data)
        res.end(encrypt(JSON.stringify(dataForEnc, null, 4)))
        fs.writeFile('users.json', encrypt(JSON.stringify(dataForEnc, null, 4)) , (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is now encrypted.")
        });
    })
})

app.get('/decryptJSONFile', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        res.end(decrypt(data))
        fs.writeFile('users.json', decrypt(JSON.stringify(data, null, 4)) , (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is now decrypted.")
        });
    })
})

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( decrypt(data) )
        res.end( decrypt(data) )
    })
})

i = 4 
app.post('/addUser', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( decrypt(data) )
        newUser = req.body
        var id;
        Object.keys(data).forEach(function(key, i) {
            id = key;
            console.log("Last user id is: " + id)
        });
        data[++id] = newUser
    
        fs.writeFile('users.json', encrypt(JSON.stringify(data, null, 4)) , (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.")
        });

        res.end(JSON.stringify(data, null, 4))
    })
 })
 
 app.get('/GetUser/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( decrypt(data))
       var user = users[req.params.id] 
       console.log( user );
       res.end(JSON.stringify(user, null, 4))
    })
 })
 
 app.delete('/deleteUser/:userId', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( decrypt(data) )
        userId = req.params.userId
        isValid = false;
        Object.keys(data).forEach(function(key, i) {
            if(userId == key) {
                isValid=true
            }
        });

        if(isValid == true) {
            delete data[userId]

            fs.writeFile('users.json', encrypt(JSON.stringify(data, null, 4)) , (err) => {
                if (err) {
                    throw err;
                }
                console.log("JSON data is deleted.")
            });
    
            res.end(JSON.stringify(data, null, 4))
        }else {
            res.status(404).end() 
        }
    })
 })

app.listen(port, function () {
    console.log(`Example app listening at http://${host}:${port}`) 
})