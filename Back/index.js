import {subscribePOSTEvent, subscribeGETEvent, startServer} from "soquetic"
import fs from "fs";
startServer()

subscribeGETEvent("obras", obras)
subscribeGETEvent("colección", coleccion)
subscribeGETEvent("obrasColección", obrasColeccion)
subscribePOSTEvent("modificarColección", modificarColeccion)

function obras() {
    let contenidoobras = JSON.parse(fs.readFileSync("../data/obras.json","utf-8"));
    return contenidoobras
}

function coleccion() {
    let contenidocoleccion = JSON.parse(fs.readFileSync("../data/coleccion.json","utf-8"));
    return contenidocoleccion
}

function obrasColeccion() {
   
    let todasLasObras = JSON.parse(fs.readFileSync("../data/obras.json","utf-8"));
    let idsColeccion = JSON.parse(fs.readFileSync("../data/coleccion.json","utf-8"));
    let obrasEnColeccion = todasLasObras.filter(obra => idsColeccion.includes(obra.id));
    return obrasEnColeccion;
}

function modificarColeccion(data) {
    
    let coleccionActual = JSON.parse(fs.readFileSync("../data/coleccion.json","utf-8"));
    if (data.enColección === true) {
        
        if (!coleccionActual.includes(data.id)) {
            coleccionActual.push(data.id);
            
            fs.writeFileSync("../data/coleccion.json", JSON.stringify(coleccionActual));
            
            return true;
        }
       
        return true;
    } else {
        
        return false;
    }
}