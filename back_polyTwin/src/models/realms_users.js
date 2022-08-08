module.exports = (sequelize, Sequelize) => {
    const realms_user = sequelize.define("realms_users", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING,
        },
        lastname: {
            type: Sequelize.STRING,
        },
        username: {
            type: Sequelize.STRING,
        },
        secret: {
            type: Sequelize.STRING
        },
        realm: {
            type: Sequelize.STRING,
        },
        serviceAccount: {
            type: Sequelize.STRING,
        },
        roleId: {
            type: Sequelize.INTEGER,
        },
        created_at: {
            type: Sequelize.STRING
        }
    });
    return realms_user;
};