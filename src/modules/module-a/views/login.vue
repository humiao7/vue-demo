<template>
  <div class="login">
    <hips-spin />
    <div>this is login page</div>
  </div>
</template>

<script>
import { Spin } from "@hips/vue-ui";

import { Store } from "@hips/vue-core";

const { mapGetters } = Store;

export default {
  name: "Login",
  beforeRouteEnter(to, form, next) {
    next(vm => {
      let searchObj = vm.getLocationSearch() || {};
      console.log("searchObj = ", searchObj);
      //vm.$router.replace("page1");
    });
  },
  components: {
    [Spin.name]: Spin
  },
  methods: {
    ...mapGetters(["getLocationSearch"])
  }
};
</script>

<style scoped lang="stylus">
.login {
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
</style>
