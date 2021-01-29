<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">

      <el-table-column min-width="180px" label="封面">
        <template slot-scope="{row}">
          <span>{{ row.notes.length }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标题">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="创建人">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建日期">
        <template slot-scope="scope">
          <span>{{ formatTime(scope.row.createTime,'yyyy-MM-dd hh:mm') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="scope">
          <el-row>
            <router-link :to="'/label/edit/'+scope.row.id">
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
import Pagination from '@/components/Pagination'
import { dateFormat } from '@/utils/index'
import { fetchList } from '@/api/photo'
export default {
  name: 'LabelList',
  components: { Pagination },
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
      fetchList().then(response => {
        console.log(response);
        // this.list = response.data
        // this.list = response.data[0]
        // this.total = response.data[1]
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
</style>
