import { connectDB } from "../server";
import db from "../config/db";

// describe('Nuestro primer test', () => {
//     it('Debe revisar que 1+1 sean 2', () => {
//         expect(1 + 1).toBe(2)
//     })
// })

// describe('GET /api', () => {
//     it('should send back a json response', async () => {
//         const res = await request(server).get('/api')

//         expect(res.status).toBe(200)
//         expect(res.headers['content-type']).toMatch(/json/)
//         expect(res.body.msg).toBe('desde api')

//         expect(res.status).not.toBe(404)
//         expect(res.body.msg).not.toBe('Desde api')

//         console.log(res.status)
//         console.log(res.headers['content-type'])
//     })
// })

jest.mock('../config/db')

describe('Connect DB', () => {
    it('Should handle database conection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar la DB'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Tuviste un Error al conectar la DB')
        )
    })
})