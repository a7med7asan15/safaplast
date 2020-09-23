const natIdValidator = {
  
  isNatIdYear:(e)=>{
    var s = e.substring(0, 1);
    if (2 == parseInt(s)) {return true}
    else if(3 != parseInt(s)){ return false}
    
  },
  isNatIdDate:(e)=>{
    var r = e.substring(1, 3);
    var g = e.substring(3, 5);
    var t = e.substring(5, 7);
    r = "19" + r;
    var _ = Date.parse(r + "-" + g + "-" + t);
    if(isNaN(_)){
      return false
    }
    return true
  },
  isNatGovernate :(e)=>{
    var result;
    switch(e.substring(7, 9)){
      case "01":
        result = true;
        break;
        case "02":
          result = true;
          break;
          case "03":
            result = true;
            break;
            case "04":
              result = true;
              break;
              case "06":
                result = true;
                break;
                case "11":
                  result = true;
                  break;
                  case "12":
                    result = true;
                    break;
                    case "13":
                      result = true;
                      break;
                      case "14":
                        result = true;
                        break;
                        case "15":
                          result = true;
                          break;
                          case "16":
                            result = true;
                            break;
                            case "17":
                              result = true;
                              break;
                              case "18":
                                result = true;
                                break;
                                case "19":
                                  result = true;
                                  break;
                                  case "21":
                                    result = true;
                                    break;
                                    case "22":
                                      result = true;
                                      break;
                                      case "23":
                                        result = true;
                                        break;
                                        case "24":
                                          result = true;
                                          break;
        case "25":
          result = true;
          break;
          case "26":
            result = true;
            break;
            case "27":
              result = true;
              break;
              case "28":
                result = true;
                break;
                case "29":
                  result = true;
                  break;
                  case "31":
                    result = true;
                    break;
                    case "32":
                      result = true;
                      break;
                      case "33":
                        result = true;
                        break;
                        case "34":
                          result = true;
                          break;
                          case "35":
                            result = true;
                            break;
                            case "88":
                              result = true;
                              break;
                              default:
                                return result = false
                              }
                              return result
                            }
                            
                          }
                            var natId = function (req, res, next) {
                              const d = req.body.natId
                              if(natIdValidator.isNatIdYear(d)){
                                if(natIdValidator.isNatIdDate(d)){
                                  if(natIdValidator.isNatGovernate(d)){
                                     return next()
                                  }
                                }
                              }
                              return res.status(200).json({er:true, no:5, message:'خطاء فى الرقم القومى ',token:'' })

                            }
                            
                            
                            
                            
                            module.exports = natId