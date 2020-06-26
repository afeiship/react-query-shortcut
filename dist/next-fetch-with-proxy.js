/*!
 * name: @feizheng/next-fetch-with-proxy
 * description: Fetch with proxy options.
 * homepage: https://github.com/afeiship/next-fetch-with-proxy
 * version: 1.0.0
 * date: 2020-06-26T08:21:45.615Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var ProxyAgent = require('proxy-agent');
  var DEFAULT_OPTIONS = { proxy: null };

  nx.fetchWithProxy = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      options.agent = options.proxy ? new ProxyAgent(options.proxy) : null;
      return inFetch(inUrl, options);
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithProxy;
  }
})();

//# sourceMappingURL=next-fetch-with-proxy.js.map
