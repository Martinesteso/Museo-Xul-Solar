import {subscribePOSTEvent, subscribeGETEvent, startServer} from "soquetic"
import fs from "fs"; //Anotación: fs es el módulo del sistema de archivos que permite leer y escribir archivos
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
function coleccion() {                  //Anontacion: JSON.parse interpreta texto JSON y lo vuelve objeto/array de JS.
    let contenidoColeccion = JSON.parse(fs.readFileSync("../data/coleccion.json","utf-8")); //Anotación: utf-8 es un formato de codificación de caracteres
    return contenidoColeccion
}
//Anotación: Esta función modifica el archivo colección.json agregando o quitando el ID de la obra según el valor de enColección
function modificarColeccion(data) {

    let coleccionActual = JSON.parse(fs.readFileSync("../data/coleccion.json","utf-8"));
    
    if (data.enColección === true) {
        
        if (!coleccionActual.includes(data.id)) {
            coleccionActual.push(data.id); //Anotación: push agrega un elemento al final del array que se encuentra en coección.json
            
            fs.writeFileSync("../data/coleccion.json", JSON.stringify(coleccionActual,null, 2));
            
            return true;
        }
        
        return true;
    } else {
        
        coleccionActual = coleccionActual.filter(id => id !== data.id); //Anotación: !== quiere decir si no es igual a...
        
        fs.writeFileSync("../data/coleccion.json", JSON.stringify(coleccionActual,null, 2));
        
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