module.exports = (sequelize, Sequelize) => {
    const insight_link = sequelize.define("insights_link", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    });
    return insight_link;
};