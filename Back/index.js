import {subscribePOSTEvent, subscribeGETEvent, startServer} from "soquetic"
import fs from "fs";
startServer()

subscribeGETEvent("obras", obras)
subscribeGETEvent("colección", coleccion)
subscribeGETEvent("obrasColección", obrasColeccion)
subscribePOSTEvent("modificarColección", modificarColeccion)
//Anotación: Esta función devuelve un array con todas las obras del museo
function obras() {
    let contenidoObras = JSON.parse(fs.readFileSync("../data/obras.json","utf-8"));
    return contenidoObras
}
//Anotación: Esta función devuelve un array con los IDs de las obras que están en la colección
function coleccion() {
    let contenidocoleccion = JSON.parse(fs.readFileSync("../data/coleccion.json","utf-8"));
    return contenidocoleccion
}
//Anotación: Esta función modifica el archivo colección.json agregando o quitando el ID de la obra según el valor de enColección
function modificarColeccion(data) {

    let coleccionActual = JSON.parse(fs.readFileSync("../data/coleccion.json","utf-8"));
    
    if (data.enColección === true) {
        
        if (!coleccionActual.includes(data.id)) {
            coleccionActual.push(data.id); //Anotación: push agrega un elemento al final del array (coección.json)
            
            fs.writeFileSync("../data/coleccion.json", JSON.stringify(coleccionActual));
            
            return true;
        }
        
        return true;
    } else {
        
        coleccionActual = coleccionActual.filter(id => id !== data.id); //Anotación: !== quiere decir si no es igual a...
        
        fs.writeFileSync("../data/coleccion.json", JSON.stringify(coleccionActual));
        
        return true;
    }
}
//Anotación: Esta función devuelve un array con las obras que están en la colección
function obrasColeccion() {
   
    let todasLasObras = JSON.parse(fs.readFileSync("../data/obras.json","utf-8"));
    let idColeccion = JSON.parse(fs.readFileSync("../data/coleccion.json","utf-8"));
    let obrasEnColeccion = todasLasObras.filter(obra => idColeccion.includes(obra.id));
    return obrasEnColeccion;
}