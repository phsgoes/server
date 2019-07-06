'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.string('razao_social').notNullable().unique()
      table.string('nome_fantasia').nullable()
      table.string('cnpj').notNullable().unique()
      table.string('email').nullable()
      table.string('cep').nullable()
      table.string('endereco').nullable()
      table.string('numero').nullable()
      table.string('bairro').nullable()
      table.string('complemento').nullable()
      table.string('cidade').nullable()
      table.string('estado').nullable()
      table.string('telefone').nullable()
      table.boolean('status').defaultTo(true)
      table.date('data_de_cadastro').notNullable().default(new Date().toISOString().substr(0, 10))
      table.string('agencia').nullable()
      table.string('conta').nullable()
      table.integer('category_id').nullable().references('id').inTable('categories').onDelete('no action')
      table.timestamps()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompanySchema
