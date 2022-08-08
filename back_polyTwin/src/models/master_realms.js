module.exports = (sequelize, Sequelize) => {
    const master_realm = sequelize.define("master_realms", {
        username: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING
        },
        secret: {
            type: Sequelize.STRING
        },
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.NUMERIC
        },
        jobtitle: {
            type: Sequelize.STRING
        },
        company_name: {
            type: Sequelize.STRING
        },
        country_name: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        state_province: {
            type: Sequelize.STRING
        },
        postal_code: {
            type: Sequelize.INTEGER
        },
        serviceAccount: {
            type: Sequelize.STRING
        },
        realm: {
            type: Sequelize.STRING
        },
        created_at: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        }
    });
    return master_realm;
};