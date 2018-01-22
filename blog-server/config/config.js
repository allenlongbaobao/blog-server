module.exports = {
  mongo: {
    db: 'blog-server',
    host: 'localhost',
    port: 27017,
    writeConcern: -1,
    collections: ['publish-notebook', 'draft-notbook','note-list','note-file']
  }
}
