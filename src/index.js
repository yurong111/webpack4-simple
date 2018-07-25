import _ from 'lodash';
import axios from 'axios'

function component() {
    accentControl()
    // accentControl_backend()

    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
}

// 非后台处理跨域时调用
function accentControl() {
    axios.post('http://localhost:3000/api/post')
    
    axios.request({
        url: 'http://localhost:3000/api/login',
        method: 'GET',
    }).then((res) => {
        console.log('res', res)
    })
}

// 后台处理跨域时调用
function accentControl_backend() {
    axios.post('http://localhost:3001/api/post')    // 简单请求
    axios.request({
        url: 'http://localhost:3001/api/login',
        method: 'GET',
        // withCredentials: true,  // 带认证的请求，前后端都需要设置该参数，才能让浏览器在不同源的情况下自动读取cookie，后来验证不需要传递也可以
        headers: {'X-Requested-With': 'XMLHttpRequest'}, // 增加特殊头，触发非简单请求
    }).then((res) => {
        console.log('res', res)
    })
}

document.body.appendChild(component());