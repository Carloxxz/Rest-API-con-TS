import { Request, Response } from "express"
// import { check, validationResult } from "express-validator"
import Proudct from "../models/Product.model"

export const getProducts = async (req: Request, res: Response) => {
    const products = await Proudct.findAll({
        order: [
            ['price', 'DESC']
        ]
    })
    res.json({ data: products })
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const produc = await Proudct.findByPk(id)

    if (!produc) {
        return res.status(404).json({ error: 'No encontrado' })
    }
    res.json({ data: produc })
}

export const createProduct = async (req: Request, res: Response) => {

    // Validación
    // await check('name').notEmpty().withMessage('Necesita un nombre de producto').run(req)
    // await check('price')
    //     .isNumeric().withMessage('Valor no válido')
    //     .notEmpty().withMessage('Necesita un precio de producto')
    //     .custom(value => value > 0).withMessage('El precio es válido')
    //     .run(req)

    // Para middleware
    // let errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() })
    // }

    const product = await Proudct.create(req.body)
    res.status(201).json({ data: product })
}

export const updateProduct = async (req: Request, res: Response) => {

    const { id } = req.params
    const product = await Proudct.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // Actualizar
    await product.update(req.body)
    await product.save()

    res.json({ data: product })
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Proudct.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // Actualizar
    product.availability = !product.dataValues.availability
    await product.save()

    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Proudct.findByPk(id)

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    await product.destroy()
    res.json({ data: 'Producto Eliminado' })
}