/** Configuration File
 **/

module.exports = {
    port: process.env.PORT || 5000,
    database: 'mongodb://localhost:27017/boilerplate',
    jwt_secret: 'testinglocalsecret',
    bcrypt_salt_rounds: 12
}