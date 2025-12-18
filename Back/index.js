import {subscribePOSTEvent, subscribeGETEvent, startServer} from "soquetic"
import fs from "fs"; //Anotación: node fs nos permite poder usar java para, ademas de hacer paginas web, programar el back end,
startServer()        //osea correr el codigo desde fuera del navegador.

subscribeGETEvent("obras", obras)
subscribeGETEvent("colección", coleccion)
subscribeGETEvent("obrasColección", obrasColeccion)
subscribePOSTEvent("modificarColección", modificarColeccion)

function obras() {
    let contenidoObras = JSON.parse(fs.readFileSync("../data/obras.json","utf-8"));
    return contenidoObras
}

function coleccion() {                 
    let contenidoColeccion = JSON.parse(fs.readFileSync("../data/coleccion.json","utf-8")); 
    return contenidoColeccion
}

function modificarColeccion(data) {
                       
    let coleccionActual = JSON.parse(fs.readFileSync("../data/coleccion.json","utf-8"));
    if (data.enColección === true) {
        
        if (!coleccionActual.includes(data.id)) { 
            coleccionActual.push(data.id); 
            
            fs.writeFileSync("../data/coleccion.json", JSON.stringify(coleccionActual,null, 2));
        }
        return true;
    } else {
       
        let coleccionNueva = [];
        
        for (let i = 0; i < coleccionActual.length; i++) {
           
            if (coleccionActual[i] !== data.id) {
                coleccionNueva.push(coleccionActual[i]);
            }
        }
        
        fs.writeFileSync("../data/coleccion.json", JSON.stringify(coleccionNueva, null, 2));
        
        return true;
    }
}

function obrasColeccion() {
   
    let todasLasObras = JSON.parse(fs.readFileSync("../data/obras.json","utf-8"));
    let idColeccion = JSON.parse(fs.readFileSync("../data/coleccion.json","utf-8"));
    let obrasEnColeccion = todasLasObras.filter(obra => idColeccion.includes(obra.id));
    return obrasEnColeccion;
}