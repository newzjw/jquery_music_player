$(function(){
    // 0.自定义滚动条
    $(".content_list").mCustomScrollbar();

    // 1.加载歌曲列表
    getPlayerList();
    function getPlayerList() {
        $.ajax({
            url: "./source/musiclist.json",
            dataType: "json",
            success: function(data) {
                // 3.1遍历获取到的数据, 创建每一条音乐
                var $musicList = $(".content_list ul");
                $.each(data, (index, ele) => {
                    var $item = crateMusicItem(index, ele);
                    $musicList.append($item);
                });
            },
            error: function (e) {
                console.log(e);
            }
        })
    }

    // 5.初始化事件监听
    initEvents();
    function initEvents() {
        // 1.监听歌曲的移入移出事件
        $(".content_list").delegate(".list_music", "mouseenter", function () {
            // 显示子菜单
            $(this).find(".list_menu").stop().fadeIn(100);
            $(this).find(".list_time a").stop().fadeIn(100);
            // 隐藏时长
            $(this).find(".list_time span").stop().fadeOut(100);
        });
        $(".content_list").delegate(".list_music", "mouseleave", function () {
            // 隐藏子菜单
            $(this).find(".list_menu").stop().fadeOut(100);
            $(this).find(".list_time a").stop().fadeOut(100);
            // 显示时长
            $(this).find(".list_time span").stop().fadeIn(100);
        });
        // 2.监听复选框的点击事件
        $(".content_list").delegate(".list_check", "click", function () {
            $(this).toggleClass("list_checked");
        });
    }

    // 定义一个方法创建一条音乐
    function crateMusicItem(index, music) {
        var $item = $("" +
        "<li class=\"list_music\">\n" +
            "<div class=\"list_check\"><i></i></div>\n" +
            "<div class=\"list_number\">"+(index + 1)+"</div>\n" +
            "<div class=\"list_name\">"+music.name+"" +
            "     <div class=\"list_menu\">\n" +
            "          <a href=\"javascript:;\" title=\"播放\" class='list_menu_play'></a>\n" +
            "          <a href=\"javascript:;\" title=\"添加\"></a>\n" +
            "          <a href=\"javascript:;\" title=\"下载\"></a>\n" +
            "          <a href=\"javascript:;\" title=\"分享\"></a>\n" +
            "     </div>\n" +
            "</div>\n" +
            "<div class=\"list_singer\">"+music.singer+"</div>\n" +
            "<div class=\"list_time\">\n" +
            "     <span>"+music.time+"</span>\n" +
            "     <a href=\"javascript:;\" title=\"删除\" class='list_menu_del'></a>\n" +
            "</div>\n" +
        "</li>");

        $item.get(0).index = index;
        $item.get(0).music = music;

        return $item;
    }
});