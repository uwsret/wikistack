const Sequelize = require("sequelize");
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

const Page = db.define("Pages", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false 
    },
    status: Sequelize.ENUM('open', 'closed')
})

const User = db.define("Users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

Page.belongsTo(User, {as: "author", foreignKey: "authorId"});

Page.beforeValidate(instance => {
    instance.slug = instance.title.replace(/\s/g, "_");
}) 




module.exports = {
    db, User, Page
}