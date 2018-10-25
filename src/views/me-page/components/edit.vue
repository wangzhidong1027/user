<template>
  <div id="edit">
    <x-header>{{title}}<a slot="right" style="color: #ff9900" @click="change">完成</a></x-header>
    <group :gutter="1" v-if="type != 'realname'">
      <x-input v-model="value" :placeholder="placeholder"></x-input>
    </group>
    <div class="idcard" v-if="type == 'realname'">
      <div class="upload">
        <p>请上传身份证正面照片</p>
        <div class="dimg just" @click="clickInput('faceIdcard')">
          <a v-if='!faceIdcard'></a>
          <img v-if='faceIdcard' :src="faceIdcard" alt="">
          <input type="file" id="faceIdcard" ref="faceIdcard" accept="image/*"
                 @change="ImgBase64($event,'faceIdcard')" name="bslicense">
        </div>
        <p>请上传身份证反面照片</p>
        <div class="dimg just" @click="clickInput('backIdcard')">
          <a v-if='!backIdcard'></a>
          <img v-if='backIdcard' :src="backIdcard" alt="">
          <input type="file" id="backIdcard" ref="backIdcard" accept="image/*"
                 @change="ImgBase64($event,'backIdcard')" ImgBase64 name="bslicense">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import {XButton, XHeader, XInput, Group} from "vux"
	import UploadImg from "../../../components/upload/upload-img"

	export default {
		name: "edit",
		components: {
			XButton,
			XHeader,
			XInput,
			Group,
			UploadImg
		},
		data() {
			return {
				value: '',
				type: '',
				title: '',
				placeholder: '',
        faceIdcard: '',
        backIdcard: "",
        faceInfo: "",
        backInfo: ""
			}
		},
		methods: {
			clickInput(Dom) {
				var img = document.getElementById(Dom);
				img.click();
			},
			ImgBase64(e, type) {
				let tag = e.target;
				let fileList = tag.files;
				let imgNum = fileList.length;
				let _this = this;
				var _type = type;
				if (!fileList.length) {
					return;
				}
				// var Orientation = null;
				// EXIF.getData(fileList[0], function () {
				// 	Orientation = EXIF.getTag(fileList[0], "Orientation");
				// });
				let reader = new FileReader();
				reader.readAsDataURL(fileList[0]);
				reader.onload = function (e) {
					var image = new Image();
					image.src = e.target.result;
					image.onload = function () {
						var expectWidth = image.naturalWidth;
						var expectHeight = image.naturalHeight;
						if (type == "logo") {
							expectWidth = 800;
							expectHeight = 800;
						} else {
							if (
								this.naturalWidth > this.naturalHeight &&
								this.naturalWidth > 800
							) {
								expectWidth = 800;
								expectHeight =
									expectWidth * this.naturalHeight / this.naturalWidth;
							} else if (
								this.naturalHeight > this.naturalWidth &&
								this.naturalHeight > 1200
							) {
								expectHeight = 1200;
								expectWidth =
									expectHeight * this.naturalWidth / this.naturalHeight;
							}
						}
						var canvas = document.createElement("canvas");
						var ctx = canvas.getContext("2d");
						canvas.width = expectWidth;
						canvas.height = expectHeight;
						ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
						var base64 = null;
						// 修复ios上传图片的时候 被旋转的问题
						// if (Orientation != "" && Orientation != 1) {
						//   switch (Orientation) {
						//     case 6://需要顺时针（向左）90度旋转
						//       _this.rotateImg(this, 'left', canvas);
						//       break;
						//     case 8://需要逆时针（向右）90度旋转
						//       _this.rotateImg(this, 'right', canvas);
						//       break;
						//     case 3://需要180度旋转
						//       _this.rotateImg(this, 'right', canvas);//转两次
						//       _this.rotateImg(this, 'right', canvas);
						//       break;
						//   }
						// }

						base64 = canvas.toDataURL("image/jpeg", 1);
						// if(!base64){
						//   Toast('上传失败，请重新选择图片，或者更换图片')
						//   return
						// }
						_this.upimg(base64, _type, _this);
					};
				};
			},
			upimg(imgsrc, category, _this){
					var _this = this;
					if (category == "faceIdcard") {
						this.$axios.post(
								this.$baseUrl + "/toolcate/idCardOcr",
								this.$qs.stringify({
									side:this.$base64.encode("face"),
                  img: imgsrc
								})
							)
							.then(res => {
								var a = JSON.parse(this.$base64.decode(res.data));
								if (a.code == 10000) {
                  if( a.data.code == 10000) {
                      this.faceIdcard = imgsrc
                      this. faceInfo = a.data.data.userifno
                    }else{
                  		this.faceIdcard = ""
                  	  this.$vux.toast.show({
                        type: "cancel",
                        text: "身份识别失败，请重新上传",
                        width: "3em",
                        position: "middle",
                        isShowMask: true
                      });
                  }
								} else {
									this.faceIdcard = ""
									this.$vux.toast.show({
                    type: "cancel",
                    text: "身份识别失败，请重新上传",
                    width: "3em",
                    position: "middle",
                    isShowMask: true
                  });
								}
							})

					}
					if (category == "backIdcard") {
						this.$axios.post(
								this.$baseUrl + "/toolcate/idCardOcr",
								this.$qs.stringify({
									side: this.$base64.encode("back"),
                  img: imgsrc
								})
							)
							.then(res => {
                var a = JSON.parse(this.$base64.decode(res.data));
								if (a.code == 10000 ) {
                    if( a.data.code == 10000) {
                      this.backIdcard = imgsrc
                      this. backInfo = a.data.data.userifno
                    }else{
                    	 this.backIdcard = ""
                      this.$vux.toast.show({
                        type: "cancel",
                        text: "身份识别失败，请重新上传",
                        width: "3em",
                        position: "middle",
                        isShowMask: true
                      });
                    }
								} else {
									 this.backIdcard = ""
                   this.$vux.toast.show({
                    type: "cancel",
                    text: "身份识别失败，请重新上传",
                    width: "3em",
                    position: "middle",
                    isShowMask: true
                  });
								}
							})
					}
			},
			change() {
				if (this.type == "realname") {
					// 个人认证信息
          this.realname()
				} else {
					// 信息修改
					if (!this.value) {
						return false
					}
					var data = {}
					data[this.type] = this.value
					data = this.$base64.encode(JSON.stringify(data))
					this.$axios.post(this.$baseUrl + '/per/fillinfo', this.$qs.stringify({
						data: data
					})).then(result => {
						var res = JSON.parse(this.$base64.decode(result.data))
						if (res.code == 10000) {
							this.$vux.toast.show({
								text: "设置成功",
								width: "3em",
								position: "middle",
								isShowMask: true
							});
							this.$router.push({
								path: "/me"
							})
						} else {
							this.$vux.toast.show({
								type: "cancel",
								text: res.message,
								width: "3em",
								position: "middle",
								isShowMask: true
							});
						}
					})
				}
			},
      realname () {
        if( this.backIdcard &&this.faceIdcard ) {
          this.$axios.post(this.$baseUrl + '/toolcate/idCardAnaly',this.$qs.stringify({
            face: this.$base64.encode(JSON.stringify(this.faceInfo)),
            back: this.$base64.encode(JSON.stringify(this.backInfo)),
            type: this.$base64.encode("1")
          })).then(result => {
          	var res = JSON.parse(this.$base64.decode(result.data))
          	if( res.code == 10000) {
              this.$vux.toast.show({
								text: "设置成功",
								width: "3em",
								position: "middle",
								isShowMask: true
							});
							this.$router.push({
								path: "/me"
							})
            }else{
          		this.$vux.toast.show({
								type: "cancel",
								text: res.message,
								width: "3em",
								position: "middle",
								isShowMask: true
							});
            }
          })
        }
      }
		},
		created() {
			this.type = this.$route.params.type
			if (this.type == 'username') {
				this.title = '设置昵称';
				this.placeholder = '请输入昵称';
			}
			if (this.type == 'email') {
				this.title = '设置邮箱';
				this.placeholder = '请输入邮箱';
			}
			if (this.type == 'car_num') {
				this.title = '绑定车辆';
				this.placeholder = '请输入车牌，如（京A00000）';
			}
			if (this.type == 'realname') this.title = '实名认证';
		}
	}
</script>

<style lang="less" scoped>
  #edit {
    height: 100%;
    width: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .btn-box {
      padding: 1rem 0.6rem;
    }
    .upload {
      padding: 0 0.5rem;
      p {
        font-size: 18px;
        line-height: 35px;
      }
      .dimg {
        width: 100%;
        height: 4rem;
        border: 1px solid #eee;
        background: #eee;
        input {
          display: none;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
