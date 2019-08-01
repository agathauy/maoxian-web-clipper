;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define('MxWcHandlerBg', [
      'MxWcConfig',
      'MxWcHandler',
      'MxWcClippingHandler_Browser',
      'MxWcClippingHandler_NativeApp',
      'MxWcClippingHandler_WizNotePlus',
    ], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CJS
    module.exports = factory(
      require('../lib/mx-wc-config.js'),
      require('../lib/mx-wc-handler.js'),
      require('./clipping-handler-browser.js'),
      require('./clipping-handler-native-app.js'),
      require('./clipping-handler-wiznoteplus.js')
    );
  } else {
    // browser or other
    root.MxWcHandlerBg = factory(
      root.MxWcConfig,
      root.MxWcHandler,
      root.MxWcClippingHandler_Browser,
      root.MxWcClippingHandler_NativeApp,
      root.MxWcClippingHandler_WizNotePlus
    );
  }
})(this, function(MxWcConfig, MxWcHandler,
    ClippingHandler_Browser,
    ClippingHandler_NativeApp,
    ClippingHandler_WizNotePlus,
    undefined) {
  "use strict";

  function initialize() {
    MxWcConfig.load().then((config) => {
      updateNativeAppConfiguration(config);
    });
  }

  // Native App Config may changed, update it
  function updateNativeAppConfiguration(config){
    const handler = get(config.clippingHandler)
    if(handler.name === 'NativeApp') {
      Log.debug('updateNativeAppConfig');
      handler.initDownloadFolder();
    }
  }

  /*
   * Only avariable in background.
   *
   */
  function get(name) {
    switch(name){
      case 'Browser':
        return ClippingHandler_Browser;
        break;
      case 'NativeApp':
        return ClippingHandler_NativeApp;
        break;
      case 'WizNotePlus':
        return ClippingHandler_WizNotePlus;
        break;
      default:
        // console.debug("Name illegal: ", name);
        // throw new Error("Name illegal: " + name);
        return ClippingHandler_Browser;
    }
  }

  function isReady(exp) {
    return MxWcHandler.isReady(exp, 'background');
  }

  return {
    get: get,
    isReady: isReady,
    initialize: initialize,
  }

});
