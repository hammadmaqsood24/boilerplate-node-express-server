const LocalConfig = require('./EnvConfigs/local')
const LiveConfig = require('./EnvConfigs/live')
const DevConfig = require('./EnvConfigs/dev')

function getConfig() {
    const env = process.env.NODE_ENV || 'local'
    switch (env.trim()) {
        case 'local':
            return LocalConfig
        case 'dev':
            return DevConfig
        case 'live':
            return LiveConfig
    }
}

module.exports = getConfig()