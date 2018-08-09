<template>
    <Card>
        <Form :model="formItem" :label-width="80">
            <FormItem label="项目名称">
                <Input v-model="formItem.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="项目描述">
                <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 20,maxRows: 40}" placeholder="输入项目描述"></Input>
            </FormItem>
            <FormItem label="负责人">
                <Select v-model="formItem.manager" filterable>
                    <Option v-for="user in users" :value="user.id" :key="user.id">{{ user.username }}</Option>
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
            </FormItem>
        </Form>
    </Card>
</template>
<script>
    import { getUsers } from '@/api/user'
    import { addProject } from '@/api/project'
    export default {
        name: 'newProject',
        data () {
            return {
                formItem: {
                    name: '',
                    description: '',
                    manager: '',
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
            this.getUserList()
        },
        methods: {
            save: function () {
                if (this.checkForm()) {
                    addProject(this.formItem).then((res) => {
                        this.$Notice.success({
                            title: '通知',
                            desc: '添加成功！'
                        })
                        this.$router.replace({
                            name: 'project-detail',
                            params: {
                                projectId: res.id
                            }
                        })
                    })
                }
            },
            getUserList: function () {
                getUsers().then((res) => {
                    this.users = res.users
                })
            },
            checkForm: function () {
                this.alert = []
                var flag = true
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
