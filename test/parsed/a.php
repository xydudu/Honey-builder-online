<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="description" content="金鹰网新用户注册完善资料">
<title><?php echo $this->title;?></title>
<link rel="shortcut icon" href="http://honey.hunantv.com/i/image/global/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" href="http://honey.hunantv.com/hunantv/css/page/page-nav.css" type="text/css" media="screen" charset="utf-8" />
</head>
<body class="pr">
<?php $this->layout("nav"); ?>
<div class="content wrap">
    <div class="top min-h"></div>
    <div class="middle clearfix tc">
		<!--B mod-nav-->
		<div class="mod-nav tl">
			<img src="http://honey.hunantv.com/hunantv/image/hunantvcheck/nav-full.png" alt="完善资料" />
			<div class="mod-700 ml190">
				<div class="mod-700-form">
				 <form action="/basicinfo/save" method="post" id="hn-form">
					<div class="clearfix mt25">
						<label for="nickname">昵称</label>
						<input class="input-text" type="text" name="nickname" value="<?php echo $this->user['username'];?>" id="nickname"/>
					</div>
					<div class="clearfix mt25">
						<label for="province">城市</label>
						<div class="form-line fl">
							<select name="province_id" id="province_id"></select>
							<select class="ml10" name="city_id" id="city_id"></select>
						</div>
					</div>
					<input type="hidden" id="city" name="city" />
					<input type="hidden" id="province" name="province" />
					<div class="clearfix mt25">
						<label for="male">性别</label>
						<div class="form-line fl">
							<input type="radio" name="gender" value="1" id="male" <?php if(!$this->user['gender'] || $this->user['gender']==1){ ?>checked="checked" <?php }?>>
							男
							<input class="ml20" type="radio" name="gender" value="2" id="female" <?php if($this->user['gender']==2){ ?>checked="checked" <?php }?>>
							女
						</div>
					</div>
					<div class="clearfix mt25">
						<label for="age">生日</label>
						<div class="form-line fl">
							<select name="year" id="year"></select>
							<span class="ml5">年</span>
							<select class="ml5" name="month" id="month"></select>
							<span class="ml5">月</span>
							<select class="ml5" name="day" id="day"></select>
							<span class="ml5">日</span>
						</div>
					</div>
					
					<div class="clearfix mt25">
						<label for="constellation">星座</label>
						<div class="form-line fl">
							<select name="constellation" id="constellation">
								<option value="魔羯" <?php if($this->user['constellation']=="魔羯"){ echo "selected";}?>>魔羯</option>
								<option value="水瓶" <?php if($this->user['constellation']=="水瓶"){ echo "selected";}?>>水瓶</option>
								<option value="双鱼" <?php if($this->user['constellation']=="双鱼"){ echo "selected";}?>>双鱼</option>
								<option value="白羊" <?php if($this->user['constellation']=="白羊"){ echo "selected";}?>>白羊</option>
								<option value="金牛" <?php if($this->user['constellation']=="金牛"){ echo "selected";}?>>金牛</option>
								<option value="双子" <?php if($this->user['constellation']=="双子"){ echo "selected";}?>>双子</option>
								<option value="巨蟹" <?php if($this->user['constellation']=="巨蟹"){ echo "selected";}?>>巨蟹</option>
								<option value="狮子" <?php if($this->user['constellation']=="狮子"){ echo "selected";}?>>狮子</option>
								<option value="处女" <?php if($this->user['constellation']=="处女"){ echo "selected";}?>>处女</option>
								<option value="天秤" <?php if($this->user['constellation']=="天秤"){ echo "selected";}?>>天秤</option>
								<option value="天蝎" <?php if($this->user['constellation']=="天蝎"){ echo "selected";}?>>天蝎</option>
								<option value="射手" <?php if($this->user['constellation']=="射手"){ echo "selected";}?>>射手</option>
							</select>
						</div>
					 </div>
					 
					<div class="clearfix mt25">
						<label for="work">职业</label>
						<div class="form-line fl">
							<select name="work" id="work">
								<option value="在校学生" <?php if($this->user['work']=="在校学生"){ echo "selected";}?>>在校学生</option>
								<option value="自由职业者" <?php if($this->user['work']=="自由职业者"){ echo "selected";}?>>自由职业者</option>
								<option value="销售" <?php if($this->user['work']=="销售"){ echo "selected";}?>>销售</option>
								<option value="商务市场" <?php if($this->user['work']=="商务市场"){ echo "selected";}?>>商务市场</option>
								<option value="互联网" <?php if($this->user['work']=="互联网"){ echo "selected";}?>>互联网</option>
								<option value="通信技术" <?php if($this->user['work']=="通信技术"){ echo "selected";}?>>通信技术</option>
								<option value="客户服务" <?php if($this->user['work']=="客户服务"){ echo "selected";}?>>客户服务</option>
								<option value="行政" <?php if($this->user['work']=="行政"){ echo "selected";}?>>行政</option>
								<option value="人力资源" <?php if($this->user['work']=="人力资源"){ echo "selected";}?>>人力资源</option>
								<option value="高级管理" <?php if($this->user['work']=="高级管理"){ echo "selected";}?>>高级管理</option>
								<option value="工程机械" <?php if($this->user['work']=="工程机械"){ echo "selected";}?>>工程机械</option>
								<option value="技工" <?php if($this->user['work']=="技工"){ echo "selected";}?>>技工</option>
								<option value="金融" <?php if($this->user['work']=="金融"){ echo "selected";}?>>金融</option>
								<option value="建筑" <?php if($this->user['work']=="建筑"){ echo "selected";}?>>建筑</option>
								<option value="交通" <?php if($this->user['work']=="交通"){ echo "selected";}?>>交通</option>
								<option value="普通劳动力" <?php if($this->user['work']=="普通劳动力"){ echo "selected";}?>>普通劳动力</option>
								<option value="零售业" <?php if($this->user['work']=="零售业"){ echo "selected";}?>>零售业</option>
								<option value="教育" <?php if($this->user['work']=="教育"){ echo "selected";}?>>教育</option>
								<option value="顾问" <?php if($this->user['work']=="顾问"){ echo "selected";}?>>顾问</option>
								<option value="科研" <?php if($this->user['work']=="科研"){ echo "selected";}?>>科研</option>
								<option value="法律" <?php if($this->user['work']=="法律"){ echo "selected";}?>>法律</option>
								<option value="设计创意" <?php if($this->user['work']=="设计创意"){ echo "selected";}?>>设计创意</option>
								<option value="传媒影视" <?php if($this->user['work']=="传媒影视"){ echo "selected";}?>>传媒影视</option>
								<option value="能源" <?php if($this->user['work']=="能源"){ echo "selected";}?>>能源</option>
								<option value="社会服务业" <?php if($this->user['work']=="社会服务业"){ echo "selected";}?>>社会服务业</option>
								<option value="医疗" <?php if($this->user['work']=="医疗"){ echo "selected";}?>>医疗</option>
								<option value="翻译" <?php if($this->user['work']=="翻译"){ echo "selected";}?>>翻译</option>
								<option value="公务员" <?php if($this->user['work']=="公务员"){ echo "selected";}?>>公务员</option>
								<option value="其他" <?php if($this->user['work']=="其他"){ echo "selected";}?>>其他</option>
							</select>
						</div>
					</div>
					<div class="clearfix save-wrap">
						<a href="javascript:" class="fl ml45 login-mod-btn tc save" title="下一步">下一步</a>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!--E mod-nav-->
    </div>
    <div class="bottom min-h"></div>
</div>
<script src="http://honey.hunantv.com/honey-2.0/honey.ihunantv.js"></script>
<script>
HN.go("i.hunantv#i.hunantv#i.hunantv#i.hunantv#i.hunantv#i.hunantv#lib:jquery-mod:dialog-mod_alert-plugin_jvalidate-mod_area-mod_select-mod_ymddate-mod_setting", function() {
	//地区联动
	HN.selectTwo(AREA, {id: "<?php echo isset($this->user['city_id'])&&$this->user['city_id']?$this->user['city_id']:1101;?>",pid: "<?php echo isset($this->user['province_id'])&&$this->user['province_id']?$this->user['province_id']:11;?>"}, ['province_id', 'city_id']);
	$('#province').val($('#province_id option:selected').text());
	$('#city').val($('#city_id option:selected').text());
				
	//日期选择

	HN.ymddate({Set:[<?php echo $this->year?$this->year:1990;?>,<?php echo $this->month?$this->month:01;?>,<?php echo $this->day?$this->day:01;?>],Max:2010,Min:1920});

	//设置隐藏域的值
	$('.form-line').delegate('#province_id', 'change', function(){
		$('#province').val($(this).find('option:selected').text());
		$('#city').val($('#city_id option:eq(0)').text());
	});

	$('.form-line').delegate('#city_id', 'change', function(){
		$('#city').val($(this).find('option:selected').text());
	});

	HN.validate();
	HN.setting("createprofile","/account/fillprofile/step/upload_avatar");
});
</script>
<?php $this->layout("footer_index"); ?>
