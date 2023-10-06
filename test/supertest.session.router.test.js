import chai from 'chai'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Registro, Login and Current', async() => {
    let cookieResult
    const mockUser = {
        first_name: 'Alex',
        last_name: 'Marin',
        // email: 'alexmarinmendez@gmail.com',
        email: faker.internet.email(),
        password: 'secret'

    }
    it('Debe registrar un usuario', async() => {
        const { _body } = await requester.post('/api/sessions/register').send(mockUser)
        expect(_body.payload).to.be.ok
        // expect(_body.payload).to.have.property('_id')
        // console.log(_body.payload)
        // expect(_body.status).to.be.eql("success")
    })

    it('Debe loggear un user y devolver una cookie', async() => {
        const result = await requester.post('/api/sessions/login').send({
            email: mockUser.email,
            password: mockUser.password
        })

        cookieResult = result.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok

        //cookieResult  =>  'cookieName=cookieValue'
        expect(cookieResult.split('=')[0]).to.be.ok.and.eql('coderCookie')
        // console.log(cookieResult.split('=')[1])
    })

    it('Enviar cookie para ver el contenido del user', async() => {
        const { _body } = await requester.get('/api/sessions/current').set('Cookie', [cookieResult])
        // console.log(_body)
        expect(_body.payload.email).to.be.eql(mockUser.email)
    })
})