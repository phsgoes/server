'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')
const { test, trait, afterEach } = use('Test/Suite')('User registration')

trait('Test/ApiClient')

afterEach(async () => {
  await User.query().delete()
})

test('Create an user', async ({ client, assert }) => {
  Mail.fake()

  const response = await client.post(`/api/v1/auth/register`).send({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  }).end()

  response.assertStatus(201)
  response.assertJSONSubset({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com'
  })

  const user = await User.findBy('email', 'geek1on1@gmail.com')
  assert.equal(user.toJSON().email, 'geek1on1@gmail.com')

  Mail.restore()
})

test('Do not create an user', async ({ client, assert }) => {
  Mail.fake()

  const response = await client.post(`/api/v1/auth/register`).end()
  response.assertStatus(400)

  const user = await User.findBy('email', 'geek1on1@gmail.com')
  assert.isNull(user)

  Mail.restore()
})
