
http = require 'http'

OPTS = {
  host:   'www.knowtify.io',
  port:   80,
  prefix: '/api/v1/',
  method: 'POST',
  headers: {'Content-Type': 'application/json', 'User-Agent': 'Knowtify-Node/0.1'}
}

class exports.Knowtify
  constructor: (@token=null, @debug=false) ->
    @contacts = new Contacts(this)
    @globalData = new GlobalData(this)

    if @token == null then @token = process.env['KNOWTIFY_TOKEN']

  call: (uri, params={}, onresult, onerror) ->

    params = new Buffer(JSON.stringify(params), 'utf8')

    if @debug then console.log("Knowtify: Opening request to http://#{OPTS.host}#{OPTS.prefix}#{uri}")
    OPTS.path = "#{OPTS.prefix}#{uri}"
    OPTS.headers['Content-Length'] = params.length
    OPTS.headers['Authorization'] = 'Token token="'+@token+'"'

    req = http.request(OPTS, (res) =>
      res.setEncoding('utf8')
      json = ''
      res.on('data', (d) =>
        json += d
      )

      res.on('end', =>
        try
          json = JSON.parse(json)
        catch e
          json = {status: 'error', name: 'GeneralError', message: e}

        json ?= {status: 'error', name: 'GeneralError', message: 'An unexpected error occurred'}
        if res.statusCode != 200
          if onerror then onerror(json) else @onerror(json)
        else
          if onresult then onresult(json)
      )
    )

    if @debug then console.log("#{params}")

    req.write(params)
    req.end()
    req.on('error', (e) =>
      if onerror then onerror(e) else @onerror({status: 'error', name: 'GeneralError', message: e})
    )

    return null

  onerror: (err) ->
    throw {name: err.name, message: err.message, toString: -> "#{err.name}: #{err.message}"}

class Contacts
  constructor: (@master) ->

    ###
    Adds a new contact, it also supports batch inserts
    @param {Object} params the parameters to pass to the request
    @param {Function} onsuccess an optional callback to execute when the API call is successfully made
    @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
    ###
  add: (params={}, onsuccess, onerror) ->
    if typeof params == 'function'
      onerror = onsuccess
      onsuccess = params
      params = {}

    @master.call('contacts/add', params, onsuccess, onerror)

  ###
  Edit a contact by matching the email address, it also supports batch updates
  @param {Object} params the parameters to pass to the request
  @param {Function} onsuccess an optional callback to execute when the API call is successfully made
  @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
  ###
  edit: (params={}, onsuccess, onerror) ->
    if typeof params == 'function'
      onerror = onsuccess
      onsuccess = params
      params = {}

    @master.call('contacts/edit', params, onsuccess, onerror)

  ###
  Deletes a contact
  @param {Object} params the parameters to pass to the request
  @param {Function} onsuccess an optional callback to execute when the API call is successfully made
  @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
  ###
  delete: (params={}, onsuccess, onerror) ->
    if typeof params == 'function'
      onerror = onsuccess
      onsuccess = params
      params = {}

    @master.call('contacts/delete', params, onsuccess, onerror)

  ###
  This is a mix between add and edit. If the email is new to Knowtify it will add a contact, otherwise it will merge the contact information
  @param {Object} params the hash of the parameters to pass to the request
  @param {Function} onsuccess an optional callback to execute when the API call is successfully made
  @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
  ###
  upsert: (params={}, onsuccess, onerror) ->
    if typeof params == 'function'
      onerror = onsuccess
      onsuccess = params
      params = {}

    @master.call('contacts/upsert', params, onsuccess, onerror)

class GlobalData
  constructor: (@master) ->

  ###
  Edit the global data, global data are shared informations across your account.
  You can use them in any email.
  If the data is new, it will create a new record.
  @param {Object} params the hash of the parameters to pass to the request
  @param {Function} onsuccess an optional callback to execute when the API call is successfully made
  @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
  ###
  edit: (params={}, onsuccess, onerror) ->
    if typeof params == 'function'
      onerror = onsuccess
      onsuccess = params
      params = {}

    @master.call('data/edit', params, onsuccess, onerror)