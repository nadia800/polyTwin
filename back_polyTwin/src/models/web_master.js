module.exports = (sequelize, Sequelize) => {
    const web_master = sequelize.define("web_master", {
        username: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        secret: {
            type: Sequelize.STRING
        }
    });
    return web_master;
};