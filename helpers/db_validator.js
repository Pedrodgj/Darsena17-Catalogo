const Producto = require('../models/producto');
const Tipo = require('../models/tipo')


const tipoValido = async(tipo = '') => {
    const existeTipo = await Tipo.findOne({tipo});
    if (!existeTipo) {
        throw new Error (`El tipo ${tipo} no esta registrado en la Base de Datos`)
    }
}

const nombreExiste = async ( nombre = '' ) => {
    
    const existeNombre = await Producto.findOne({nombre});
        if( existeNombre ) {
            throw new Error (`El nombre ${nombre} ya esta registrado en la Base de Datos`)    
        }   
}

const ProductoExistById = async ( id = '' ) => {
    
    const IdExist = await Producto.findById(id);
        if( !IdExist ) {
            throw new Error (`El Id: ${id} no existe en la Base de Datos`)    
        }   
}

module.exports = {
    tipoValido, 
    nombreExiste,
    ProductoExistById
}