// <script src="//mvp-web-1300522992.file.myqcloud.com/js/mvpapp.min.js"></script>
		/*
			*channel 
			* 分享渠道（可以组合 1-茄子好友 2-微信 4-QQ 8-朋友圈 16-QQ空间）
			* title
			* 分享标题
			* summary
			* 分享概述
			* panelTitle分享面板标题
			* url
			* 分享链接
			* imgUrl
			* 分享缩略图
		*/
		mvpApp.bridge.callHandler({
		          module: 'QZCommon',
		          method: 'share',
		          query: {
		            url:location.url ,
		            title: location.title,
		            summary: '2020新年快乐',
		            panelTitle: '发送邀请到',
		            channel:'' ,
		            imgUrl:'https://mat1.gtimg.com/www/mobi/2017/image/apple-touch-icon.png' 
		          }
		        }, (data) => {
					console.log(data)
		        }, (err) => {
		          console.log('err', err);
		        });
		