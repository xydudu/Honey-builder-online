<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="description" content="用户登录_金鹰网">
<title><?php echo $this->title;?></title>
<link rel="shortcut icon" href="http://honey.hunantv.com/i/image/global/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" href="http://honey.hunantv.com/hunantv/css/page/page-login.css" type="text/css" media="screen" charset="utf-8" />
</head>
<body class="pr">
<?php $this->layout("nav"); ?>
<div class="content wrap">
	<div class="top min-h"></div>
	<div class="middle clearfix tc">                
        <div class="mod-login clearfix">
            <div class="mod-login-l fl">
                <h1 class="login-h1">金鹰网用户登录</h1>
                <div class="login-con">
                    <form action="http://spp.hunantv.com/passport/service.php?action=login" id="login-form" method="post" autocomplete="off">
					<input id="login-invoker" type="hidden" name="invoker" value="ihunantv" />
                    <input id="login-ref" type="hidden" name="ref" value="<?php echo $this->ref;?>" />
                    <p class="clearfix">
                        <label class="login-label">帐号</label>
                        <input type="text" name="email" id="username" maxlength="30" placeholder="注册邮箱" class="login-input" autocomplete="off"/>
                        <span style="display:none"><em></em></span>
                    </p>

                    <p class="clearfix">
                        <label class="login-label">密码</label>
                        <input type="password" id="password" maxlength="18" placeholder="密码" class="login-input" />
                        <span style="display:none"><em></em></span>
                    </p>

                    <input type="hidden" id="password-encode" name="password" >
                    <p class="clearfix login-check"><input type="checkbox" name="rem" id="rememberme" value="1"><label for="remember">记住我</label><a href="http://passport2.hunantv.com/index.php?ac=findpass" class="fl" target="_blank">忘记密码？</a></p>
                    <p class="clearfix"><input type="submit" value="登 录" class="login-mod-btn login-btn"></p>
                    </form>
                </div>
                <div class="other-login mod-login-lother">
                    <p>第三方帐号登录</p>
                    <p class="clearfix"><a href="#" class="sina-weibo-login" onclick="return login3rd(200);"><em class="ico-sina hide-text">新浪</em><span>新浪微博</span></a><a href="#" class="tencent-weibo-login" onclick="return login3rd(110);"><em class="ico-qqt hide-text">腾讯</em><span>腾讯微博</span></a><a href="#" class="qq-login" onclick="return login3rd(100);"><em class="ico-qq hide-text">QQ</em><span>QQ帐号</span></a></p>
                </div>
            </div>
            <div class="mod-login-r fr">
                <div class="login-top min-h"></div>
                <div class="login-mid"><span class="login-mid-rspan">还没有金鹰网帐号?赶紧注册一个吧！</span><a href="/register" class="login-mod-btn register-btn">注 册</a></div>
                <div class="login-bottom min-h"></div>
            </div>
        </div>
    </div>
    <div class="bottom min-h"></div>
</div>
<script src="http://honey.hunantv.com/honey-2.0/honey.ihunantv.js"></script>
<script>
honey.go("lib:jquery-plugin:pswencode-mod:dialog-mod_suggestion-mod_login", function() {
    honey.login();
});

function login3rd(type) {
	var url = 'http://passport2.hunantv.com/oauth/?action=step&step=ca2e2a4d9872750a49778920e284c000&type='+type+'&rs=<?php echo $this->ref;?>';
	window.location.href = url;
	return false;
}
</script>
<?php $this->layout("footer_index"); ?>
