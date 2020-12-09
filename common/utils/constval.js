/**
 * 常量
 */
export default {
    'UPLOAD_IMG_URL': 'https://dev.xinxiichina.com/', //测试
    // 'UPLOAD_IMG_URL': 'https://www.xinxiichina.com/', //正式
    'STORE_AUTH_NAME': 'mall_auth',
    'STORE_USER_NAME': 'mall_user',
    'STORE_FIRST_URL': 'mall_first_url',
    'STORE_BACK_URL': 'mall_b_url',
    'STORE_ZHICHI_UNREAD': 'zhichi_unread',
    'PHONE_EXP_86': /^1[3-9][0-9]{9}$/, // 中国
    'PHONE_EXP_852': /^(9|6)[0-9]{7}$/, // 中国香港9或6开头后面跟7位数字
    'PHONE_EXP_853': /^6[0-9]{7}$/, // 中国澳门6开头后面跟7位数字
    'PHONE_EXP_886': /^09[0-9]{8}$/, // 中国台湾09开头后面跟8位数字
    'PHONE_EXP_0': /^[0-9]+$/, // 海外
    'QQ_EXP': /^[1-9][0-9]{4,}$/, // QQ
    'NUM_EXP': /^(\d+[\s,]*)+\.?\d*$/, // 数值
    'EMAIL_EXP': /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, // 邮箱
    'STORE_TRACE_LIKE': 'trace_like'
}
