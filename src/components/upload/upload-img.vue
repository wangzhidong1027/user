<template>
  <div class="upimg" :style=style @click="handleClick">
    <div class="bg">
          <slot></slot>
    </div>
    <input type="file" :accept="accept" @change="handleChange" ref="input" style="display: none;">
  </div>
</template>
<script>
export default {
  name: "uploadImg",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    accept: {
      type: String
    },
    post: {
    	type: Function
    }
  },
  data () {
  	return {
      files: []
    }
  },
  computed: {
  	style: function () {
  	  return  'width=' + this.width +";height=" + this.height
    }
  },
  methods: {
  	 handleClick () {
       this.$refs.input.click();
     },
  	handleChange (e) {
      const files = e.target.files;
      if (!files) {
        return;
      }
      this.uploadFiles(files);
      this.$refs.input.value = null;
    },
    uploadFiles (files) {
      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) postFiles = postFiles.slice(0, 1);
      if (postFiles.length === 0) return;
      postFiles.forEach(file => {
        this.post(file);
      });
    },
  }
}
</script>

<style lang="less" scoped>
.upimg {
  .bg{
    width: 100%;
    height: 100%;
  }
}
</style>