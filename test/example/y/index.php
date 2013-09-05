<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="description" content="<?php echo $this->title;?>">
<title><?php echo $this->title;?></title>        
<link rel="shortcut icon" href="http://honey.hunantv.com/i/image/global/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" href="http://honey.hunantv.com/i/css/page/page-zone-index.css" type="text/css" media="screen" charset="utf-8" />
</head>
<body class="pr">
<?php $this->layout("header_v1"); ?>
<div class="content wrap pr">
	<div class="top min-h"></div>
	<div class="middle clearfix">
		<div class="mod-590 fl">
			<!--B mod-share-hi-->                    
			<div class="mod-590-title-share">
				<div class="share-hi"><a href="javascript:void(0);" class="add-photo">上传图片</a><a href="javascript:void(0);" class="add-video">上传视频</a></div>
			</div>
			<!--B mod-share-hi-->
			<!--B mod-ad-->
			<?php $this->widget('slide')->show(); ?>
			<!--B mod-ad-->
			<!--mod-590-title-->
			<div class="mod-590-title-share">
				<div class="share-til">
					<a href="/" class="on">关注动态</a>
					<span>|</span>
					<a href="/share/f">好友动态</a>
					<span>|</span>
					<a href="/share">我的分享</a>
					<span>|</span>
					<a href="/photo">我的相册</a>
				</div>
             </div>   
			 <!--E mod-590-title-->
			<a href="javascript:" onclick="javascript:window.location.reload();" style="display:none;" class="more-content tc mt20" title="有新消息，点击查看">有 <strong>0</strong> 条新消息，点击查看</a>
			<?php
				if(!empty($this->feed_list))
				{
			?>
			<!--B mod-590-list-->
			<ul class="mod-590-list z1">
			<?php
				foreach ($this->feed_list as $v)
				{
					if($v['type']=='tv' || $v['type']=='movie' || $v['type']=='show')
					{
			?>
				<li class="clearfix">
					<a href="<?php echo  create_lib_fans_url($v['type'], $v['info']['id']);?>" class="fl pic"><img class="hn-lazy" src="http://honey.hunantv.com/i/image/icon/grey.gif" rel="<?php echo $v['info']['image'];?>" alt="<?php echo $v['info']['title'];?>" width="60" height="78"></a>
					<dl class="fl info film">
						<?php
							if($v['new_drama'] == 1)
							{
								$href='http://data.hunantv.com/'.$v['type'].'_s_'.$v['info']['id'].'.html';
						?>
						<dd class="section"><a href="<?php echo create_lib_fans_url($v['type'], $v['info']['id']);?>"><?php echo $v['info']['title'];?></a>：<a class="underline list-play" href="<?php echo $href;?>" target="_blank"><?php echo strip_tags($v['content']);?></a></dd>
						<?php
							} else {
						?>
						<dt class="section <?php if($v['msgtype']==1) {?>dujia<?php }?>">
							<a href="<?php echo create_lib_fans_url($v['type'], $v['info']['id']);?>"><?php echo $v['info']['title'];?></a> 的新闻：<?php echo $v['content'];?>
						</dt>
						<?php
							}
						?>
						<?php
							if($v['thumb'] != '')
							{
						?>
						<dd class="section clearfix">
							<a class="fl zoom-back" href="javascript:" title="收起">收起</a>
							<a class="fr source-pic" href="<?php echo $v['thumb'];?>" target="_blank" title="查看原图">查看原图</a>
							<span class="cb fl pic zoom-big" title="" rel="<?php echo get_diff_size_thumb($v['thumb'],'big');?>"><img src="<?php echo get_diff_size_thumb($v['thumb'],'small');?>" rel="<?php echo get_diff_size_thumb($v['thumb'],'small');?>" alt="" width="120" /></span>
						</dd>
						<?php
							}
						?>
						<dd class="clearfix pr">
							<div class="fl"><?php echo $v['offsettime'];?></div>
							<a class="share fr" href="<?php echo create_lib_fans_url($v['type'], $v['info']['id']);?>" title="<?php echo $v['info']['title']." 的新闻：".strip_tags($v['content']);?>">分享</a>  
						</dd>
					</dl>
				</li>
				<?php } else { ?>
				<li class="clearfix">
					<a href="<?php echo create_lib_fans_url($v['type'], $v['info']['id']);?>" class="fl pic"><img class="hn-lazy" src="http://honey.hunantv.com/i/image/icon/grey.gif" rel="<?php echo $v['info']['image'];?>" alt="<?php echo $v['info']['title'];?>" width="60" height="60"></a>
					<dl class="fl info film">
						<dt class="section <?php if($v['msgtype']==1) {?>dujia<?php }?>">
							<a href="<?php echo create_lib_fans_url($v['type'], $v['info']['id']);?>"><?php echo $v['info']['title'];?></a> 的新闻：<?php echo $v['content'];?>
						</dt>
						<?php
							if($v['thumb'] != '')
							{
						?>
						<dd class="section clearfix">
							<a class="fl zoom-back" href="javascript:" title="收起">收起</a>
							<a class="fr source-pic" href="<?php echo $v['thumb'];?>" target="_blank" title="查看原图">查看原图</a>
							<span class="cb fl pic zoom-big" title="" rel="<?php echo get_diff_size_thumb($v['thumb'],'big');?>"><img src="<?php echo get_diff_size_thumb($v['thumb'],'small');?>" rel="<?php echo get_diff_size_thumb($v['thumb'],'small');?>" alt="" width="120" /></span>
						</dd>
						<?php
							}
						?>
						<dd class="clearfix pr">
							<div class="fl"><?php echo $v['offsettime'];?></div>
							 <a class="share fr" href="<?php echo create_lib_fans_url($v['type'], $v['info']['id']);?>" title="<?php echo $v['info']['title']." 的新闻：".strip_tags($v['content']);?>">分享</a>  
						</dd>
					</dl>
				</li>
			<?php
					} 
				}
			?>
			</ul>
			<?php } else { ?>
			<div class="mt10 f14">暂时还没有动态消息！</div>
			<?php } ?>
			<!--E mod-590-list-->
			<!--B page-->
			<?php $this->page->display();?>
			<!--E page-->
			<!--B mod-590-title-->
		</div>
		<div class="mod-290 fl ml30">
			<?php $this->widget('profile', array('user'=>$this->user, 'homepage'=>true))->show(); ?>
			<?php $this->widget('friend', array('user'=>$this->user))->show(); ?>
			<?php $this->widget('activity', array('user'=>$this->user, 'type'=>'activity'))->show(); ?>
			<?php $this->widget('like', array('user'=>$this->user, 'type'=>'all'))->show(); ?>
			<?php $this->widget('like', array('user'=>$this->user, 'type'=>'star'))->show(); ?>
		</div>
	</div>
	<div class="bottom min-h"></div>
</div>
<script src="http://honey.hunantv.com/honey-2.0/honey.ihunantv.js"></script>
<script>
                HN.go("lib:jquery,mod:dialog,"

                    + "mod_alert,mod_signature,mod_zoom,mod_photo,"
                    + "mod_video,mod_page,mod_lazyload,mod_slide,mod_ad,mod_change,mod_share,mod_gototop", function() {
	HN.lazyload();
	HN.zoom();
	HN.gototop();
	HN.ad();
	HN.page();
	HN.signature();
	HN.change("<?php echo $this->user['uid'];?>");
	HN.share();
});
//订阅列表
<?php if($this->push_list == '') { ?> var push_list = ''; <?php }else{ ?> var push_list = '<?php echo $this->push_list;?>,'; <?php }?>
</script>
<?php $this->layout("footer"); ?>
