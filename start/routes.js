'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { message: 'There we go' }
})

Route.group(() => {
  /**
   * Authentication routes
   */
  Route.post('/auth/register', 'AuthController.register').validator('RegisterUser')
  Route.post('/auth/login', 'AuthController.login')

}).prefix('/api/v1')

Route.group(() => {
  /**
   * Categories routes
   */
  Route.get('/categories', 'CategoryController.index')
  Route.post('/categories', 'CategoryController.store').validator('StoreCategory')
  Route.patch('/categories/:id', 'CategoryController.update').validator('UpdateCategory')
  Route.delete('/categories/:id', 'CategoryController.destroy')

  /**
   * Companies routes
   */
  Route.get('/companies', 'CompanyController.index')
  Route.post('/companies', 'CompanyController.store').validator('StoreCompany')
  Route.patch('/companies/:id', 'CompanyController.update').validator('UpdateCompany')
  Route.delete('/companies/:id', 'CompanyController.destroy')

}).prefix('/api/v1').middleware(['auth'])
