$(function () {
    var form = layui.form
    var layer = layui.layer
    //点击按钮切换去登录表单与注册表单
    $("#link_reg").click(function () {
        $(".login-box").hide();
        $(".reg-box").show()
    })
    $("#link_login").click(function () {
        $(".login-box").show();
        $(".reg-box").hide()
    })

    //添加表单验证方法
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) { //value：表单的值、item：表单的DOM对象
            if (value !== $('[name=repassword]').val()) {
                return "两次密码不一致！ "
            }
        }
    })
    //点击注册注册用户，发起ajax请求
    $('#form_reg').on("submit", function (e) {
        //阻止默认提交行为
        e.preventDefault()
        var data = {
            username: $("#form_reg[name=username]").val(),
            password: $('#form_reg[name=password]').val()
        }
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg("注册失败")
                }
                layer.msg("注册成功")
                //自点击，
                $("#link_login").click()
            }
        })
    })
    // 点击登录，
    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            data: $(this).serialize(),
            url: '/api/login',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("登录失败")
                }
                layer.msg("登录成功")
                //后台保存token 
                localStorage.setItem("token")
                // 跳转到index页面
                location.href = '/index.html'
            }
        })



    })













})