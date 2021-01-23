const express = require('express')
const app = express()
const port = 5000
var sql = require("mssql");
var uuid = require('uuid');
//let moment = require('moment');
var CryptoJS = require('crypto-js');
app.use(express.json());
var key = CryptoJS.enc.Utf8.parse('1234567890123456');
function encrypt(msgString, key) {
    // msgString is expected to be Utf8 encoded
    var iv = CryptoJS.lib.WordArray.random(16);
    var encrypted = CryptoJS.AES.encrypt(msgString, key, {
        iv: iv
    });
    return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
}

function decrypt(ciphertextStr, key) {
    var ciphertext = CryptoJS.enc.Base64.parse(ciphertextStr);

    // split IV and ciphertext
    var iv = ciphertext.clone();
    iv.sigBytes = 16;
    iv.clamp();
    ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
    ciphertext.sigBytes -= 16;

    // decryption
    var decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {
        iv: iv
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,access-control-allow-origin');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var config = {
    user: 'ITADMIN',
    password: 'P@ssw0rd',
    server: 'ABDELRAHMAN-KHA\\SQLEXPRESS01',
    database: 'blogdb',
    "options": {
        "encrypt": true,
        "enableArithAbort": true
    }
};
app.post('/', function (req, res) {

    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('SELECT *  FROM [dbo].[user] where id<50', function (err, result) {

            if (err) console.log(err)
            let a = {}
            //   console.log(result)
            if (result.rowsAffected > 0) {
                for (let i = 0; i < result['recordset'].length; i++) {
                    /*  a.push({
                          key: i,
                          value: result['result'][i]['name']
                      })*/
                    a[i] = result['recordset'][i]['name']
                }
                // send records as a response
                res.setHeader('Content-Type', 'application/json');
                res.send(a);
            }
            else {
                res.send("Error")
            }

        });
    });

});
app.get('/getPosts', function (req, res) {

    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('SELECT posts.id, posts.title , posts.date_posted, posts.content , [dbo].[user].[name] AS user_Name, posts.user_id AS user_id  FROM posts, [dbo].[user]  WHERE posts.user_id = [dbo].[user].public_id', function (err, result) {

            if (err) console.log(err)
            // let a = {}
            let a = { 'posts': [] }
            // console.log(result)
            if (result.rowsAffected > 0) {
                for (let i = 0; i < result['recordset'].length; i++) {
                    /*  a.push({
                          key: i,
                          value: result['result'][i]['name']
                      })*/
                    // a[i] = result['recordset'][i]
                    a["posts"].push(result['recordset'][i])
                }
                // send records as a response
                res.setHeader('Content-Type', 'application/json');
                res.send(a);
                // console.log(uuid.v4(10))
            }
            else {
                res.send("Error")
            }

        });
    });

});

app.post('/login', function (req, res) {

    if (req.body['LogInData']['email']) {
        let uMail = req.body['LogInData']['email']
        //console.log(req.body['LogInData']['password'])
        sql.connect(config, function (err) {

            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();

            // query to the database and get the records
            request.query(`SELECT TOP 1  [name], [public_id] ,[email] ,[phone] ,[image_file] ,[Password]  ,[IsAdmin] FROM [dbo].[user] where [dbo].[user].[email]='${uMail}'`, function (err, result) {

                if (err) console.log(err)

                let a = { 'uData': [] }
                let uData = {
                    'uId': '', 'UName': '', 'UEmail': '', 'UPhone': '', 'Uimg': ''
                }
                if (result.rowsAffected > 0) {

                    uData = {
                        'uId': result['recordset'][0]['public_id'],
                        'UName': result['recordset'][0]['name'],
                        'UEmail': result['recordset'][0]['email'],
                        'UPhone': result['recordset'][0]['phone'],
                        'Uimg': result['recordset'][0]['image_file']
                    }

                    a["uData"] = uData

                    // send records as a response
                    //   res.setHeader('Content-Type', 'application/json');

                    //   res.send(a);
                    //console.log(uuid.v4(10))
                    //     console.log(result['recordset'][0]['Password'])
                    if (result['recordset'][0]['Password'] == decrypt(req.body['LogInData']['password'], key)) {
                        res.send({ 'Logged_in': 'true', 'uData': a["uData"] })

                    }
                    else {
                        uData = {
                            'uId': '', 'UName': '', 'UEmail': '', 'UPhone': '', 'Uimg': ''
                        }
                        res.send({ 'Logged_in': 'false', 'uData': uData })
                    }
                }
                else {

                    //      console.log('error')
                    res.send({ 'Logged_in': 'Error', 'uData': uData })
                }

            });

        });

    }
});


app.post('/uProfile', function (req, res) {
    if (req.body['uData']) {
        let uId = req.body['uData']

        sql.connect(config, function (err) {

            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();

            // query to the database and get the records
            request.query(`SELECT TOP 1  * FROM [dbo].[user] where [dbo].[user].[public_id]='${uId}'`, function (err, result) {
                if (err) console.log(err)
                // console.log(result)
                if (result.rowsAffected > 0) {
                    let userData = {
                        'uId': result['recordset'][0]['public_id'],
                        'UName': result['recordset'][0]['name'],
                        'UEmail': result['recordset'][0]['email'],
                        'UPhone': result['recordset'][0]['phone'],
                        'uImg': result['recordset'][0]['image_file']
                    }
                    // send records as a response
                    res.send(userData);
                }
                else {
                    res.send("Error")
                }

            });
        });
    }
    else {
        res.send("Error")
    }
});

app.post('/chData', function (req, res) {
    if (req.body['cData']['id'] && Number.isInteger(parseInt(req.body['cData']['UPhone']))) {
        let uid = req.body['cData']['id']
        let uname = req.body['cData']['UName']
        let uimage_file = req.body['cData']['Uimg']
        let uphone = req.body['cData']['UPhone']
        sql.connect(config, function (err) {

            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();

            // query to the database and get the records
            request.query(`UPDATE [dbo].[user]  SET [name] = '${uname}'   ,[phone] = '${uphone}'   ,[image_file] = '${uimage_file}' WHERE [dbo].[user].[public_id]='${uid}' `, function (err, result) {
                if (err) console.log(err)
                if (result.rowsAffected > 0) {
                    // console.log(result.rowsAffected)
                    // send records as a response
                    res.send({ 'DataUpdated': 'User Data Updated' });
                }
                else {
                    res.send({ 'DataUpdated': 'server error' })
                }

            });
        });
    }
    else {
        res.send({ 'DataUpdated': 'server error Phone' })
    }
});

app.post('/chPass', function (req, res) {
    if (req.body['cData']) {
        let uid = req.body['cData']['id']
        let upass = decrypt(req.body['cData']['npass'], key)
        sql.connect(config, function (err) {

            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();

            // query to the database and get the records
            request.query(`UPDATE [dbo].[user]  SET [Password] = '${upass}' WHERE [dbo].[user].[public_id]='${uid}' `, function (err, result) {
                if (err) console.log(err)
                if (result.rowsAffected > 0) {
                    // send records as a response
                    res.send({ 'DataUpdated': 'User Data Updated' });
                }
                else {
                    res.send({ 'DataUpdated': 'server error' })
                }

            });
        });
    }
    else {
        res.send({ 'DataUpdated': 'server error' })
    }
});


app.post('/addPosts', function (req, res) {
    if (req.body['PostData']) {
        let title = req.body['PostData']['title']
        let content = req.body['PostData']['content']
        let user_id = req.body['PostData']['user_id']
        //let current_moment = moment(Date.now()).format('YYYY-MM-DDTHH:MM:SS')
        //  console.log(`INSERT INTO [dbo].[posts]([id],[title] ,[date_posted],[content],[user_id]) VALUES(2147483647 ,'${title}' ,'${current_moment}' ,'${content}' ,'${user_id}')  `)
        sql.connect(config, function (err) {

            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();

            // query to the database and get the records
            request.query(`INSERT INTO [dbo].[posts]([id],[title] ,[date_posted],[content],[user_id]) VALUES(2147483647 ,'${title}' ,GETDATE() ,'${content}' ,'${user_id}')  `, function (err, result) {
                if (err) console.log(err)
                // console.log(result.rowsAffected)
                if (result.rowsAffected) {
                    // send records as a response
                    res.send({ 'message': 'Post Added Successfully' });
                }
                else {
                    res.send({ 'message': 'server error' })
                }

            });
        });
    }
    else {
        res.send({ 'message': 'server error 1' })
    }
});



app.post('/register', function (req, res) {
    if (req.body['RegData']) {
        let upass = decrypt(req.body['RegData']['password'], key)
        let umail = req.body['RegData']['email']
        let uname = req.body['RegData']['name']
        let uphone = req.body['RegData']['phone']
        let uId = uuid.v4()
        sql.connect(config, function (err) {

            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();

            // query to the database and get the records
            request.query(`SELECT *  FROM [dbo].[user] Where [dbo].[user].[email]='${umail}'`, function (err, result) {
                if (err) console.log(err)
                console.log(result.rowsAffected)
                if (result.rowsAffected < 1) {

                    var request2 = new sql.Request();
                    request2.query(` INSERT INTO [dbo].[user] ([id] ,[name] ,[public_id] ,[email] ,[phone]  ,[image_file] ,[Password] ,[IsAdmin]) VALUES (2147483647 ,'${uname}' ,'${uId}' ,'${umail}' ,'${uphone}' ,'https://i.imgur.com/fjYAIbl.png'  ,'${upass}' ,0)`, function (err2, result2) {
                        if (err2) console.log(err2)
                        if (result2.rowsAffected) {
                            res.send({ 'Register': 'Successfully' });
                        }
                    });
                }
                else {
                    res.send({ 'Register': 'Email Already Registered' })
                }

            });
        });
    }
    else {
        res.send({ 'message': 'server error 1' })
    }
});

app.listen(port, function () {
    console.log(`listening on ${port}`)
})