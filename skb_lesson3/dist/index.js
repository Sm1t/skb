'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var cors = require('cors');

var app = express();

app.listen(3000, function () {
  console.log('Your app listening on port 3000!');
});
//# sourceMappingURL=index.js.map
