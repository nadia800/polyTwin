module.exports = (sequelize, Sequelize) => {
    const insight = sequelize.define("insights", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        categorie: {
            type: Sequelize.STRING
        },
        time_frame: {
            type: Sequelize.STRING
        },
        number_day: {
            type: Sequelize.INTEGER
        },
        start_date: {
            type: Sequelize.DATE
        },
        created_at: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        }
    });
    return insight;
};