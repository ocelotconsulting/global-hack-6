import Auth0Lock from 'auth0-lock'
import {EventEmitter} from 'events'
import qs from 'querystring'
import Base64 from 'Base64'

export default class AuthService extends EventEmitter {
  constructor (clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      additionalSignUpFields: [{
        name: 'address', // required
        placeholder: 'enter your address', // required
        icon: 'http://cdn-img.easyicon.net/png/5615/561593.gif', // optional
        // only accept addresses with more than 10 chars
        validator: (value) => value.length > 10
      }],
      languageDictionary: {
        title: 'Hack Homeless'
      },
      theme: {
        logo: 'https://www.ccstl.org/wp-content/uploads/2014/08/stpatrickcntr_logo.png',
        primaryColor: 'green'
      }
    })
    this.domain = domain
    this.clientID = clientId
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    this.login = this.login.bind(this)
  }

  _doAuthentication ({idToken}) {
        // Saves the user token
    this.setToken(idToken)
    this.lock.getProfile(idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.setProfile(profile)
      }
    })
  }

  parseAuthHash (hash) {
    const authResult = this.parseHash(hash)
    if (authResult && authResult.idToken) {
      this._doAuthentication(authResult)
    }
  }

  login () {
    this.lock.show()
  }

  loggedIn () {
    return !!this.getToken()
  }

  logout () {
    // Clear user token and profile data from localStorage
    delete localStorage.id_token
    delete localStorage.profile
  }

  setToken (idToken) {
    localStorage.id_token = idToken
  }

  getToken () {
    return localStorage.id_token
  }

  setProfile (profile) {
    localStorage.profile = JSON.stringify(profile)
    this.emit('profile_updated', profile)
  }

  getProfile () {
    const {profile} = localStorage
    return profile ? JSON.parse(profile) : {}
  }

  updateProfile (userId, data) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken() // setting authorization header
    }
    // making the PATCH http request to auth0 api
    return fetch(`https://${this.domain}/api/v2/users/${userId}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data)
    }).then(
      response => response.json()
    ).then(
      newProfile => this.setProfile(newProfile)
    )
  }

  decodeB64URL (str) {
    // Add removed at end '='
    str += Array(5 - str.length % 4).join('=')

    str = str
        .replace(/\-/g, '+') // Convert '-' to '+'
        .replace(/_/g, '/') // Convert '_' to '/'

    return Base64.atob(str)
  }

  decodeJwt (jwt) {
    const encoded = jwt && jwt.split('.')[1]
    return JSON.parse(this.decodeB64URL(encoded))
  }

  parseHash (rawHash) {
    let hash = rawHash || window.location.hash
    hash = hash.substr(1).replace(/^\//, '')
    const parsedQS = qs.parse(hash)
    if (parsedQS.hasOwnProperty('error')) {
      return Object.assign({
        error: parsedQS.error,
        error_description: parsedQS.error_description
      }, parsedQS.state && {state: parsedQS.state})
    }

    if (!parsedQS.hasOwnProperty('access_token') &&
      !parsedQS.hasOwnProperty('id_token') &&
      !parsedQS.hasOwnProperty('refresh_token')) {
      return null
    }

    let prof

    if (parsedQS.id_token) {
      const invalidJwt = (error) => ({
        error: 'invalid_token',
        error_description: error
      })

      prof = this.decodeJwt(parsedQS.id_token)

      // aud should be the clientID
      const audiences = Array.isArray(prof.aud) ? prof.aud : [prof.aud]
      if (audiences.indexOf(this.clientID) === -1) {
        return invalidJwt(`The clientID configured ${this.clientID} does not match with the clientID set in the token ${audiences.join(', ')}).`)
      }

      const domainUrl = `https://${this.domain}/`

      // iss should be the Auth0 domain (i.e.: https://contoso.auth0.com/)
      if (prof.iss && prof.iss !== domainUrl) {
        return invalidJwt(`The domain configured (${domainUrl}) does not match with the domain set in the token (${prof.iss}).`)
      }
    }

    return {
      accessToken: parsedQS.access_token,
      idToken: parsedQS.id_token,
      idTokenPayload: prof,
      refreshToken: parsedQS.refresh_token,
      state: parsedQS.state
    }
  }

  hasRole(role) {
    const profile = this.getProfile()
    const { roles } = profile.app_metadata || {}
    return !!roles && roles.indexOf(role) > -1
  }
}
