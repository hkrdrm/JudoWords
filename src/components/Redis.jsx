import request  from 'superagent'
import config   from 'config'
import cookie   from 'js-cookie'

class Redis{

  static getString (key) {
    return new Promise((resolve, reject) => {
      request
        .post( `${config.api}/snapconnect_api/redis/get/` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .send({key: key})
        .end( (err,res) => {
          err ? reject(err) : resolve(res.body)
        })
      })
  }
  static setString(key, val){
    return new Promise((resolve, reject) => {
      request
        .post( `${config.api}/snapconnect_api/redis/set` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .send({key: key, val: val})
        .end( (err,res) => {
          err ? reject(err) : resolve(res.text)
        })
    })
  }
}



export default Redis