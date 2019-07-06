'use strict'

class UpdateCompany {
  get rules () {
    return {
      // razao_social: 'required|min:5|unique:companies,razao_social'
    }
  }

  get messages () {
    return {
      // 'razao_social.required': 'Razão social é obrigatório',
      // 'razao_social.min': 'Razão social deve ter pelo menos 5 caracteres',
      // 'razao_social.unique': 'Razão social duplicada'
    }
  }
}

module.exports = UpdateCompany
