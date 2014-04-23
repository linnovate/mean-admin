'use strict';

// Tokens routes use tokens controller
var tokens = require('../controllers/tokens');

module.exports = function(Tokens, app, auth) {

    app.get('/tokens', tokens.all);
    app.post('/tokens', auth.requiresAdmin, tokens.create);
    app.get('/tokens/id/:tokenId', tokens.show);
    app.put('/tokens/id/:tokenId', auth.requiresAdmin, tokens.update);
    app.del('/tokens/id/:tokenId', auth.requiresAdmin, tokens.destroy);
    
    app.get('/tokens/title', tokens.all);
    app.post('/tokens/title/:title', auth.requiresAdmin, tokens.create);
    app.get('/tokens/title/:title', tokens.search);
    app.put('/tokens/title/:title', auth.requiresAdmin, tokens.updateByTitle);
    app.del('/tokens/title/:title', auth.requiresAdmin, tokens.destroyByTitle);
    
    app.get('/tokens/category', tokens.all);
    app.post('/tokens/category/:category', auth.requiresAdmin, tokens.create);
    app.get('/tokens/category/:category', tokens.all);
    app.put('/tokens/category/:category', auth.requiresAdmin, tokens.updateByCategory);

    // Finish with setting up the tokenId param
    app.param('tokenId', tokens.token);

};