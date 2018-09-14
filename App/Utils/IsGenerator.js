/*
 * @Author: fantao.meng 
 * @Date: 2018-09-13 14:20:27 
 * @Last Modified by:   fantao.meng 
 * @Last Modified time: 2018-09-13 14:20:27 
 */

const GeneratorFunction = function * () {}.constructor

export default function isGenerator (f) {
  return f instanceof Function && f instanceof GeneratorFunction
}