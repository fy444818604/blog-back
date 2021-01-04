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
                标签
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky'
import { createLabel, editLabel, fetchOne } from '@/api/label'
const defaultForm = {
  status: 'draft',
  pId: '0',
  id: undefined,
  name: '' // 标签名字
}
export default {
  name: 'LabelDetail',
  components: {
    MDinput,
    Sticky
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
      lang: 'zh',
      postForm: Object.assign({}, defaultForm),
      loading: false,
      tempRoute: {},
      rules: {
        name: [{
          validator: validateRequire
        }]
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchOne(id).then(response => {
        console.log(response)
        // this.userListOptions = [{ value: response.data.label.id, label: response.data.label.name }]
        // const form = Object.assign(response.data, {
        //   status: 'draft',
        //   labelId: response.data.label.id,
        //   image_uri: response.data.photos
        // })
        this.postForm = response.data

        // // set tagsview title
        this.setTagsViewTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑标签' : 'Edit Label'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.postForm.id}`
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            editLabel(this.postForm.id, this.postForm).then(res => {
              if (res.statusCode === 200) {
                this.$notify({
                  title: '成功',
                  message: res.msg,
                  type: 'success',
                  duration: 2000
                })
                this.$router.push({ path: '/label/list' })
              }
            })
          } else {
            createLabel(this.postForm).then(res => {
              if (res.statusCode === 200) {
                this.loading = true
                this.$notify({
                  title: '成功',
                  message: res.msg,
                  type: 'success',
                  duration: 2000
                })
                this.postForm.status = 'published'
                this.loading = false
                this.postForm = Object.assign({}, defaultForm)
                this.$router.push({ path: '/label/list' })
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
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
