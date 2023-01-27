var base_url = location.protocol + "//" + location.host;
var base_ajax = location.protocol + "//" + location.host + "/ajax";
var base_bbs = location.protocol + "//" + location.host + "/bbs";

/**
 * Episode Search 
 */

function EpisodeSearch() {
    if ($('.custom-text-filter').length) {
        $('.custom-text-filter').each(function() {
            var filterTarget = $(this).attr('data-filter-target');
            var defaultText = $(this).val();
            $(this).focus(function(e) {
                if ($(this).val() === defaultText) $(this).val('');
            }).blur(function(e) {
                if ($(this).val() === '') $(this).val(defaultText);
            }).keyup(function(e) {
                var patterns = $(this).val().toLowerCase().split(' ');
                if (!patterns.length) return;
                $(filterTarget).hide().filter(function() {
                    var matchText = $(this).find('*[data-filter-match]').text().toLowerCase();

                    for (var i = 0; i < patterns.length; i++) {
                        if (matchText.indexOf(patterns[i]) === -1) return false;
                    }

                    return true;
                }).show();
                var items = $(filterTarget + ':visible').length;

                if (items === 0) {
                    $('.episode-search-not').removeClass('is-hidden');
                } else {
                    $('.episode-search-not').addClass('is-hidden');
                }
            });
        });
    }
}

/**
 * Delte Confirm
 */

function del(href) {
    if (confirm("삭제한 자료는 복구할수 없습니다 정말 삭제하시겠습니까?")) {
        var iev = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                iev = parseFloat(RegExp.$1);
        }

        if (iev != -1 && iev < 7) {
            document.location.href = encodeURI(href);
        } else {
            document.location.href = href;
        }
    }
}


/**
 * Set Cookie
 */

function set_cookie(name, value, expirehours, domain) {
    var today = new Date();
    today.setDate(today.getDate() + expirehours);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + today.toGMTString() + ";";
    if (domain) {
        document.cookie += "domain=" + domain + ";";
    }
}

/**
 * Get Cookie
 */

function get_cookie(name) {
    var find_sw = false;
    var start, end;
    var i = 0;

    for (i = 0; i <= document.cookie.length; i++) {
        start = i;
        end = start + name.length;

        if (document.cookie.substring(start, end) == name) {
            find_sw = true
            break
        }
    }

    if (find_sw == true) {
        start = end + 1;
        end = document.cookie.indexOf(";", start);

        if (end < start)
            end = document.cookie.length;

        return unescape(document.cookie.substring(start, end));
    }
    return "";
}

/**
 * Cookie Delte
 */

function delete_cookie(name) {
    var today = new Date();

    today.setTime(today.getTime() - 1);
    var value = get_cookie(name);
    if (value != "")
        document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
}

function file_request() {
    $.ajax({
        url: base_ajax + '/ajax.fileRequest.php',
        dataType: 'json',
        type: 'POST',
        async: false,
        data: {
            'title': $('#request_title').val(),
            'category': $('#request_category option:selected').val(),
            'year': $('#request_year').val(),
        },
        'success': function(data) {
            if (data.status == 200) {
                alert(data.message);
                $('.modal-confirm-btn > .cancel').trigger("click");
            } else {
                alert(data.message);
            }
        }
    });
}

function detector_objection() {
    $.ajax({
        url: base_ajax + '/ajax.detectorObjection.php',
        dataType: 'json',
        type: 'POST',
        async: false,
        data: {
            'subject': $('#objection_subject').val(),
            'content': $('#objection_content').val(),
        },
        'success': function(data) {
            if (data.status == 200) {
                alert(data.message);
                $('.modal-confirm-btn > .cancel').trigger("click");
            } else {
                alert(data.message);
            }
        }
    });
}

function singo_sbt(bo_table, wr_id) {

    $.ajax({
        url: base_ajax + '/ajax.singo.php',
        dataType: 'json',
        type: 'POST',
        async: false,
        data: {
            'bo_table': bo_table,
            'wr_id': wr_id,
            'bo_singo_msg': singo_msg.value
        },
        'success': function(data) {
            if (data.status == 200) {
                alert(data.message);
                window.location.reload();
            } else {
                alert(data.message);
            }
        }
    });
}


function view_scrap(bo_table, wr_id, tmdb_id, tmdb_season_number) {
    $.ajax({
        type: 'post',
        url: base_ajax + '/ajax.scrap.php',
        data: {
            'bo_table': bo_table,
            'wr_id': wr_id,
            'tmdb_id': tmdb_id,
            'tmdb_season_number': tmdb_season_number
        },
        dataType: 'json',
        success: function(data) {
            if (data.status == 200) {
                alertify.success(data.message);
            } else {
                alertify.error(data.message);
            }
        },
    });
}


function view_webpush(tmdb_id, tmdb_type) {
    $.ajax({
        type: 'post',
        url: base_ajax + '/ajax.webPushList.php',
        data: {
            'tmdb_id': tmdb_id,
            'tmdb_type': tmdb_type
        },
        dataType: 'json',
        success: function(data) {
            if (data.status == 200) {
                alertify.success(data.message);
            } else {
                alertify.error(data.message);
            }
        },
    });
}

/**
 * Password Change 
 * @return {[type]} [description]
 */
function password_change() {
    if (!confirm('비밀번호를 변경하시겠습니까?'))
        return;

    $.ajax({
        type: "post",
        url: base_ajax + '/ajax.mypage.php',
        data: {
            "action": "change_pw",
            "old_password": $('.old_password').val(),
            "new_password": $('.new_password').val(),
            "new_password_re": $('.new_password_re').val(),
        },
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        success: function(data) {
            if (data.status == 0) {
                alert(data.message);
                window.close();
            } else {
                alert(data.message);
            }
        },
    });
}


function AdultHidden() {
    if (!confirm('설정을 변경하시겠습니까?'))
        return;

    $.ajax({
        type: "post",
        url: base_ajax + '/ajax.mypage.php',
        data: {
            "action": "adult_hidden",
            "mb_adult": $('input:checkbox[id="join_adult"]').val(),
        },
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        success: function(data) {
            if (data.status == 0) {
                alert(data.message);
                window.close();
            } else {
                alert(data.message);
            }
        },
    });
}


/**
 * Member Leave
 * @return {[type]} [description]
 */
function member_leave() {
    if (!confirm('회원탈퇴를 진행하시겠습니까?'))
        return;

    $.ajax({
        type: "post",
        url: base_ajax + '/ajax.mypage.php',
        data: {
            "action": "member_leave",
            "old_password": $('.old_password_leave').val(),
        },
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        success: function(data) {
            if (data.status == 0) {
                alert(data.message);
                location.href = base_url;
            } else {
                alert(data.message);
            }
        },
    });
}



/**
 * [mypage_profile_up description]
 * @return {[type]} [description]
 */
function mypage_profile_up() {
    if (!confirm('프로필을 등록하시겠습니까?'))
        return;
    var form = $("#profileUpload")[0];
    var formData = new FormData(form);
    formData.append("action", "member_profile_up");
    formData.append("file", $("#member_profile_put")[0].files[0]);
    $.ajax({
        type: "post",
        url: base_ajax + '/ajax.mypage.php',
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        cache: false,
        success: function(data) {
            if (data.status == 0) {
                alert(data.message);
                window.location.reload();
            } else {
                alert(data.message);
            }
        },
    });
}


/** 
 * Ajax Comment Good
 */

function comment_good(bo_table, wr_id, act, id, wc_id) {
    var href;

    if (wr_id) {
        href = '/bbs/good.comment.php?bo_table=' + bo_table + '&wr_id=' + wr_id + '&good=' + act + '&wc_id=' + wc_id;
    } else {
        href = './good.php?it_id=' + bo_table + '&good=' + act;
    }


    $.post(href, {
        js: "on"
    }, function(data) {
        if (data.error) {
            alertify.error(data.error);
            return false;
        } else if (data.success) {
            alertify.success(data.success);
            $("#" + id).text(number_format(String(data.count)));
        }
    }, "json");
}

/**
 * Ajax Comment Delte
 */

function ajax_comment_delete(id, href, url) {
    if (confirm("댓글을 삭제 하시겠습니까?")) {
        $.post(href, {
            js: "on"
        }, function(data) {
            str = data.substr(0, 2);
            data = data.replace(str, '');
            if (str == "1|") {
                if (data) alertify.error(data);
                return false;
            } else {
                alertify.success("댓글이 삭제되었습니다.");
                ajax_comment_page(id, url);
            }
        });
    }
}

/**
 * Ajax Comment Page
 */

function ajax_comment_page(id, url, opt) {
    $("#" + id).load(url, function() {
        if (typeof is_SyntaxHighlighter != 'undefined') {
            SyntaxHighlighter.highlight();
        }
    });

    if (typeof(window["comment_box"]) == "function") {
        switch (id) {
            case 'viewcomment':
                comment_box('', 'c');
                break;
        }
        document.getElementById("comment_submit_button").disabled = false;
    }

    if (opt) {
        $('html, body').animate({
            scrollTop: $("#" + id).offset().top - 100
        }, 500);
    }
}

/**
 * Ajax Comment Submit
 */

function ajax_submit_comment(id) {
    var str;
    var c_url = base_bbs + "/write_comment_update.php";
    var f = document.getElementById("fviewcomment");
    var url = document.getElementById("comment_url").value;
    if (fviewcomment_submit(f)) {

        $.ajax({
            url: c_url,
            type: 'POST',
            cache: false,
            data: $("#fviewcomment").serialize() + "&js=on",
            beforeSend: function() {
                $('#comment_submit_button').hide();
                $('#comment_submit_loading').show();
            },
            complete: function() {
                $('#comment_submit_button').show();
                $('#comment_submit_loading').hide();
            },
            dataType: "html",
            success: function(data) {
                str = data.substr(0, 2);
                data = data.replace(str, '');
                if (str == "1|") {
                    if (data) alertify.error(data);
                    return false;
                } else if (str == "2|") {
                    alertify.success(data);
                    ajax_comment_page(id, url);
                    document.getElementById("comment_submit_button").disabled = false;
                    document.getElementById('comment_write_content').value = "";
                } else {
                    alertify.success(data);
                    ajax_comment_page(id, url);
                    document.getElementById("comment_submit_button").disabled = false;
                    document.getElementById('comment_write_content').value = "";
                }
            }
        });
    }
}

/**
 * Trim
 */

function trim(s) {
    var t = "";
    var from_pos = to_pos = 0;

    for (i = 0; i < s.length; i++) {
        if (s.charAt(i) == ' ')
            continue;
        else {
            from_pos = i;
            break;
        }
    }

    for (i = s.length; i >= 0; i--) {
        if (s.charAt(i - 1) == ' ')
            continue;
        else {
            to_pos = i;
            break;
        }
    }

    t = s.substring(from_pos, to_pos);
    //				alert(from_pos + ',' + to_pos + ',' + t+'.');
    return t;
}


/**
 * JS number_format
 */

function number_format(data) {

    var tmp = '';
    var number = '';
    var cutlen = 3;
    var comma = ',';
    var i;

    data = data + '';

    var sign = data.match(/^[\+\-]/);
    if (sign) {
        data = data.replace(/^[\+\-]/, "");
    }

    len = data.length;
    mod = (len % cutlen);
    k = cutlen - mod;
    for (i = 0; i < data.length; i++) {
        number = number + data.charAt(i);

        if (i < data.length - 1) {
            k++;
            if ((k % cutlen) == 0) {
                number = number + comma;
                k = 0;
            }
        }
    }

    if (sign != null)
        number = sign + number;

    return number;
}


/**
 * Comment Modify Token
 */

function set_comment_token(f) {

    if (typeof f.token === "undefined")
        $(f).prepend('<input type="hidden" name="token" value="">');

    $.ajax({
        url: base_ajax + "/ajax.comment.token.php",
        type: "GET",
        dataType: "json",
        async: false,
        cache: false,
        success: function(data, textStatus) {
            f.token.value = data.token;
        }
    });
}

/**
 * Document Ready
 */
$(function() {
    EpisodeSearch();
    /**
     * Login Form                                
     */
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        if (!document.getElementById("login_id").value) {
            document.getElementById("login_id").focus();
            alertify.error('아이디를 입력해주세요.');
            return false;
        }

        if (!document.getElementById("login_pw").value) {
            document.getElementById("login_pw").focus();
            alertify.error('비밀번호를 입력해주세요.');
            return false;
        }

        $.ajax({
            type: "POST",
            dataType: 'JSON',
            url: base_ajax + "/ajax.login.check.php",
            data: {
                "mb_id": $('#login_id').val(),
                "mb_password": $('#login_pw').val(),
                "auto_login": $("input[name='auto_login']:checked").val()
            },
            cache: false,
            async: true,
            beforeSend: function() {
                $('#loading_lor').css('display', 'inline-block');
            },
            complete: function() {
                $('#loading_lor').hide();
            },
            success: function(data) {
                if (data.msg) {
                    alertify.error(data.msg);
                    return false;
                } else if (data.code == 200) {
                    document.location.href = base_url;
                }
            }
        });
    });


    /**
     * Email Form                           
     */
    $('#emailVerifyForm').submit(function(e) {
        e.preventDefault();
        if (!document.getElementById("mb_email").value) {
            document.getElementById("mb_email").focus();
            alertify.error('이메일명을 입력해주세요.');
            return false;
        }

        $.ajax({
            type: "POST",
            dataType: 'JSON',
            url: base_ajax + "/ajax.emailVerify.php",
            data: {
                "mb_email": $('#mb_email').val(),
            },
            cache: false,
            async: true,
            beforeSend: function() {
                $('#loading_lor').css('display', 'inline-block');
            },
            complete: function() {
                $('#loading_lor').hide();
            },
            success: function(data) {
                if (data.emsg) {
                    alertify.error(data.emsg);
                    return false;
                } else if (data.code == 200) {
                    alertify.success(data.smsg);
                }
            }
        });
    });

    /**
     * Join Form
     */

    $('#joinForm').submit(function(e) {
        e.preventDefault();
        if (!document.getElementById("join_id").value) {
            document.getElementById("join_id").focus();
            alertify.error('아이디를 입력해주세요.');
            return false;
        }

        if (!document.getElementById("join_password").value) {
            document.getElementById("join_password").focus();
            alertify.error('비밀번호를 입력해주세요.');
            return false;
        }

        if (!document.getElementById("join_password_re").value) {
            document.getElementById("join_password_re").focus();
            alertify.error('비밀번호를 다시한번 입력해주세요.');
            return false;
        }

        if (!document.getElementById("join_nickname").value) {
            document.getElementById("join_nickname").focus();
            alertify.error('닉네임을 입력해주세요.');
            return false;
        }

        if (!document.getElementById("join_email").value) {
            document.getElementById("join_email").focus();
            alertify.error('이메일 주소를 입력해주세요.');
            return false;
        }

        $.ajax({
            type: "POST",
            dataType: 'JSON',
            url: base_ajax + "/ajax.register.php",
            data: {
                "mb_id": $('#join_id').val(),
                "mb_password": $('#join_password').val(),
                "mb_password_re": $("#join_password_re").val(),
                "mb_nick": $("#join_nickname").val(),
                "mb_email": $("#join_email").val(),
                "mb_adult": $('input:checkbox[id="join_adult"]').val()
            },
            cache: false,
            async: true,
            beforeSend: function() {
                $('#loading_lor').css('display', 'inline-block');
            },
            complete: function() {
                $('#loading_lor').hide();
            },
            success: function(data) {
                if (data.msg) {
                    alertify.error(data.msg);
                    return false;
                } else if (data.code == 200) {
                    document.location.href = base_url + '/emailVerify';
                }
            }
        });
    });


    /**
     * Layer Login Open
     */


    $("#layer_member").click(function(event) {


        event.stopPropagation();

        var ico = $(this).find('i');
        if (ico.hasClass("fal fa-angle-up")) {
            $(ico).removeClass().addClass("fal fa-angle-down")
        } else {
            $(ico).removeClass().addClass("fal fa-angle-up")
        }
        $('.noti-nav-trigger').data('toggle_enable', false).removeClass('menu-is-open');
        $(".layer-member-fold").toggle();
        $("#search-hot-frame").hide();
    });

    $(".layer-member-fold").on("click", function(event) {
        event.stopPropagation();
    });

    $(document).on("click", function() {
        var ico = $("#layer_member i");
        $(".layer-member-fold").hide();
        $(ico).removeClass().addClass("fal fa-angle-down")
    });


    var clipboard = new ClipboardJS('.scrap-link-copy');

    clipboard.on('success', function(e) {
        alertify.success('링크를 복사하였습니다.');
        e.clearSelection();
    });


    /*
    $(".search-form").click(function(event){
        event.stopPropagation();
        $("#search-hot-frame").css('display' , 'flex');
        $('.noti-nav-trigger').data('toggle_enable', false).removeClass('menu-is-open');
        $(".layer-member-fold").hide();
    });

    $("#search-hot-frame").on("click", function (event) {
        event.stopPropagation();
    });

    $(document).on("click", function () {
        $("#search-hot-frame").css('display' , 'none');
    });
*/

    /**
     * NW DropDown
     */

    $('.nw-select-name').text($('.select-ck > div > a > span.selected').text());
    var newOptions = $('.select-ck > div ');
    newOptions.click(function() {
        var getname = $(this).find('span');
        $('.nw-select-name').text($(getname).text());
        $(getname).removeClass('selected');
        $(getname).addClass('selected');
    });

    var nwDropdown = $('.nw-dropdown');
    nwDropdown.click(function() {
        var ico = $(this).find('i');

        if (ico.hasClass("fal fa-angle-down")) {
            $(ico).removeClass().addClass("fal fa-angle-up")
        } else {
            $(ico).removeClass().addClass("fal fa-angle-down")
        }

        $('.select-ck').toggleClass('nw-show');
    });



    $('.multi-nw-select-name').text($('.multi-select-ck > div > a > span.selected').text());
    var mnewOptions = $('.multi-select-ck > div ');
    mnewOptions.click(function() {
        var getname = $(this).find('span');
        $('.multi-nw-select-name').text($(getname).text());
        $(getname).removeClass('selected');
        $(getname).addClass('selected');
    });

    var mnwDropdown = $('.multi-nw-dropdown');
    mnwDropdown.click(function() {
        var ico = $(this).find('i');

        if (ico.hasClass("fal fa-angle-down")) {
            $(ico).removeClass().addClass("fal fa-angle-up")
        } else {
            $(ico).removeClass().addClass("fal fa-angle-down")
        }

        $('.multi-select-ck').toggleClass('nw-show');
    });


    /**
     * URL Taget Popup
     */

    $('#popup_close_btn').on("click", function() {
        if ($('#popup_days').is(':checked')) {

            set_cookie('url_popup', true, 7, base_url);
        }
        $(".url-popup").remove();
        $("#app").removeClass();

    });


    /**
     * Folding Menu
     */


    $('#folding_menu').on("click", function() {
        if (!$('#collapse-menu').is('[data-folding]')) {
            $("#container").addClass('folding-true');

            $("#collapse-menu").attr('data-folding', true);
            $("#aside").attr('data-folding', false);

            set_cookie('folding', true, 2147483647, base_url);

        } else if ($("#collapse-menu").is('[data-folding]')) {


            $("#container").removeClass('folding-true');
            $("#collapse-menu").removeAttr('data-folding');
            $("#aside").removeAttr('data-folding');

            delete_cookie('folding');
        }
    });


    /**
     * Write Page Get Token
     */
    $(document).on("click", "form[name=fwrite] input:submit, form[name=fwrite] button:submit, form[name=fwrite] input:image", function() {
        var f = this.form;

        if (typeof(f.bo_table) == "undefined") {
            return;
        }

        var bo_table = f.bo_table.value;
        var token = get_write_token(bo_table);

        if (!token) {
            alert("토큰 정보가 올바르지 않습니다.");
            return false;
        }

        var $f = $(f);

        if (typeof f.token === "undefined")
            $f.prepend('<input type="hidden" name="token" value="">');

        $f.find("input[name=token]").val(token);

        return true;
    });

    jQuery.each(jQuery('textarea'), function() {
        var offset = this.offsetHeight - this.clientHeight;

        var resizeTextarea = function(el) {
            jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
        };
        jQuery(this).on('keyup input', function() {
            resizeTextarea(this);
        });
    });


    $('input:checkbox[id="join_adult"]').change(function() {
        if ($(this).is(':checked')) {
            $(this).val(1);
        } else {
            $(this).val(0);
        }
    });

});