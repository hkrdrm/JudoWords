import request  from 'superagent'
import config   from 'config'
import cookie   from 'js-cookie'
import _        from 'lodash'

class PhoneFormat{

  static format_number(phone){
    if(phone == null || phone == ''){ return ''}
    let f_phone = null
    if(phone.length != 12){
      f_phone = `(${phone.substring(0,3)}) ${phone.substring(3,6)}-${phone.substring(6)}`
      return f_phone
    }
    return phone
  }

  static strip_formatting(phone){
    phone = _.replace(phone, '-', '')
    phone = _.replace(phone, '(', '')
    phone = _.replace(phone, ')', '')
    phone = _.replace(phone, ' ', '')

    return phone
  }

}



export default PhoneFormat
