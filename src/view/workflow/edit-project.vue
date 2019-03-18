<template>
    <Card>
        <Form :model="formItem" :label-width="80">
            <FormItem label="项目编号">
                <Input v-model="formItem.id" placeholder="输入项目编号" disabled></Input>
            </FormItem>
            <FormItem label="项目名称">
                <Input v-model="formItem.name" placeholder="输入项目名称"></Input>
            </FormItem>
            <FormItem label="项目状态">
                <Input v-model="formItem.project_status_name" disabled></Input>
            </FormItem>
            <FormItem label="投标状态">
                <Input v-model="formItem.tender_status_name" disabled></Input>
            </FormItem>
            <FormItem label="合同状态">
                <Input v-model="formItem.contract_status_name" disabled></Input>
            </FormItem>
            <FormItem label="项目描述">
                <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 15,maxRows: 40}" placeholder="输入项目描述"></Input>
            </FormItem>
            <FormItem label="负责人">
                <Select v-model="formItem.manager" :placeholder="formItem.manager_name" filterable>
                    <Option v-for="(user, key) in users" :value="user.value" :key="key">{{ user.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="委托单位">
                <Input v-model="formItem.client" placeholder=""></Input>
            </FormItem>
            <FormItem label="所在镇">
                <Input v-model="formItem.town" placeholder=""></Input>
            </FormItem>
            <FormItem label="地点">
                <Input v-model="formItem.place" placeholder=""></Input>
            </FormItem>
            <FormItem label="联系人">
                <Input v-model="formItem.contacts" placeholder=""></Input>
            </FormItem>
            <FormItem label="联系电话">
                <Input v-model="formItem.contacts_phone" placeholder=""></Input>
            </FormItem>
            <FormItem label="备注信息">
                <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 10,maxRows: 20}" placeholder="输入备注信息"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="save">保存</Button>
                <Button type="info" @click="saveAndRepost">保存并重新提交审批</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { getUsers } from '@/api/user'
import { updateProject, getProjectDetail } from '@/api/project'
export default {
  name: 'editProject',
  props: {
    projectId: String
  },
  data () {
    return {
      formItem: {
        id: '',
        name: '',
        project_status: 0,
        project_status_name: '',
        tender_status: 0,
        tender_status_name: '',
        contract_status: 0,
        contract_status_name: '',
        description: '',
        manager: '',
        manager_name: '',
        client: '',
        town: '',
        place: '',
        contacts: '',
        contacts_phone: '',
        remark: '',
        create_time: new Date(),
        end_time: new Date()
      },
      users: [],
      alert: []
    }
  },
  mounted: function () {
    // this.getUserList()
    this.initProject()
  },
  methods: {
    initProject: function () {
      getProjectDetail({
        id: this.projectId
      }).then((res) => {
        if (res) {
          this.formItem = res
          this.getUserList()
        }
      })
    },
    save: function () {
      if (this.checkForm()) {
        updateProject(this.formItem).then((res) => {
          this.formItem = res
          this.$Notice.success({
            title: '通知',
            desc: '保存成功！'
          })
        })
      }
    },
    saveAndRepost: function () {
      // 保存和重新提交审批
      this.formItem.project_status = 0
      this.save()
    },
    getUserList: function () {
      getUsers().then((res) => {
        this.users = res.users.map((r) => {
          return {
            value: r.id,
            label: r.realname + '(' + r.groups.join(' ') + ')'
          }
        })
      })
    },
    checkForm: function () {
      this.alert = []
      var flag = true
      if (!this.formItem.id) {
        this.alert.push('项目编号不能为空！')
      }
      if (!this.formItem.name) {
        this.alert.push('项目名称不能为空！')
      }
      if (!this.formItem.description) {
        this.alert.push('项目描述不能为空！')
      }
      if (!this.formItem.manager) {
        this.alert.push('负责人不能为空！')
      }
      if (!this.formItem.client) {
        this.alert.push('委托单位不能为空')
      }
      if (!this.formItem.town) {
        this.alert.push('所在镇/区 不能为空！')
      }
      if (!this.formItem.place) {
        this.alert.push('地点不能为空！')
      }
      if (this.alert.length > 0) {
        this.$Notice.error({
          title: '通知',
          desc: this.alert.join('<br>')
        })
        flag = false
      }
      return flag
    }
  }
}
</script>
