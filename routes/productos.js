const {Router} = require('express');
const {check} = require('express-validator')

const { productosPost, productosGet, productosPut, productosDelete } = require('../controllers/productos');

const { tipoValido, nombreExiste, ProductoExistById } = require('../helpers/db_validator');
const { validarCampos } = require('../middlewares/validar_campos');

const routes = Router();

routes.get('/', productosGet)

routes.post('/', [
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(nombreExiste),
    check('imagen', 'La Imagen es obligatoria').not().isEmpty(),
    check('descripcion', 'La Descripcion es obligatoria').not().isEmpty(),
    check('tipo').custom(tipoValido),
    validarCampos
], productosPost)

routes.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ProductoExistById),
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(nombreExiste),
    check('imagen', 'La Imagen es obligatoria').not().isEmpty(),
    check('descripcion', 'La Descripcion es obligatoria').not().isEmpty(),
    check('tipo').custom(tipoValido),
   validarCampos 
], productosPut)

routes.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ProductoExistById),
    validarCampos
], productosDelete)

module.exports = routes