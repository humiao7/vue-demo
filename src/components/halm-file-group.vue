<template>
  <div>
    <hips-timeline v-if="canUploadFile || fileList.length>0">
      <hips-timeline-item>
        <div class="category-date"><span>{{formatDate}}</span><span>{{formatTime}}</span></div>
        <div class="category-title">{{title}}</div>
        <div class="category-files">
          <div class="image-container" v-for="file in fileList" :key="file.fileId"
               @click="clickFileHandle(file)">
            <div class="square">
              <div v-show="model==='edit'" :class="file.selected?'dot-active':'dot'"></div>
              <img v-if="file.doc_suffix==='picture'" :src="file.fileUrl">
              <div v-else-if="file.doc_suffix==='doc'" class="file-div doc_file">
                <span>{{file.fileName}}</span>
              </div>
              <div v-else-if="file.doc_suffix==='xls'" class="file-div xls_file">
                <span>{{file.fileName}}</span>
              </div>
              <div v-else-if="file.doc_suffix==='ppt'" class="file-div ppt_file">
                <span>{{file.fileName}}</span>
              </div>
              <div v-else-if="file.doc_suffix==='pdf'" class="file-div pdf_file">
                <span>{{file.fileName}}</span>
              </div>
              <div v-else class="file-div other_file">
                <span>{{file.fileName}}</span>
              </div>
            </div>
          </div>
          <div class="image-container" v-if="canUploadFile" v-show="model!=='edit'"
               style="width: calc(22% - 2.133vw);"
               @click="showUploadPopup=true">
            <div class="square-upload">
              <div style="padding: 25%;position: absolute;"><img src="../assets/add.svg"></div>
            </div>
          </div>
        </div>
      </hips-timeline-item>
    </hips-timeline>
    <hips-popup v-model="showUploadPopup" position="bottom" :overlay="true">
      <div class="upload-menu">
        <div class="menu-item" @click="openAlbum">
          <img src="../assets/album.svg">
          <span>图片</span>
        </div>
        <div class="menu-item" @click="openCamera">
          <img src="../assets/camera.svg">
          <span>拍照</span>
        </div>
        <div class="menu-item">
          <img src="../assets/folder.svg">
          <span>文件</span>
        </div>
      </div>
    </hips-popup>
  </div>
</template>

<script>
  import {Timeline, TimelineItem, Popup} from '@hips/vue-ui';
  import {halmFileGroupService} from "../api";

  export default {
    name: "halm-file-group",
    components: {
      [Timeline.name]: Timeline,
      [TimelineItem.name]: TimelineItem,
      [Popup.name]: Popup
    },
    props: {
      // 时间轴上显示的时间
      showDate: {
        type: String
      },
      // 标题
      title: {
        type: String
      },
      canUploadFile: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        model: "normal", // normal-查看；edit-编辑；
        fileList: [],
        showUploadPopup: false
      }
    },
    created() {
      this.refreshFileList();
    },
    activated() {
      this.refreshFileList();
    },
    methods: {
      changeModel(mode) {
        this.setAllFileSelectFlag(false);
        if (this.fileList.length > 0) {
          this.model = mode;
        } else {
          this.model = 'normal';
        }
      },

      async refreshFileList() {

        let res = halmFileGroupService.getFileList();
        this.fileList = [];
        let imageCounter = 0;
        res.forEach((file) => {
          if (file.fileExistFlag === 1) {
            let extension = file.fileName.substring(file.fileName.lastIndexOf('.') + 1); //文件后缀名
            if (extension === 'png' || extension === 'jpg' || extension === 'jpeg' || extension === 'gif' || extension === 'blob') {
              file.imageIndex = imageCounter;
              imageCounter++;
              file.doc_suffix = 'picture';
            } else if (extension === 'doc' || extension === 'docx') {
              file.doc_suffix = 'doc';
            } else if (extension === 'xls' || extension === 'xlsx') {
              file.doc_suffix = 'xls';
            } else if (extension === 'ppt' || extension === 'pptx') {
              file.doc_suffix = 'ppt';
            } else if (extension === 'pdf') {
              file.doc_suffix = 'pdf';
            } else {
              file.doc_suffix = 'other';
            }
            file.extension = extension;
            file.selected = false;
            this.fileList.push(file);
          }
        });
        this.$emit('fileLoadComplete', this.fileList);
      },

      clickFileHandle(file) {
        if (this.model === 'edit') {
          file.selected = !file.selected;
          this.$emit('fileSelectHandle', this.fileList);
        } else {
          if (file.doc_suffix === 'picture') {
            this.imagePreview(file.imageIndex);
          } else {
            // TODO 打开附件
          }
        }
      },

      setAllFileSelectFlag(boo) {
        this.fileList.forEach(file => {
          file.selected = boo;
        });
      },

      imagePreview(index) {
        let imgs = [];
        this.fileList.forEach((file) => {
          if (file.doc_suffix === 'picture') {
            imgs.push({msrc: file.fileUrl, src: file.fileUrl, desc: file.fileName});
          }
        });
        this.$hips.previewer.show({
          imageSet: imgs,
          options: {
            index: index,
          }
        })
      },

      openAlbum() {
        this.showUploadPopup = false;
      },

      openCamera() {
        this.showUploadPopup = false;
      },

      base64ToBlob(dataurl) {
        let arr = dataurl.split(","),
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: 'image/png'});
      }
    },
    computed: {
      formatDate() {
        if (!!this.showDate) {
          let originDate = new Date(this.showDate);
          let year = originDate.getFullYear(), //年
            month = originDate.getMonth() + 1, //月
            day = originDate.getDate(), //日
            days = originDate.getDay();
          switch (days) {
            case 1:
              days = '星期一';
              break;
            case 2:
              days = '星期二';
              break;
            case 3:
              days = '星期三';
              break;
            case 4:
              days = '星期四';
              break;
            case 5:
              days = '星期五';
              break;
            case 6:
              days = '星期六';
              break;
            case 0:
              days = '星期日';
              break;
          }
          return `${year}-${month}-${day} ${days}`
        } else {
          return;
        }
      },

      formatTime() {
        if (!!this.showDate) {
          let originDate = new Date(this.showDate);
          let hour = originDate.getHours(), //获取当前小时数(0-23)
            minu = originDate.getMinutes(); //获取当前分钟数(0-59)
          return `${hour}:${minu < 10 ? '0' + minu : minu}`;
        } else {
          return;
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

  >>> .hips-timeline-item__head {
    border-color: #ff5722;
    color: #ff5722;
    background #ff5722;
  }

  >>> .hips-timeline-item__tail {
    display block !important;
    border-left: 1px solid #ccc;
  }

  >>> .hips-timeline-item__content {
    .category-date {
      width 100%;
      display inline-flex;
      align-items center;
      justify-content space-between;
      font-size 14px;
      color: #666;
    }
    .category-title {
      display: inline-block;
      position: absolute;
      left: 29px;
      top: 25px;
      padding: 0 10px;
      font-size 14px;
      font-weight bold;
      color: #ff5722;
      background: #fff;
    }
    .category-files {
      width calc(100% - 22px);
      margin: 15px 0 0;
      padding: 15px 7px 2px 15px;
      border 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 1px 2px 6px #aaa;
      display inline-flex;
      align-items center;
      justify-content flex-start;
      flex-wrap wrap;
      .image-container {
        width: calc(25% - 8px);
        padding: 0 8px 8px 0;
        position: relative;
        .square {
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          position: relative;
          img {
            width: 86%;
            height: 86%;
            padding: 7%;
            position: absolute;
            object-fit cover;
          }
          .file-div {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: transparent;
            background-size: 100% 100%;
            span {
              position: absolute;
              bottom: 6px;
              width: calc(100% - 20px);
              height: 12px;
              padding: 0 10px;
              text-align: right;
              font-size: 10px;
              line-height: 12px;
              color: #fff;
              overflow: hidden;
              white-space nowrap;
              text-overflow: ellipsis;
            }
          }
          .doc_file {
            background-image: url("../assets/doc_bg_doc.svg");
          }
          .xls_file {
            background-image: url("../assets/doc_bg_xls.svg");
          }
          .ppt_file {
            background-image: url("../assets/doc_bg_ppt.svg");
          }
          .pdf_file {
            background-image: url("../assets/doc_bg_pdf.svg");
          }
          .other_file {
            background-image: url("../assets/doc_bg_other.svg");
          }
          .dot {
            width: 10px;
            height: 10px;
            border: 1px solid #ff5722;
            background: #fff;
            position: absolute;
            top: 1px;
            right: 1px;
            z-index: 99;
            border-radius: 50%;
          }
          .dot-active {
            width: 10px;
            height: 10px;
            border: 1px solid #fff;
            background: #ff5722;
            position: absolute;
            top: 1px;
            right: 1px;
            z-index: 99;
            border-radius: 50%;
          }
        }
        .square-upload {
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          position: relative;
          border: 1px dashed #777;
          border-radius 5px;
          img {
            width: 100%;
            height: 100%;
            position: absolute;
            object-fit cover;
          }
        }
      }
    }
  }

  .upload-menu {
    display: flex;
    align-items: center;
    padding: 50px 20px;
    justify-content: space-around;
    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 30px;
      }
      span {
        margin-top 10px;
        font-size 12px;
      }
    }
  }
</style>
