<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="文章标题" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.title | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="创建时间" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.createTime | format }}
      </template>
    </el-table-column>
    <el-table-column label="标签" width="100" align="center">
      <template slot-scope="scope">
        <el-tag>
          {{ scope.row.label.name }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchList } from '@/api/article'
import { dateFormat } from '@/utils/index'

export default {
  filters: {
    orderNoFilter(title) {
      return title.substring(0,30)
    },
    format(createTime) {
      return dateFormat(new Date(createTime),'yyyy-MM-dd hh:mm')
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchList({
        current:1,
        pageSize:8
      }).then(response => {
        this.list = response.data[0]
      })
    }
  }
}
</script>
