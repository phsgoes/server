'use strict'

const User = use('App/Models/User')
const { test, trait, afterEach } = use('Test/Suite')('User login')

trait('Test/ApiClient')

afterEach(async () => {
  await User.query().delete()
})

test('Login an user', async ({ client, assert }) => {
  // Ensures that we have an user to be logged
  const user = await client.post(`/api/v1/auth/register`).send({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  }).end()

  user.assertStatus(201)

  // Try to log user
  const response = await client.post(`/api/v1/auth/login`).send({
    email: 'geek1on1@gmail.com',
    password: 'secret'
  }).end()

  response.assertStatus(200)
  assert.hasAnyKeys(response.body, 'token')
  
}).timeout(0)

test('Ensures not to log when credentials are wrong', async ({ client }) => {
  const response = await client.post(`/api/v1/auth/login`).send({
    email: 'test@gmail.com',
    password: 'secret'
  }).end()

  response.assertStatus(401)
}).timeout(0)
