/*
 * @Author: fantao.meng
 * @Date: 2018-08-20 18:30:52
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-13 13:46:32
 */
const Config = require('./Config.env.json');
const Env = require('./Env');
const Version = require('./Version.json').version;

const { ClientId, Host, AuthHost } = Config[Env];

module.exports = {
	ClientId, Version, Host, AuthHost
};
