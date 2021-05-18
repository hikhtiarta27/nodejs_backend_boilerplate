var _res = require("../config/resConfig")
const { Order, User } = require("../models")
const { dateToString, isEmail, hashPassword } = require("../helper")
const { Logger } = require("../log")

/**
 *
 * @param {String} email
 * @returns
 */
function getOrder(userId = "") {
  return new Promise((resolve, reject) => {
    Order.findAll({
      where: {
        userId,
      },      
    })
      .then((res) => {        
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = {
  
  async getOrder(req, res) {
    let orderList = await getOrder(req.body.userId)
    orderList.forEach((item, index, arr)=>{
      arr[index] = {
        id: item.id,
        status: item.status,
        createdAt: dateToString(item.createdAt),
        updatedAt: dateToString(item.updatedAt),
      }
    })
    _res.error = false
    _res.message = 'Get order by userId'
    _res.result = orderList
    res.status(200).send(_res)
  },

}
