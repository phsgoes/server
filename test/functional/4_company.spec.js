'use strict'

const User = use('App/Models/User')
const Company = use('App/Models/Company')

const { test, trait, afterEach } = use('Test/Suite')('Companies')

trait('Auth/Client')
trait('Test/ApiClient')

afterEach(async () => {
  await Company.query().delete()
  await User.query().delete()
})

test('List no companies', async ({ client }) => {
  const user = await User.create({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  })

  const response = await client.get(`/api/v1/companies`).loginVia(user).end()
  
  response.assertStatus(200)
  response.assertJSON([])
}).timeout(0)

test('List all companies', async ({ client }) => {
  const user = await User.create({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  })

  await Company.create({ 'razao_social': 'Some Company', 'cnpj': '02365196000143' })

  const response = await client.get(`/api/v1/companies`).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset([{ 'razao_social': 'Some Company', 'cnpj': '02365196000143' }])
}).timeout(0)

test('Create a company using razao_social and cnpj', async ({ client }) => {
  const user = await User.create({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  })

  const response = await client.post(`/api/v1/companies`)
    .loginVia(user)
    .send({ 'razao_social': 'Some Company', 'cnpj': '02365196000143' })
    .end()

  response.assertStatus(201)
  response.assertJSONSubset({ 'razao_social': 'Some Company', 'cnpj': '02365196000143' })
}).timeout(0)

test('Do not create a company if not logged', async ({ client }) => {
  const response = await client.post(`/api/v1/companies`)
    .send({ 'razao_social': 'Some Company', 'cnpj': '02365196000143' })
    .end()

  response.assertStatus(401)
}).timeout(0)

test('Create a company with category "Supermercado" and obligatory telephone', async ({ client }) => {
  const user = await User.create({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  })

  const category = await client.post(`/api/v1/categories`)
    .loginVia(user)
    .send({ 'name': 'Supermercado' })
    .end()

  const id = category.body.id

  const response = await client.post(`/api/v1/companies`)
    .loginVia(user)
    .send({
      'razao_social': 'Some Company',
      'cnpj': '02365196000143',
      'telefone': '1155555555',
      'category_id': id
    })
    .end()

  response.assertStatus(201)
  response.assertJSONSubset({ 'razao_social': 'Some Company', 'cnpj': '02365196000143' })
}).timeout(0)

test('Update a company', async ({ client }) => {
  const user = await User.create({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  })

  const response = await client.post(`/api/v1/companies`)
    .loginVia(user)
    .send({ 'razao_social': 'Some Company', 'cnpj': '02365196000143' })
    .end()

  response.assertStatus(201)
  
  const id = response.body.id
  
  const update = await client.patch(`/api/v1/companies/${id}`)
  .loginVia(user)
  .send({ 'razao_social': 'Another Company' })
  .end()

  update.assertStatus(200)
  update.assertJSONSubset({
    'message': 'Updated',
    'company': { 'id': id, 'razao_social': 'Another Company' }
  })
}).timeout(0)

test('Delete a company', async ({ client }) => {
  const user = await User.create({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  })

  const response = await client.post(`/api/v1/companies`)
    .loginVia(user)
    .send({ 'razao_social': 'Some Company', 'cnpj': '02365196000143' })
    .end()

  response.assertStatus(201)

  const id = response.body.id
  const del = await client.delete(`/api/v1/companies/${id}`)
    .loginVia(user)
    .end()

  del.assertStatus(200)
  del.assertJSONSubset({ 'message': 'Empresa apagada com sucesso' })
}).timeout(0)