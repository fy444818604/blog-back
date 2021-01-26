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
      <el-table-column label="状态" width="220">
        <template slot-scope="scope">
          {{ scope.row.status?'启用':'停用' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ scope.row.status?'停用':'启用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background :hide-on-single-page="true" :page-size="pageSize" layout="prev, pager, next" :total="total">
    </el-pagination>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'新建'">
      <el-form :model="account" label-width="80px" label-position="left">
        <el-form-item label="账号名">
          <el-input v-model="account.username" placeholder="账号名" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="account.fullName" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="account.roles" placeholder="请选择角色">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          取消
        </el-button>
        <el-button type="primary" @click="confirmAccount">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getAccountList,
    addUser
  } from '@/api/user'
  import { getRoles } from '@/api/role'

  const defaultAccount = {
    userId:'',
    username: '',
    fullName: `用户${+new Date()}`,
    roles: ''
  }
  export default {
    data() {
      return {
        dialogVisible: false,
        dialogType: 'new',
        accountList: [],
        current: 1,
        total: 0,
        pageSize: 10,
        account: Object.assign({}, defaultAccount),
        options:[]
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
      getRoles() {
        getRoles().then(res => {
          this.options = res.data
        })
      },
      handleAddAccount() {
        this.account = Object.assign({}, defaultAccount)
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEdit(scope) {
        console.log(scope);
        this.account = Object.assign(this.account,{
          userId:scope.row.userId,
          username: scope.row.username,
          fullName: scope.row.fullName,
          roles: scope.row.roles ? scope.row.roles.id : ''
        })
        this.dialogType = 'edit'
        this.dialogVisible = true
      },
      handleDelete(scope) {
        addUser({
          userId:scope.row.userId,
          status:!scope.row.status
        }).then(res => {
          this.getList()
        })
      },
      confirmAccount() {
        addUser(this.account).then(res => {
          this.getList()
          this.dialogVisible = false
        })
      }
    },
    created() {
      this.getList();
      this.getRoles()
    }
  }
</script>

<style lang="scss" scoped="scoped">
</style>
