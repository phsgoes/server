'use strict'

class RegisterUser {
  get rules () {
    return {
      username: 'required|min:2',
      email: 'required|email|unique:users,email',
      password: 'required|min:6'
    }
  }

  get messages () {
    return {
        'username.required': 'Nome de usuário é obrigatório',
        'username.min': 'Nome de usuário deve ter pelo menos 2 caracteres',
        'email.required': 'E-mail é obrigatório',
        'email.email': 'Forneça um e-mail válido',
        'email.unique': 'Este e-mail já existe',
        'password.required': 'Senha é obrigatório',
        'password.min': 'A senha deve ter pelo menos 6 caracteres'
    }
  }
}

module.exports = RegisterUser
