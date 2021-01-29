<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">

      <el-table-column min-width="300px" label="标题">
        <template slot-scope="{row}">
          <router-link :to="'/example/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建日期">
        <template slot-scope="scope">
          <span>{{ formatTime(scope.row.createTime,'yyyy-MM-dd hh:mm') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author || '黎先生' }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="标签">
        <template slot-scope="scope">
          <span>{{ scope.row.label.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="浏览">
        <template slot-scope="scope">
          <span>{{ scope.row.label.num || 123 }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="点赞">
        <template slot-scope="scope">
          <span>{{ scope.row.label.num || 28 }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="scope">
          <el-row>
            <router-link :to="'/example/edit/'+scope.row.id">
              <el-button type="primary" size="small" icon="el-icon-edit">
                编辑
              </el-button>
            </router-link>
            <el-button type="primary" size="small" icon="el-icon-delete" style="margin-left: 5px;" @click.native="del(scope.row.id)">
              删除
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, delArticle } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { dateFormat } from '@/utils/index'

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    formatTime(val, fmt) {
      return dateFormat(new Date(val), fmt)
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data[0]
        this.total = response.data[1]
        this.listLoading = false
      })
    },
    del(id) {
      delArticle(id).then(res => {
        if (res.statusCode === 200) {
          this.getList()
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
