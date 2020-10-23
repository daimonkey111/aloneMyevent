// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //为所有请求加请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

    }

    // 优化页面访问权限
    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据

        if (res.responseJSON.status !== 0 && res.responseJSON.message !== "获取用户基本信息成功！") {
            location.href = '/login.html';
            //强制清空token值
            localStorage.removeItem('token')
        }

    }

})