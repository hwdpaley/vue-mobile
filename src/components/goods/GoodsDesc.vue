<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>

    <hr>

    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // info: {} // 图文数据
    };
  },
  computed: {
    info() {
      return this.$store.getters.goodsdesc;
    }
  },
  mounted() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$store.commit("getGoodsDesc", this.$route.params.id);
    }
  }
};
</script>

<style lang="scss">
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
