import {subscribePOSTEvent, subscribeGETEvent, startServer} from "soquetic"
import fs from "fs"; //Anotación: node fs nos permite poder usar java para, ademas de hacer paginas web, programar el back end,
startServer()        //osea correr el codigo desde fuera del navegador.

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
function modificarColeccion(data) {//Anotación: data es el parametro que recibe la función modificarColección
                        //Anotación: data se convierte en el parametro de modificarColección, que es un objeto con dos propiedades: id y enColección
    let coleccionActual = JSON.parse(fs.readFileSync("../data/coleccion.json","utf-8"));//Anotación: coleccionActual es un array con los IDs de las obras que están en la colección
    if (data.enColección === true) {
        
        if (!coleccionActual.includes(data.id)) { //Anotación: el segundo if evita que haya duplicados en el array
            coleccionActual.push(data.id); //Anotación: push agrega un elemento al final del array que se encuentra en coección.json
            
            fs.writeFileSync("../data/coleccion.json", JSON.stringify(coleccionActual,null, 2));
        }
        return true;
    } else {
                                          //Anotación: filter crea un nuevo array con los elementos que cumplen la condición, los que no seran eliminados
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
    return obrasEnColeccion;             //Anotción: Ademas, filter filtra todos los elementos, no uno en especifico
}