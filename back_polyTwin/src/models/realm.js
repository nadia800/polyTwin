const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const realm = sequelize.define("realms", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        realmName: {
            type: Sequelize.STRING
        },
        friendlyName: {
            type: Sequelize.STRING
        },
        categorie: {
            type: Sequelize.STRING
        },
        subcategorie: {
            type: Sequelize.STRING
        },
        created_at: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        }
    });
    return realm;
};