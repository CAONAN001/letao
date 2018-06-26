$(function () {
    var currentpage = 1;
    var pageSize = 5;
    var userId = null;
    var isDelete = null;
    render();
    //点击操作按钮获取用户ID
    $("tbody").on("click", ".operate", function () {
        userId = $(this).parent().data().id;
        isDelete = $(this).parent().data().isdele;
        $('#myModal2').modal('show');
        
    })
    
    //根据用户ID设置用户状态
    $(".isDelete").on("click", function () {
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: userId,
                isDelete: isDelete == 1 ? 0 : 1,
            },
            dataType: "json",
            success: function (info) {
                $('#myModal2').modal('hide');
                render();
                
            }
        })
        
        
    })
    
    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentpage,
                pageSize: pageSize,
            },
            dataType: "json",
            success: function (info) {
                var userlis = template("tmp", info);
                $("tbody").html(userlis);
                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//指定bootstrap的版本，如果是3，必须指定
                    currentPage: currentpage,//指定当前页
                    totalPages: Math.ceil(info.total / pageSize),//指定总页数
                    onPageClicked: function (a, b, c, page) {
                        //page指的是点击的页码,修改了当前页
                        currentpage = page;
                        //重新渲染
                        render();
                    }
                });
                
                
            }
        })
        
        
    }
    
    
})