<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          提交
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="name">
              <MDinput v-model="postForm.name" :maxlength="100" name="name" required>
                相册名
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="封面:" prop="cover" style="margin-bottom: 30px;">
          <Upload v-model="postForm.cover" :limit="1" />
        </el-form-item>
        <el-form-item v-if="isEdit" label="相片:" style="margin-bottom: 30px;">
          <Upload v-model="uploadPic" :limit="1000" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { photosCreate, photoSearch } from '@/api/photo'

const defaultForm = {
  status: 'draft',
  name: '', // 相册名称
  cover: [], // 相册封面
  photos: [],
  id: undefined
}

export default {
  name: 'photosDetail',
  components: {
    MDinput,
    Upload,
    Sticky,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '' || value.length === 0) {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      uploadPic:[],
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        cover: [{
          validator: validateRequire
        }],
        name: [{
          validator: validateRequire
        }]
      },
      tempRoute: {}
    }
  },
  watch:{
    uploadPic(val) {
      if(val.length > 0){
        console.log(val)
        // this.uploadPic = []
        // this.fetchData(this.postForm.id)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.postForm.id = id
      this.fetchData(id)
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      photoSearch(id).then(response => {
        this.postForm = Object.assign(this.postForm,{
          status: 'draft',
          name:response.data.name,
          cover:[{url:response.data.cover}],
          photos:response.data.photos
        })
        this.setTagsViewTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑相册' : 'Edit photos'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.postForm.name}`
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            updateArticle(this.postForm.id, this.postForm).then(res => {
              if (res.statusCode === 200) {
                this.$notify({
                  title: '成功',
                  message: res.msg,
                  type: 'success',
                  duration: 2000
                })
                this.$router.push({ path: '/example/list' })
              }
            })
          } else {
            this.loading = true
            photosCreate({
              name: this.postForm.name,
              cover: this.postForm.cover[0].url,
            }).then(res => {
              console.log(res);
              if (res.statusCode === 200) {
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success',
                  duration: 2000
                })
                this.postForm.status = 'published'
                this.loading = false
                setTimeout(() => {
                  this.$router.push({
                    path: '/photos/edit/' + res.data.id
                  })
                },1000)
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }

  .article-textarea ::v-deep {
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }
</style>
