<template>
  <hips-view class="forms" :header-height="50" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar :back-button="{showLeftArrow: true}" title="表单" @nav-bar-back-click="goBack()"/>
    <hips-scroll ref="scroll" :scroll-options="{}">
      <h1 class="forms-title">Input输入框</h1>
      <hips-input class="forms-line" label="姓名" label-icon="mine-o" placeholder="请输入姓名" type="text"
                  label-position="left"/>
      <hips-input class="forms-line" label="身份证" label-icon="customer" placeholder="请输入" type="text"
                  label-position="left"/>
      <hips-input class="forms-line" show-clear-button show-eye label="密码" placeholder="请输入密码" type="password"
                  label-position="left"
                  input-align="left"/>
      <hips-input show-clear-button label="验证码" placeholder="请输入" type="text" label-position="left" input-align="left">
        <div slot="right" class="button" style="display: flex;align-items: center;justify-content: center;">
          <hips-button type="primary">发送验证码</hips-button>
        </div>
      </hips-input>
      <h1 class="forms-title">星级评分</h1>
      <div class="forms-line">
        <hips-rate v-model="value1" :max="5" size="20px" show-score/>
      </div>
      <div class="forms-line">
        <hips-rate v-model="value2" :max="10" size="22px" icon="like" active-color="red" show-score readonly/>
      </div>
      <h1 class="forms-title">开关</h1>
      <div class="forms-line">
        <hips-switch v-model="checked" width="80" checkedText="开" uncheckedText="关"/>
        <hips-switch v-model="checked" disabled/>
        <hips-switch v-model="checked" loading/>
      </div>
      <hips-switch-cell class="forms-line" v-model="checked" title="标题"/>
      <h1 class="forms-title">步进器</h1>
      <div class="forms-line">
        <hips-stepper step="0.1" max="200" v-model="data0"/>
      </div>
      <h1 class="forms-title">签字板</h1>
      <div class="flex-btn">
        <hips-button type="primary" @click="clickBtn('clear')">清除</hips-button>
        <hips-button type="primary" @click="clickBtn('undo')">撤销</hips-button>
        <hips-button type="primary" @click="clickBtn('save')">保存</hips-button>
        <hips-button type="primary" @click="clickBtn('resize')">新建画布</hips-button>
      </div>
      <hips-signature class="signature" ref="signature1" width="100%" height="150px"/>
    </hips-scroll>
  </hips-view>
</template>

<script>
  import {View, NavBar, Scroll, Input, Button, Rate, Switch, SwitchCell, Stepper, Signature} from '@hips/vue-ui';

  export default {
    name: "forms",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Scroll.name]: Scroll,
      [Input.name]: Input,
      [Button.name]: Button,
      [Rate.name]: Rate,
      [Switch.name]: Switch,
      [SwitchCell.name]: SwitchCell,
      [Stepper.name]: Stepper,
      [Signature.name]: Signature
    },
    data() {
      return {
        value1: 2.5,
        value2: 8.5,
        checked: false,
        data0: 0
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
      clickBtn(type) {
        switch (type) {
          case "clear":
            this.$refs.signature1.clear();
            break;
          case "save":
            let png = this.$refs.signature1.save(); // 生成png
            let jpeg = this.$refs.signature1.save("image/jpeg"); // 生成jpeg
            let svg = this.$refs.signature1.save("image/svg+xml"); // 生成svg
            console.log(png);
            console.log(jpeg);
            console.log(svg);
            this.defaultUrl = png;
            break;
          case "undo":
            this.$refs.signature1.undo();
            break;
          case "resize":
            this.height = "400px";
            this.$refs.signature1.$emit("hips-signature:resize");
            // 触发resize 也可以this.$refs.signature1.resizeCanvas()
            break;
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .forms {
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
    .forms-title {
      width: calc(100% - 20px);
      padding: 9px 10px;
      font-size: 14px;
      font-weight: bold;
      color: #00b478;
    }
    .forms-line {
      min-height: 40px;
      padding: 0 4vw;
      background: #fff;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #efefef;
    }
    .hips-switch {
      margin-right 20px;
    }
    .signature {
      margin-bottom 50px;
    }
  }
</style>
