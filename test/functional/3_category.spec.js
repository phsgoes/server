'use strict'

const User = use('App/Models/User')
const Category = use('App/Models/Category')

const { test, trait, afterEach } = use('Test/Suite')('Categories')

trait('Auth/Client')
trait('Test/ApiClient')

afterEach(async () => {
  await Category.query().delete()
  await User.query().delete()
})

test('List no categories', async ({ client }) => {
  const user = await User.create({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  })

  const response = await client.get(`/api/v1/categories`).loginVia(user).end()
  
  response.assertStatus(200)
  response.assertJSON([])
}).timeout(0)

test('List all categories', async ({ client }) => {
  const user = await User.create({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  })

  await Category.create({ 'name': 'Some Category' })

  const response = await client.get(`/api/v1/categories`).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset([{ 'name': 'Some Category' }])
}).timeout(0)

test('Create a category', async ({ client }) => {
  const user = await User.create({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  })

  const response = await client.post(`/api/v1/categories`)
    .loginVia(user)
    .send({ 'name': 'Some Category' })
    .end()

  response.assertStatus(201)
  response.assertJSONSubset({ 'name': 'Some Category' })
}).timeout(0)

test('Do not create a category if not logged', async ({ client }) => {
  const response = await client.post(`/api/v1/categories`)
    .send({ 'name': 'Some Category' })
    .end()

  response.assertStatus(401)
}).timeout(0)

test('Update a category', async ({ client }) => {
  const user = await User.create({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  })

  const response = await client.post(`/api/v1/categories`)
    .loginVia(user)
    .send({ 'name': 'Some Category' })
    .end()

  response.assertStatus(201)
  
  const id = response.body.id
  
  const update = await client.patch(`/api/v1/categories/${id}`)
  .loginVia(user)
  .send({ 'name': 'Another Category' })
  .end()

  update.assertStatus(200)
  update.assertJSONSubset({
    'message': 'Updated',
    'category': { 'id': id, 'name': 'Another Category' }
  })
}).timeout(0)

test('Delete a category', async ({ client }) => {
  const user = await User.create({
    username: 'Paulo Goes',
    email: 'geek1on1@gmail.com',
    password: 'secret'
  })

  const response = await client.post(`/api/v1/categories`)
    .loginVia(user)
    .send({ 'name': 'Some Category' })
    .end()

  response.assertStatus(201)

  const id = response.body.id

  const del = await client.delete(`/api/v1/categories/${id}`)
    .loginVia(user)
    .end()

  del.assertStatus(200)

  del.assertJSONSubset({ 'message': 'Categoria apagada com sucesso' })
}).timeout(0)