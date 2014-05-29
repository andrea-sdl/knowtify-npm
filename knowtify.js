// Generated by CoffeeScript 1.7.1
(function() {
  var Contacts, GlobalData, OPTS, http;

  http = require('http');

  OPTS = {
    host: 'www.knowtify.io',
    port: 80,
    prefix: '/api/v1/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Knowtify-Node/0.1'
    }
  };

  exports.Knowtify = (function() {
    function Knowtify(token, debug) {
      this.token = token != null ? token : null;
      this.debug = debug != null ? debug : false;
      this.contacts = new Contacts(this);
      this.globalData = new GlobalData(this);
      if (this.token === null) {
        this.token = process.env['KNOWTIFY_TOKEN'];
      }
    }

    Knowtify.prototype.call = function(uri, params, onresult, onerror) {
      var req;
      if (params == null) {
        params = {};
      }
      params = new Buffer(JSON.stringify(params), 'utf8');
      if (this.debug) {
        console.log("Knowtify: Opening request to http://" + OPTS.host + OPTS.prefix + uri);
      }
      OPTS.path = "" + OPTS.prefix + uri;
      OPTS.headers['Content-Length'] = params.length;
      OPTS.headers['Authorization'] = 'Token token="' + this.token + '"';
      req = http.request(OPTS, (function(_this) {
        return function(res) {
          var json;
          res.setEncoding('utf8');
          json = '';
          res.on('data', function(d) {
            return json += d;
          });
          return res.on('end', function() {
            var e;
            try {
              json = JSON.parse(json);
            } catch (_error) {
              e = _error;
              json = {
                status: 'error',
                name: 'GeneralError',
                message: e
              };
            }
            if (json == null) {
              json = {
                status: 'error',
                name: 'GeneralError',
                message: 'An unexpected error occurred'
              };
            }
            if (res.statusCode !== 200) {
              if (onerror) {
                return onerror(json);
              } else {
                return _this.onerror(json);
              }
            } else {
              if (onresult) {
                return onresult(json);
              }
            }
          });
        };
      })(this));
      if (this.debug) {
        console.log("" + params);
      }
      req.write(params);
      req.end();
      req.on('error', (function(_this) {
        return function(e) {
          if (onerror) {
            return onerror(e);
          } else {
            return _this.onerror({
              status: 'error',
              name: 'GeneralError',
              message: e
            });
          }
        };
      })(this));
      return null;
    };

    Knowtify.prototype.onerror = function(err) {
      throw {
        name: err.name,
        message: err.message,
        toString: function() {
          return "" + err.name + ": " + err.message;
        }
      };
    };

    return Knowtify;

  })();

  Contacts = (function() {
    function Contacts(master) {
      this.master = master;

      /*
      Adds a new contact, it also supports batch inserts
      @param {Object} params the parameters to pass to the request
      @param {Function} onsuccess an optional callback to execute when the API call is successfully made
      @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
       */
    }

    Contacts.prototype.add = function(params, onsuccess, onerror) {
      if (params == null) {
        params = {};
      }
      if (typeof params === 'function') {
        onerror = onsuccess;
        onsuccess = params;
        params = {};
      }
      return this.master.call('contacts/add', params, onsuccess, onerror);
    };


    /*
    Edit a contact by matching the email address, it also supports batch updates
    @param {Object} params the parameters to pass to the request
    @param {Function} onsuccess an optional callback to execute when the API call is successfully made
    @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
     */

    Contacts.prototype.edit = function(params, onsuccess, onerror) {
      if (params == null) {
        params = {};
      }
      if (typeof params === 'function') {
        onerror = onsuccess;
        onsuccess = params;
        params = {};
      }
      return this.master.call('contacts/edit', params, onsuccess, onerror);
    };


    /*
    Deletes a contact
    @param {Object} params the parameters to pass to the request
    @param {Function} onsuccess an optional callback to execute when the API call is successfully made
    @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
     */

    Contacts.prototype["delete"] = function(params, onsuccess, onerror) {
      if (params == null) {
        params = {};
      }
      if (typeof params === 'function') {
        onerror = onsuccess;
        onsuccess = params;
        params = {};
      }
      return this.master.call('contacts/delete', params, onsuccess, onerror);
    };


    /*
    This is a mix between add and edit. If the email is new to Knowtify it will add a contact, otherwise it will merge the contact information
    @param {Object} params the hash of the parameters to pass to the request
    @param {Function} onsuccess an optional callback to execute when the API call is successfully made
    @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
     */

    Contacts.prototype.upsert = function(params, onsuccess, onerror) {
      if (params == null) {
        params = {};
      }
      if (typeof params === 'function') {
        onerror = onsuccess;
        onsuccess = params;
        params = {};
      }
      return this.master.call('contacts/upsert', params, onsuccess, onerror);
    };

    return Contacts;

  })();

  GlobalData = (function() {
    function GlobalData(master) {
      this.master = master;
    }


    /*
    Edit the global data, global data are shared informations across your account.
    You can use them in any email.
    If the data is new, it will create a new record.
    @param {Object} params the hash of the parameters to pass to the request
    @param {Function} onsuccess an optional callback to execute when the API call is successfully made
    @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
     */

    GlobalData.prototype.edit = function(params, onsuccess, onerror) {
      if (params == null) {
        params = {};
      }
      if (typeof params === 'function') {
        onerror = onsuccess;
        onsuccess = params;
        params = {};
      }
      return this.master.call('data/edit', params, onsuccess, onerror);
    };

    return GlobalData;

  })();

}).call(this);

//# sourceMappingURL=knowtify.map