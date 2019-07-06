'use strict'

class StoreCategory {
  get rules () {
    return {
      name: 'required|min:2'
    }
  }

  get messages () {
    return {
      'name.required': 'O nome da categoria é obrigatório',
      'name.min': 'O nome da categoria requer pelo menos 2 caracteres'
    }
  }
}

module.exports = StoreCategory
