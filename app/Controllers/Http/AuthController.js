'use strict'

const Mail = use('Mail')
const User = use('App/Models/User')

class AuthController {
  async register ({ request, response }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    await Mail.send('emails.welcome', user.toJSON(), message => {
      message
        .to(user.email)
        .from('geek1on1@gmail.com')
        .subject('Seja muito bem-vindo!')
    })
    return response.status(201).json(user)
  }

  async login ({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return response.status(200).json(token)
  }
}

module.exports = AuthController
