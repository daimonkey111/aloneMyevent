$(function () {
    var layer = layui.layer
    // 获取用户信息，渲染到页面
    getInfoUser()
    function getInfoUser() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                if (res.status != 0) {
                    console.log('获取用户信息失败');
                }
                //  渲染页面
                // console.log(res);
                readAvatar(res.data)

            },
            complete:function (res) {
                console.log(res);
              }

        })
    }

    //渲染用户头像
    function readAvatar(data) {
        var userName = data.nickname || data.username
        $("#welcome").html('欢迎' + userName)
        // 头像信息
        if (data.user_pic !== null) {
            //有照片时就显示照片，没有显示字母
            $(".layui-nav-img").attr("src",data.user_pic).show()
            $('.text-avatar').hide()

        } else {
            $(".text-avatar").html(userName[0].toUpperCase())
            $(".layui-nav-img").hide()
            $('.text-avatar').show()
        }



    }









    //退出按钮
    $("#outbtn").on("click", function () {
        // 弹出警示框
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清除token值
            localStorage.removeItem("token")
            //跳转到登录接口
            location.href = "/login.html"
            layer.close(index);
        });

    })


})