module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        add_insights: {
            type: Sequelize.BOOLEAN
        },
        modify_insights: {
            type: Sequelize.BOOLEAN
        },
        access_backend: {
            type: Sequelize.BOOLEAN
        },
        add_project: {
            type: Sequelize.BOOLEAN
        },
        add_User: {
            type: Sequelize.BOOLEAN
        }
    });
    return Role;
};