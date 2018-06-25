
//验证登录状态
if (location.href.indexOf("login.html") == -1) {
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        dataType:"json",
        success:function (info) {
            if (info.error == 400) {
                location.href="./login.html";
            }
        }
        
    })
}


//进度条功能
$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function () {
    NProgress.done();
})




//侧边栏二级导航
$(".secondnav").on("click",function () {
    $(".child").slideToggle();
})

//侧边栏缩进
$(".icon_menu").on("click",function () {
    $(".lt_aside").toggleClass("active");
    $(".lt_topbar").toggleClass("active");
    $(".lt_main").toggleClass("active");

})

//退出登录
$(".logout").on("click",function () {
    $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        dataType:"json",
        success:function (info) {
            if (info.success) {
                location.href="./login.html";
            }
        }
    })
})

