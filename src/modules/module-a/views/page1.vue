<template>
  <hips-view>
    <hips-nav-bar
      slot="header"
      :back-button="{
        showLeftArrow:true,
        backText:'返回'
      }"
      title="这是第 1 个页面"
      @nav-bar-back-click="$router.back()"
    />    
    <hips-button @click="switchLang">{{$t('switchLang')}}</hips-button>

    <hips-button @click="showToast">show toast</hips-button>
  </hips-view>
</template>

<script>
import { View, Button, NavBar } from "@hips/vue-ui";

import { switchLocale } from "@hips/plugin-vue-i18n";

export default {
  name: "Page1",
  components: {
    [View.name]: View,
    [Button.name]: Button,
    [NavBar.name]: NavBar
  },
  data() {
    return {};
  },
  methods: {    
    switchLang() {
      switchLocale("en");
    },
    showToast(){
      this.$hips.toast('hand')
    }
  }
};
</script>

<style scoped lang="stylus"></style>
