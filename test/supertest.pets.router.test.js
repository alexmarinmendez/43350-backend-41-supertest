import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Adopt-Me', () => {
    describe('Test de Mascotas', () => {
        it('El Endpoint POST /api/pets debe registrar una mascota', async () => {
            const petMock = {
                name: 'Firulais',
                specie: 'dog',
                birthDate: '10-10-2020'
            }

            const response = await requester.post('/api/pets').send(petMock)
            const { status, ok, _body } = response
            expect(_body.payload).to.have.property('_id')
        })

        it('El endpoint POST /api/pets no debería crear mascota con datos vacíos', async () => {
            const petMock = {}
            const response = await requester.post('/api/pets').send(petMock)
            const { status, ok, _body } = response
            expect(ok).to.be.eq(false)
        })
    })
})

describe('test upload file', () => {
    it('>debe subir un archivo al crear una pet', async() => {
        const petMock = {
            name: 'Firulais',
            specie: 'dog',
            birthDate: '10-10-2020'
        }

        const result = await requester.post('/api/pets/withimage')
            .field('name', petMock.name)
            .field('specie', petMock.specie)
            .field('birthDate', petMock.birthDate)
            .attach('image', './test/firulais.jpg')

        expect(result.status).to.be.eql(200)
        expect(result._body.payload).to.have.property('_id')
        expect(result._body.payload.image).to.be.ok
    })
})