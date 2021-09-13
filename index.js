const { version, name } = require('./package.json');
const { httpServer } = require('./api/http')
require('./api/controller/user.controller')

httpServer.listen(3333, () => console.log(`${name} v${version} was is running on PORT 3333`));