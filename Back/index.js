import {subscribePOSTEvent, subscribeGETEvent, startServer} from "soquetic"
import fs from "fs";
startServer()

subscribeGETEvent ("obras", obras)
subscribeGETEvent ("colección", coleccion)

function obras() {

    let contenidoobras = JSON.parse (fs.readFileSync("../data/obras.json","utf-8"));
    return contenidoobras

}

