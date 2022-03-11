const config = require('../../db/index');

module.exports = () => {
    return Promise.all(Object.keys(config.connection()).map(key => {
        return config.models[key].destroy({truncate: true, force: true});
    }));
}