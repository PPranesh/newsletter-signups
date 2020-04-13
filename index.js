const express_Pack = require("express");
const bodyParser_Pack = require("body-parser");
const request_Pack = require("request");

const app = express_Pack();
const PORT = 3000;

app.use(express_Pack.static("public"));
app.use(bodyParser_Pack.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){

    var FirstName = req.body.inputFirstName;
    var LastName = req.body.inputLastName;
    var Email = req.body.inputEmail;

    var data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: FirstName,
                    LNAME: LastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {

        url: "https://us19.api.mailchimp.com/3.0/lists/d44bda9c9b",
        method: "POST",
        headers: {
            "Authorization": "ppranesh:359c059db526c22900df365aef18a556-us19"
        },
        body: jsonData
    };

    request_Pack(options, function(error, response, body){

        if (error) {
            console.log("err - "+error);
            res.sendFile(__dirname+"/not_done.html");
        } else {

            if (response.statusCode === 200) {
                console.log("resp code - "+response.statusCode);
                res.sendFile(__dirname+"/done.html");
            } else {
                console.log("err - "+error);
                res.sendFile(__dirname+"/not_done.html");
            }
        }
    });
});

app.post("/", function(req,res) {
    res.redirect("/");
});

app.listen(PORT, function(){
    console.log(`server listens to ${PORT}`);
});