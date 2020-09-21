<template>
  <hips-view class="Applications">
    <hips-row>
      <hips-col class="module" v-for="(item,index) in modules" :key="index"
                span="8" @click.native="$router.push({name:`${item.route}`})">
        {{ item.name }}
      </hips-col>
    </hips-row>
  </hips-view>
</template>

<script>
  import {View, Col, Row} from '@hips/vue-ui'

  export default {
    name: "Applications",
    components: {
      [View.name]: View,
      [Col.name]: Col,
      [Row.name]: Row
    },
    data() {
      return {
        modules: [
          {
            name: '日历',
            route: 'calendar'
          }
        ],
      };
    },
    methods: {},
  };
</script>

<style scoped lang="stylus">
  .module {
    height 120px
    display flex
    justify-content center
    align-items center
    border 1px solid #ccc
  }
</style>
