const Schema = require('mongoose').Schema;

module.exports = {
  mongo: {
    db: 'blog-server',
    host: 'localhost',
    port: 27017,
    writeConcern: -1,
    collections: ['publish-notebook', 'draft-notbook','note-list','note-file']
  },
  schema: [{
    schemaName: 'article',
    schemaRule:{
      noteList: {
        Lid: Schema.Types.ObjectId,
        name: String
      },
      noteName: String,
      noteLink: String,
      publish: Boolean,
    }
  },{
    schemaName: 'articleBook',
    schemaRule: {
      name: String
    }
  }]
}
