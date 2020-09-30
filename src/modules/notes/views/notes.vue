<template>
  <hips-view class="notes" :header-height="50" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar :back-button="{showLeftArrow: true}" title="交互" @nav-bar-back-click="goBack()"/>
    <hips-scroll ref="scroll" :scroll-options="{}">
      <h1 class="note-class">弹窗</h1>
      <div class="note-item">
        <hips-button type="primary" block @click="show1=!show1">显示弹窗</hips-button>
      </div>
      <div class="note-item">
        <hips-button block @click="showTopPopup">顶部弹出</hips-button>
      </div>
      <div class="note-item">
        <hips-button block @click="show3=!show3">底部弹出</hips-button>
      </div>
      <div class="note-item">
        <hips-button block @click="show4=!show4">左侧弹出</hips-button>
      </div>
      <div class="note-item">
        <hips-button block @click="show5=!show5">右侧弹出</hips-button>
      </div>
      <h1 class="note-class">Actionsheet</h1>
      <div class="note-item">
        <hips-button type="primary" block @click="openActionSheet">打开</hips-button>
      </div>
      <h1 class="note-class">轻提示</h1>
      <div class="note-item">
        <hips-button type="primary" block @click="showToast">点击弹出提示</hips-button>
      </div>
      <div class="note-item">
        <hips-button block @click="showToast2">自定义图标</hips-button>
      </div>
      <h1 class="note-class">加载</h1>
      <div class="note-item">
        <hips-button type="primary" block @click="showPlugin">默认加载</hips-button>
      </div>
      <h1 class="note-class">通知</h1>
      <div class="note-item">
        <hips-button type="primary" block @click="showNotify1">弹出通知提示</hips-button>
      </div>
      <div class="note-item">
        <hips-button block @click="showNotify2">不同类型的通知</hips-button>
      </div>
      <div class="note-item">
        <hips-button block @click="showNotify3">自定义通知图标</hips-button>
      </div>
      <div class="note-item">
        <hips-button type="warning" block @click="showNotify4">使用HTML片段</hips-button>
      </div>
      <h1 class="note-class">对话框</h1>
      <div class="note-item">
        <hips-button type="primary" block @click="showAlert1">普通对话框</hips-button>
      </div>
      <div class="note-item">
        <hips-button type="danger" block @click="visible=true">自定义对话框</hips-button>
      </div>
      <div style="height: 50px;background: #f7f7f7;"></div>
    </hips-scroll>
    <hips-popup v-model="show1">
      <div style="padding: 20px 50px;">内容</div>
    </hips-popup>
    <hips-popup v-model="show2" position="top" :overlay="false">
      <div
        style="height: 50px; padding: 0 20px; color: #fff; background: #000000a6; display: flex;align-items: center;justify-content: center;">
        内容
      </div>
    </hips-popup>
    <hips-popup v-model="show3" position="bottom" overlay>
      <div style="height:calc(100vh - 90px); width:calc(100vw - 40px); padding:20px; background:#fff;">
        <hips-button @click="show3=false">隐藏弹窗</hips-button>
      </div>
    </hips-popup>
    <hips-popup v-model="show4" position="left" overlay>
      <div style="height:100vh; width:70vw; padding:20px; background:#fff;">
        <hips-button @click="show4=false">隐藏弹窗</hips-button>
      </div>
    </hips-popup>
    <hips-popup v-model="show5" position="right" overlay>
      <div style="height:100vh; width:70vw; padding:20px; background:#fff;">
        <hips-button @click="show5=false">隐藏弹窗</hips-button>
      </div>
    </hips-popup>
    <hips-dialog v-model="visible" @dialog:ok="handleOk">
      <div slot="title" class="header">Custom title</div>
      <div slot="content" class="content">Custom content</div>
      <div slot="footer" class="footer">Custom footer</div>
    </hips-dialog>
  </hips-view>
</template>

<script>
  import {View, NavBar, Scroll, Button, Popup} from '@hips/vue-ui';

  export default {
    name: "notes",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Scroll.name]: Scroll,
      [Button.name]: Button,
      [Popup.name]: Popup
    },
    data() {
      return {
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        visible: false
      }
    },
    mounted() {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 500)
    },
    methods: {
      // 返回功能
      goBack() {
        this.$router.back();
      },
      showTopPopup() {
        this.show2 = true;
        setTimeout(() => {
          this.show2 = false;
        }, 1000)
      },
      openActionSheet() {
        this.$hips.actionsheet.show({
          theme: 'ios',
          title: 'title',
          subTitle: 'sub-title',
          buttons: [
            {
              text: '转发',
              closeAfterClick: true,
              handler: (index) => {
                console.log(`转发 ${index}`);
              },
            },
            {
              text: '分享',
              handler: (index) => {
                this.$hips.actionsheet.hide();
                console.log(`分享 ${index}`);
              },
            },
          ],
          cancel: {
            text: '取消',
            handler: () => {
              console.log('取消');
            },
          },
        });
      },
      showToast() {
        this.$hips.toast('提示信息')
      },
      showToast2() {
        this.$hips.toast({
          message: '操作完成',
          icon: 'success'
        })
      },
      showNotify1() {
        this.$hips.notify({message: '操作已完成'});
      },
      showNotify2() {
        this.$hips.notify({
          message: '操作已完成',
          type: 'success',
        });
      },
      showNotify3() {
        this.$hips.notify({
          message: '执行错误',
          type: 'error',
          icon: 'collection-o',
        })
      },
      showNotify4() {
        this.$hips.notify({
          dangerouslyMessage: true,
          message: '<strong>This is <i>HTML</i> fragment</strong>',
          type: 'warning',
          center: true,
        });
      },
      showPlugin() {
        this.$hips.indicator.show({
          text: '加载中...',
        });

        const timer = setTimeout(() => {
          clearTimeout(timer);
          this.$hips.indicator.hide();
        }, 3000);
      },
      showAlert1() {
        this.$hips.dialog.alert({
          title: '标题',
          content: '弹窗内容',
          okText: '确定',
          onOk() {
            // on OK
          },
        });
      },
      handleOk() {
        console.log('ok', {visible: this.visible});
      }
    }
  }
</script>

<style scoped lang="stylus">
  .notes {
    background #f7f7f7;
    >>> .hips-nav-bar--default {
      background: #1677ff;
      .hips-nav-bar__buttons {
        color #fff;
        font-size 14px;
      }
      .hips-nav-bar__title {
        color #fff;
      }
    }
    .note-class {
      width: calc(100% - 20px);
      padding: 9px 10px;
      font-size: 14px;
      font-weight: bold;
      color: #ff69b4;
    }
    .note-item {
      width calc(100% - 40px);
      padding: 5px 20px;
      text-align center;
      background #fff;
    }
  }
</style>
