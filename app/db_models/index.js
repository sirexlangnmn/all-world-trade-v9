const dbConfig = require('../config/db.config.js');
const sequelizeConfig = require('../config/sequelize.config.js');

let Sequelize = sequelizeConfig.Sequelize;
let sequelize = sequelizeConfig.sequelize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// this 2 lines of code will be delete later on
db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize);
db.tutorial2s = require('./tutorial2.model.js')(sequelize, Sequelize);


db.reset_tokens = require('./reset_tokens.model.js')(sequelize, Sequelize);
db.support_accounts = require('./support_accounts.model.js')(sequelize, Sequelize);
db.support_links = require('./support_links.model.js')(sequelize, Sequelize);
db.support_messages = require('./support_messages.model.js')(sequelize, Sequelize);
db.traders_visitors = require('./traders_visitors.model.js')(sequelize, Sequelize);
db.users_business_characteristics = require('./users_business_characteristics.model.js')(sequelize, Sequelize);
db.users_business_medias = require('./users_business_medias.model.js')(sequelize, Sequelize);
db.users_business_visibility = require('./users_business_visibility.model.js')(sequelize, Sequelize);


db.users_accounts = require('./users_accounts.model.js')(sequelize, Sequelize);
db.users_address = require('./users_address.model.js')(sequelize, Sequelize);
db.users_businesses = require('./users_businesses.model.js')(sequelize, Sequelize);
db.users = require('./users.model.js')(sequelize, Sequelize);

module.exports = db;
