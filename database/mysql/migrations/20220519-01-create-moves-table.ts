import { QueryInterface, DataTypes, literal } from 'sequelize';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable('moves', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            first: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            second: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            third: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: true,
                type: DataTypes.DATE,
                defaultValue: literal('CURRENT_TIMESTAMP'),
            },
            createdBy: {
                allowNull: true,
                type: DataTypes.INTEGER().UNSIGNED,
            },
            updatedAt: {
                allowNull: true,
                type: DataTypes.DATE,
                defaultValue: literal('CURRENT_TIMESTAMP'),
            },
            updatedBy: {
                allowNull: true,
                type: DataTypes.INTEGER().UNSIGNED,
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE,
            },
        });
//        return queryInterface.sequelize.query(
//            'CREATE TRIGGER file_before_update BEFORE UPDATE ON files FOR EACH ROW SET NEW.updatedAt = NOW();',
//        );
    },
};
