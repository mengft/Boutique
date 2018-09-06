/*
 * @Author: fantao.meng
 * @Date: 2018-08-20 18:30:52
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-20 18:33:24
 */
const Config = require('./Config.env.json');
const Env = require('./Env');

const { ClientId, Host } = Config[Env];

module.exports = {
	ClientId, Host,
};
