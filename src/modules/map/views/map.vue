<template>
  <hips-view class="map">
    <div class="nav-tools">
      <i class="hips-icon hips-icon-arrow-left" @click="goBack"></i>
      <img src="../static/head.svg">
      <div class="address">地址</div>
      <img src="../static/robot.svg"/>
    </div>
    <baidu-map id="baiduMap"
               ak="CAyKrU9jUfMsrmeiOehsZtcUvYnNkRIG"
               :center=" {lng:121.156485, lat:31.16797}" :zoom="17">
      <bm-marker :position="{lng:121.339039, lat:31.194474}"/>
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
    </baidu-map>
  </hips-view>
</template>

<script>
  import {View} from '@hips/vue-ui';
  import {BaiduMap, BmMarker, BmInfoWindow, BmNavigation, BmScale} from 'vue-baidu-map/components';

  export default {
    name: "map",
    components: {
      [View.name]: View,
      BaiduMap,
      BmMarker,
      BmInfoWindow,
      BmNavigation,
      BmScale
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
  .map {
    width 100vw;
    height 100vh;

    #baiduMap {
      width 100vw;
      height 100vh;
    }

    .nav-tools {
      width: 90vw;
      padding: 10px;
      display: flex;
      align-items: center;
      position: absolute;
      top: 10px;
      left: calc(5vw - 10px);
      z-index: 99;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 1px 1.6vw rgba(32, 33, 36, .28);

      i {
        padding: 5px 0 5px 5px;
      }

      .address {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
      }

      img {
        width 25px;
        padding: 0 5px 0 10px;
      }
    }
  }
</style>
