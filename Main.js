var express = require("express");
var parser = require("body-parser");

var dallocation = require("./Locationst.js");
var dalAanwezigheden = require("./Aanwezighedenst.js");
var daldroneid = require("./droneidst.js");
var dalmac-adress = require("./macadressst.js");

var validator = require("./Validate.js");

var app = express();
app.use(parser.json());


app.get("/Locations", function (request, response) {
    "use strict";
    response.send(dalLocation.listAllLocations());
});

app.get("/Locations/:id", function (request, response) {
    "use strict";
    var Location = dalLocation.findLocation(request.params.id);
    if (Location) {
        response.send(Location);
    } else {
        response.status(404).send();
    }
});

app.post("/Locations", function (request, response) {
    "use strict";
    var Locatie = request.body; //kon geen locations gebruiken want dit is een bestaande functie => hoop dat ik 'location' op de juiste plekken heb aangepast naar 'locatie'

    var errors = validator.fieldsNotEmpty(Locatie, "Naam", "Adres", "Capacity");
    if (errors) {
        response.status(400).send({msg: "Following field(s) are mandatory:" + errors.concat()});
        return;
    }

    var existingLocation = dalLocation.findLocation(Locatie.Naam);
    if (existingLocation) {
        response.status(409).send({msg: "Naam moet uniek zijn, deze bestaat al", link: "../Locations/" + existingLocation.id});
        return;
    }
    Locatie.id = Locatie.Naam;
    dalLocation.saveLocation(Locatie);
    response.status(201).location("../Locations/" + Locatie.id).send();
});


app.get("/drone_id", function (request, response) {
    "use strict";
    response.send(daldroneid.listAllProducts());
});

app.get("/drone_id", function (request, response) {
    "use strict";
    var droneidt = daldroneid.finddroneid(request.params.id);
    if (droneid) {
        response.send(droneid);
    } else {
        response.status(404).send();
    }
});

app.post("/drone_id", function (request, response) {
    "use strict";
    var droneid = request.body;

    var errors = validator.fieldsNotEmpty(droneid, "id");
    if (errors) {
        response.status(400).send({msg: "Following field(s) are mandatory:" + errors.concat()});
        return;
    }

    var existingdroneid = daldroneid.finddroneid(droneid.id);
    if (existingdroneid) {
        response.status(409).send({msg: "droneid moet uniek zijn, deze bestaat al", link: "../droneid/" + droneid.id});
        return;
    }
    droneid.id = droneid.id;
	daldroneid.savedroneid(droneid);
    response.status(201).location("../drone_id/" + droneid.id).send();
});


app.get("/Mac-Adress", function (request, response) {
    "use strict";
    response.send(dalmac-adress.listAllSales());
});

app.get("/Mac-Adress/:id", function (request, response) {
    "use strict";
    var macadress = dalmac-adress.findLocation(request.params.id);
    if (macadress) {
        response.send(macadress);
    } else {
        response.status(404).send();
    }
});

app.post("/Mac-Adress", function (request, response) {
    "use strict";
    var macadress = request.body;

    var errors = validator.fieldsNotEmpty(macadress, "Mac_adress", "[Productid]", "revenue", "Saleid");
    if (errors) {
        response.status(400).send({msg: "Following field(s) are mandatory:" + errors.concat()});
        return;
    }

    var existingSale = dalmac-adress.findSale(macadress.Mac_adress);
    if (existingSale) {
        response.status(409).send({msg: "id moet uniek zijn, deze bestaat al", link: "../Mac-Adress/" + existingSale.id});
        return;
    }
    macadress.id = macadress.Mac_adress;
    dalmac-adress.savemacadress(macadress);
    response.status(201).location("../Mac-Adress/" + macadress.id).send();
});


app.get("/Aanwezigheden", function (request, response) {
    "use strict";
    response.send(dalAanwezigheden.listAllAanwezigheden());
});

app.get("/Aanwezigheden/:id", function (request, response) {
    "use strict";
    var Aanwezigheid = dalAanwezigheden.findAanwezigheid(request.params.id);
    if (Aanwezigheid) {
        response.send(Aanwezigheid);
    } else {
        response.status(404).send();
    }
});

app.post("/Aanwezigheden", function (request, response) {
    "use strict";
    var Aanwezigheid = request.body;

    var errors = validator.fieldsNotEmpty(Aanwezigheid, "Date", "unique count");
    if (errors) {
        response.status(400).send({msg: "Following field(s) are mandatory:" + errors.concat()});
        return;
    }

    var existingAanwezigheid = dalAanwezigheden.findAanwezigheid(Aanwezigheid.Date);
    if (existingAanwezigheid) {
        response.status(409).send({msg: "De Datum moet uniek zijn, deze bestaat al", link: "../Aanwezigheden/" + existingAanwezigheid.id});
        return;
    }
    Aanwezigheid.id = Aanwezigheid.Date;
    dalAanwezigheden.saveAanwezigheid(Aanwezigheid);
    response.status(201).location("../Aanwezigheden/" + Aanwezigheid.id).send();
});

app.listen(4567);
console.log("Server started");