var logger    = require('./tools/logger.js'),
    Sequelize = require('sequelize'),
    config    = require('./config.js'),
    sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
        port: config.mysql.port,
        logging: false,
    })

var User = sequelize.define('user', {
    userid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    courseid: { type: Sequelize.INTEGER, allowNull: false },
    username: { type: Sequelize.STRING(20), allowNull: false },
    passphrase: { type: Sequelize.STRING(255), allowNull: false },
    email: { type: Sequelize.STRING(255), allowNull: false },
    phone: { type: Sequelize.INTEGER, allowNull: false },
    firstname: { type: Sequelize.STRING(50), allowNull: false },
    lastname: { type: Sequelize.STRING(50), allowNull: false },
    lastlogin: Sequelize.DATE,
    isadmin: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    deleted: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    verified: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
    verificationcode: { type: Sequelize.TEXT, allowNull: true }, // generated by API
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'users',
})

var Log = sequelize.define('log', {
    logid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    loggedfrom: { type: Sequelize.STRING(255), allowNull: false },
    message: { type: Sequelize.TEXT, allowNull: false },
    state: { type: Sequelize.ENUM('info', 'notice', 'error'), allowNull: false }
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'logs',
})

var Ad = sequelize.define('ad', {
    adid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userid: { type: Sequelize.INTEGER, allowNull: false },
    courseid: { type: Sequelize.INTEGER, allowNull: false },
    adname: { type: Sequelize.STRING(100), allowNull: false },
    text: { type: Sequelize.TEXT, allowNull: true },
    pinned: { type: Sequelize.DATE, allowNull: true },
    deleted: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'ads',
})

var AdItem = sequelize.define('aditem', {
    aditemid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userid: { type: Sequelize.INTEGER, allowNull: false },
    adid: { type: Sequelize.INTEGER, allowNull: false },
    imageid: { type: Sequelize.INTEGER, allowNull: true },
    price: { type: Sequelize.FLOAT, allowNull: false },
    text: { type: Sequelize.TEXT, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: true },
    isbn: { type: Sequelize.STRING(13), allowNull: true },
    deleted: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    active: { type: Sequelize.INTEGER, defaultValue: 1, allowNull: false },
    buyerid: { type: Sequelize.INTEGER, allowNull: true }
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'aditems',
})

var Course = sequelize.define('course', {
    courseid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    coursename: { type: Sequelize.STRING(60), allowNull: false },
    campusid: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 1 },
    deleted: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'courses',
})

var Interested = sequelize.define('interested', {
    interestedid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userid: { type: Sequelize.INTEGER, allowNull: false },
    aditemid: { type: Sequelize.INTEGER, allowNull: false },
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'interesteds',
})

var University = sequelize.define('university', {
    universityid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    universityname: { type: Sequelize.STRING(60), allowNull: false },
    longitude: { type: Sequelize.FLOAT, allowNull: false },
    latitude: { type: Sequelize.FLOAT, allowNull: false },
    deleted: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'universities',
})

var Campus = sequelize.define('campus', {
    campusid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    campusname: { type: Sequelize.STRING(60), allowNull: false },
    universityid: { type: Sequelize.INTEGER, allowNull: false },
    deleted: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'campuses',
})

var Image = sequelize.define('image', {
    imageid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userid: { type: Sequelize.INTEGER, allowNull: false },
    imageurl: { type: Sequelize.STRING(255), allowNull: false },
    title: { type: Sequelize.STRING(30), allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: true },
    deleted: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    deletehash: { type: Sequelize.STRING(15), allowNull: false },
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'images',
})

var Chat = sequelize.define('chat', {
    chatid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    initiatorid: { type: Sequelize.INTEGER, allowNull: false },
    recipientid: { type: Sequelize.INTEGER, allowNull: false },
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'chats',
})

var ChatMessage = sequelize.define('chatmessage', {
    chatmessageid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userid: { type: Sequelize.INTEGER, allowNull: false },
    chatid: { type: Sequelize.INTEGER, allowNull: false },
    message: { type: Sequelize.TEXT, allowNull: false },
    imageid: { type: Sequelize.INTEGER, allowNull: true },
    deleted: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'chatmessages',
})

var PasswordReset = sequelize.define('passwordreset', {
    passwordresetid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userid: { type: Sequelize.INTEGER, allowNull: false },
    code: { type: Sequelize.STRING(255), allowNull: false },
    active: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'passwordresets',
})

var Curriculum = sequelize.define('curriculum', {
    curriculumid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userid: { type: Sequelize.INTEGER, allowNull: false },
    courseid: { type: Sequelize.INTEGER, allowNull: false },
    booktitle: { type: Sequelize.STRING(255), allowNull: false },
}, {
    createdAt: 'createddate',
    updatedAt: 'updateddate',
    tableName: 'passwordresets',
})

var CurriculumVotes = sequelize.define('curriculumvotes', {
    curriculumvoteid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    active: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    userid: { type: Sequelize.INTEGER, allowNull: false },
    curriculumid: { type: Sequelize.INTEGER, allowNull: false },
})

User.hasMany(Ad, { foreignKey: 'userid' })
User.hasMany(AdItem, { foreignKey: 'userid' })
User.hasMany(AdItem, { foreignKey: 'buyerid' })
User.hasMany(Image, { foreignKey: 'userid' })
User.hasMany(Chat, { foreignKey: 'initiatorid' })
User.hasMany(Chat, { foreignKey: 'recipientid' })
User.hasMany(ChatMessage, { foreignKey: 'userid' })
User.hasMany(PasswordReset, { foreignKey: 'userid' })
User.hasMany(Interested, { foreignKey: 'userid' })
User.hasMany(Curriculum, { foreignKey: 'userid' })
User.hasMany(CurriculumVotes, { foreignKey: 'userid' })
User.belongsTo(Course, { foreignKey: 'courseid' })

University.hasMany(Ad, { foreignKey: 'universityid' })
University.hasMany(Campus, { foreignKey: 'universityid' })

Campus.hasMany(Ad, { foreignKey: 'campusid' })
Campus.hasMany(Course, { foreignKey: 'campusid' })
Campus.belongsTo(University, { foreignKey: 'universityid' })

Course.hasMany(User, { foreignKey: 'courseid' })
Course.hasMany(Ad, { foreignKey: 'courseid' })
Course.hasMany(Curriculum, { foreignKey: 'courseid' })
Course.belongsTo(Campus, { foreignKey: 'campusid' })

Ad.hasMany(AdItem, { foreignKey: 'adid' })
Ad.belongsTo(User, { foreignKey: 'userid' })
Ad.belongsTo(Course, { foreignKey: 'courseid' })

AdItem.hasMany(Interested, { foreignKey: 'aditemid' })
AdItem.belongsTo(Ad, { foreignKey: 'adid', onDelete: 'cascade' })
AdItem.belongsTo(User, { foreignKey: 'userid' })
AdItem.belongsTo(User, { foreignKey: 'buyerid' })
AdItem.belongsTo(Image, { foreignKey: 'imageid' })

Interested.belongsTo(AdItem, { foreignKey: 'aditemid' })
Interested.belongsTo(User, { foreignKey: 'userid' })

Image.hasMany(AdItem, { foreignKey: 'imageid' })
Image.belongsTo(User, { foreignKey: 'userid' })

Chat.hasMany(ChatMessage, { foreignKey: 'chatid' })
Chat.belongsTo(User, { as: 'Initiator', foreignKey: 'initiatorid' })
Chat.belongsTo(User, { as: 'Recipient', foreignKey: 'recipientid' })

ChatMessage.belongsTo(Chat, { foreignKey: 'chatid' })
ChatMessage.belongsTo(User, { foreignKey: 'userid' })

PasswordReset.belongsTo(User, { foreignKey: 'userid' })

Curriculum.hasMany(CurriculumVotes, { foreignKey: 'curriculumid' })
Curriculum.belongsTo(User, { foreignKey: 'userid' })
Curriculum.belongsTo(Course, { foreignKey: 'courseid' })

CurriculumVotes.belongsTo(User, { foreignKey: 'userid' })
CurriculumVotes.belongsTo(Curriculum, { foreignKey: 'curriculumid' })

module.exports = {
    sequelize: sequelize,
    user: User,
    ad: Ad,
    aditem: AdItem,
    course: Course,
    university: University,
    campus: Campus,
    interested: Interested,
    chat: Chat,
    chatmessage: ChatMessage,
    image: Image,
    log: Log,
    passwordreset: PasswordReset,
    curriculum: Curriculum,
}
