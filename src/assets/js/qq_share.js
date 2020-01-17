// <script src="//mvp-web-1300522992.file.myqcloud.com/js/qqapi.min.js"></script>

function _share() {
      if (mqq.device.isMobileQQ()) {

        setTimeout(function() {
          mqq.ui.setOnShareHandler(function(type) {
            mqq.ui.shareMessage(
              {
                title: title,
                desc: desc,
                share_type: type,
                back: true,
                image_url: image_url,
                imageUrl: image_url,
                share_url: share_url,
                sourceName: sourceName,
                puin: 0,
                src_iconUrl: src_iconUrl
              },
              function(res) {
                if (res.retCode === 0) {
                  // mqq.ui.popBack();
                }
              }
            );
          });
        }, 200);
      } else {
        let wechat_url = share_url + '&adtag=wechatshare';
        let onBridgeReady = function() {
          // 转发朋友圈
          WeixinJSBridge.on('menu:share:timeline', function(e) {
            let data = {
              img_url: image_url,
              img_width: '120',
              img_height: '120',
              link: wechat_url,
              // desc这个属性要加上，虽然不会显示，但是不加暂时会导致无法转发至朋友圈，
              desc: desc,
              title: title
            };
            WeixinJSBridge.invoke('shareTimeline', data, function(res) {
              WeixinJSBridge.log(res.err_msg);
            });
          });
          // 同步到微博
          WeixinJSBridge.on('menu:share:weibo', function() {
            WeixinJSBridge.invoke(
              'shareWeibo',
              {
                content: title,
                url: wechat_url
              },
              function(res) {
                WeixinJSBridge.log(res.err_msg);
              }
            );
          });
          // 分享给朋友
          WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            WeixinJSBridge.invoke(
              'sendAppMessage',
              {
                img_url: image_url,
                img_width: '120',
                img_height: '120',
                link: wechat_url,
                desc: desc,
                title: title
              },
              function(res) {
                WeixinJSBridge.log(res.err_msg);
              }
            );
          });
        };
        if (
          typeof top.window.WeixinJSBridge === 'undefined' ||
          !top.window.WeixinJSBridge.invoke
        ) {
          // 没有就监听ready事件
          if (document.addEventListener) {
            document.addEventListener(
              'WeixinJSBridgeReady',
              onBridgeReady,
              false
            );
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        } else {
          // 初始化结束直接就执行吧！
          onBridgeReady();
        }
      }
    },