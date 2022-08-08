module.exports = (sequelize, Sequelize) => {
    const attribute = sequelize.define("attributes", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        value: {
            type: Sequelize.INTEGER
        },
        created_at: {
            type: Sequelize.STRING
        },
        selected: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    return attribute;
};