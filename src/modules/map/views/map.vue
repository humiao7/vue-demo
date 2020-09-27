<template>
  <hips-view class="map">
    <div class="nav-tools">
      <i class="hips-icon hips-icon-arrow-left" @click="goBack"></i>
      <img src="../static/head.svg">
      <div class="address">湖南省长沙市岳麓区</div>
      <img src="../static/robot.svg"/>
    </div>
    <baidu-map id="baiduMap" ak="CAyKrU9jUfMsrmeiOehsZtcUvYnNkRIG" :center="{lng:112.945308, lat:28.234684}" :zoom="17">
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <bm-marker :position="{lng:112.945308, lat:28.234684}"/>
      <bm-marker :position="{lng:112.945608, lat:28.231084}"/>
      <bm-circle :center="{lng:112.945308, lat:28.234684}" :radius="200" fill-color="#ff5722" :fill-opacity="0.3"
                 stroke-color="#ff5722" :stroke-opacity="0.8" :stroke-weight="2"></bm-circle>
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-polyline :path="[{lng:112.945308, lat:28.234684},{lng:112.945608, lat:28.231084}]" stroke-color="blue"
                   :stroke-opacity="0.5" :stroke-weight="2"></bm-polyline>
    </baidu-map>
  </hips-view>
</template>

<script>
  import {View} from '@hips/vue-ui';
  import {
    BaiduMap,
    BmMarker,
    BmNavigation,
    BmGeolocation,
    BmScale,
    BmCircle,
    BmPolyline
  } from 'vue-baidu-map/components';

  export default {
    name: "map",
    components: {
      [View.name]: View,
      BaiduMap,
      BmMarker,
      BmNavigation,
      BmGeolocation,
      BmScale,
      BmCircle,
      BmPolyline
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
