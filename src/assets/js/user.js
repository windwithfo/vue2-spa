/**
 * @file 用户登录统一处理
 * @author dongkunshan
 */

// const loginUrl = 'http://wap.hwcareer.com/login';
// const loginUrl = 'http://192.168.2.20:8090/login';
const loginUrl = '/login';

const login = (flag, url = window.location.href) => {
    if (!!!flag) {
        window.location.href = loginUrl + '?CallBackUrl=' + encodeURIComponent(url);
    }
};

export default {
    login
};
