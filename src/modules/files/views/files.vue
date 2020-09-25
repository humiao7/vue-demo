<template>
  <hips-view class="files" :header-height="50" header-fixed content-frozen>
    <!--导航栏-->
    <hips-nav-bar slot="header" :back-button="{showLeftArrow: true}" title="文件管理" @nav-bar-back-click="goBack()"/>
    <hips-scroll ref="scroll" :scroll-options="{}">
      <div class="file-content">
        <halm-file-group class="file-panel" show-date="2020-09-25" title="春游照片" can-upload-file></halm-file-group>
        <halm-file-group class="file-panel" show-date="2020-09-20" title="周会记录"></halm-file-group>
        <halm-file-group class="file-panel" show-date="2020-08-18" title="客户会议"></halm-file-group>
      </div>
    </hips-scroll>
  </hips-view>
</template>

<script>
  import {View, NavBar, Scroll} from '@hips/vue-ui';
  import {HalmFileGroup} from '@/components'

  export default {
    name: "files",
    components: {
      [View.name]: View,
      [NavBar.name]: NavBar,
      [Scroll.name]: Scroll,
      [HalmFileGroup.name]: HalmFileGroup
    },
    data() {
      return {}
    },
    methods: {
      // 返回功能
      goBack() {
        this.$router.back();
      },
    }
  }
</script>

<style scoped lang="stylus">
  .files {
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

    .file-content {
      padding: 10px 0;
      background #fff;
      .file-panel {
        width clac(100% - 30px);
        padding: 0 20px 0 10px;
      }
    }
  }
</style>
