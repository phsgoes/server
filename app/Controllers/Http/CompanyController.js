'use strict'
// TODO: Implement Error Handler for all models in backend
const Company = use('App/Models/Company')
const Category = use('App/Models/Category')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with companies
 */
class CompanyController {
  /**
   * Show a list of all companies.
   * GET companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const companies = await Company.query().with('category').fetch()
    return response.status(200).json(companies)
  }

  /**
   * Create/save a new company.
   * POST companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    // TODO: Implement validation
    const data = request.only([
      'razao_social',
      'nome_fantasia',
      'cnpj',
      'email',
      'cep',
      'endereco',
      'numero',
      'bairro',
      'complemento',
      'cidade',
      'estado',
      'telefone',
      'data_de_cadastro',
      'status',
      'agencia',
      'conta',
      'category_id'
    ])

    const company = await Company.create(data)
    return response.status(201).json(company)
  }

  /**
   * Update company details.
   * PUT or PATCH companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    // TODO: Implement validation
    const company = await Company.find(params.id)

    company.razao_social = request.input('razao_social')
    company.nome_fantasia = request.input('nome_fantasia')
    company.email = request.input('email')
    company.cep = request.input('cep')
    company.endereco = request.input('endereco')
    company.numero = request.input('numero')
    company.bairro = request.input('bairro')
    company.complemento = request.input('complemento')
    company.cidade = request.input('cidade')
    company.estado = request.input('estado')
    company.telefone = request.input('telefone')
    company.data_de_cadastro = request.input('data_de_cadastro')
    company.status = request.input('status')
    company.agencia = request.input('agencia')
    company.conta = request.input('conta')
    company.category_id = request.input('category_id')
    
    await company.save()
    return response.status(200).json({ message: 'Updated', company: company })
  }

  /**
   * Delete a company with id.
   * DELETE companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const company = await Company.find(params.id)
    await company.delete()
    return response.status(200).json({ message: 'Empresa apagada com sucesso' })
  }

}

module.exports = CompanyController
