//Initialize Sequelize

const config = require("../config/db");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,                                                                                                                                                                  
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.web_master = require("../models/web_master")(sequelize, Sequelize);
db.master_realm = require("../models/master_realms")(sequelize, Sequelize);
db.realm_user = require("../models/realms_users")(sequelize, Sequelize);
db.realm = require("../models/realm")(sequelize, Sequelize);
db.role = require("../models/roles.js")(sequelize, Sequelize);

db.insight = require("../models/insights")(sequelize, Sequelize);
db.insight_link = require("../models/insights_link")(sequelize, Sequelize);
db.asset = require("../models/assets")(sequelize, Sequelize);
db.attribute = require("../models/attributes")(sequelize, Sequelize);

/*  web_masters Table:
        web_master peut creer un ou plusieur master_realm
        un role appartient un un seul web_master 
*/
db.web_master.hasMany(db.master_realm, { as : "web_master" });
db.web_master.belongsTo(db.role, {
    foreignKey: "roles_id",
    as: "role"
})

/*  master_realms Table
        master_realm peut creer un ou plusieur realm
        un role appartient un un seul master_realm
*/
db.master_realm.hasMany(db.realm, { as: "master_realm" })
db.master_realm.belongsTo(db.role, {
    foreignKey: "roles_id",
    as: "role"
})

/* insights Table
    un realm contient un ou plusieur insights
    un insight contient un ou plusieurs insights link
*/
db.realm.hasMany(db.insight, { as: "insigh_realm" });
db.insight.hasMany(db.insight_link, { as: "insight" });

/* assets Table
    un realm contient un ou plusieur assets
    un asset contient un ou plusieur insights link
*/
db.realm.hasMany(db.asset, { as: "asset_realm" });
db.asset.hasMany(db.insight_link, { as: "insightLink_asset" });

/* attributes Table
    un assets contient un ou plusieur attributes
    un attribute contient un ou plusieur insights link
*/
db.asset.hasMany(db.attribute, { as: "attribute_asset" })
db.attribute.hasMany(db.insight_link, { as: "attribute" })

module.exports = db;