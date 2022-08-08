module.exports = (sequelize, Sequelize) => {
    const asset = sequelize.define("assets", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        version: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        createdOn: {
            type: Sequelize.STRING
        },
        accessPublicRead: {
            type: Sequelize.STRING
        },
        created_at: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        }
    });
    return asset;
};