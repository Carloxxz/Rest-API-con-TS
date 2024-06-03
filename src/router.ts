import { Router } from "express";
import { createProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router()

router.get('/', getProducts)
router.get('/:id',
    param('id').isInt().withMessage('ID no válidos'),
    handleInputErrors,
    getProductById
)

router.post('/',

    // Validación de router
    body('name')
        .notEmpty().withMessage('Necesita un nombre de producto'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('Necesita un precio de producto')
        .custom(value => value > 0).withMessage('El precio es válido'),
    handleInputErrors,
    createProduct
)

router.put('/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('Necesita un nombre de producto'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('Necesita un precio de producto')
        .custom(value => value > 0).withMessage('El precio es válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,

    updateProduct
)

router.patch('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,

)

export default router