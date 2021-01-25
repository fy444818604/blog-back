<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddAccount">
      添加账号
    </el-button>

    <el-table :data="accountList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="账号名" width="400">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名" width="220">
        <template slot-scope="scope">
          {{ scope.row.fullName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="角色">
        <template slot-scope="scope">
          {{ scope.row.roles?scope.row.roles.name:'' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            停用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background :hide-on-single-page="true" :page-size="pageSize" layout="prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import {
    getAccountList
  } from '@/api/user'
  export default {
    data() {
      return {
        accountList: [],
        current: 1,
        total: 0,
        pageSize: 10
      }
    },
    methods: {
      getList() {
        getAccountList({
          current: this.current,
          pageSize: this.pageSize
        }).then(res => {
          this.accountList = res.data[0]
          this.total = res.data[1]
        })
      },
      handleAddAccount() {

      },
      handleEdit(scope) {

      },
      handleDelete(scope) {

      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style lang="scss" scoped="scoped">
</style>
