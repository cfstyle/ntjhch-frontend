<template>
    <div>
        <Row v-if="showEditProject">
            <div style=" margin-bottom: 10px">
                <Button  type="ghost" size="large" @click="backToProjectDetail">
                    <Icon type="chevron-left"></Icon>&nbsp;返回
                </Button>
            </div>
        </Row>
        <Row v-if="!showEditProject">
            <Col span="24">
                <div v-if="showHiddenFunction" style="text-align: right; margin-bottom: 10px">
                    <Button v-if="details.project_status == 0" type="primary" size="large" @click="accept">审批通过</Button>
                    <Button v-if="details.project_status == 0" type="error" size="large" @click="reject">审批驳回</Button>
                </div>
                <div style=" margin-bottom: 10px">
                    <Button type="warning" size="large" @click="editProject">修改项目</Button>
                    <Button v-if="details.tender_status == 0" type="info" size="large" @click="assignJob">分配任务</Button>
                </div>
            </Col>
            <Col span="24">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-document"></Icon>
                        项目详情
                    </p>
                    <div class="project-head">
                        <div class="project-title">
                            <h1>{{ details.name }}</h1>
                        </div>
                        <div class="project-title">
                            <span class="title-sub">负责人： {{ details.manager_name }}</span>
                        </div>
                    </div>
                    <div class="project-status">
                        <Row :gutter="20">
                            <Col span="8">
                                <Card>
                                    <p slot="title" class="card-title">投标状态</p>
                                    <div class="status">
                                        <span :class="project.tenderStatus.class"><Icon :type="project.tenderStatus.icon"></Icon>
                                        {{ details.tender_status_name }}</span>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="8">
                                <Card>
                                    <p slot="title" class="card-title">合同状态</p>
                                    <div class="status">
                                        <span :class="project.contractStatus.class"><Icon :type="project.contractStatus.icon"></Icon>
                                        {{ details.contract_status_name }}</span>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="8">
                                <Card>
                                    <p slot="title" class="card-title">项目状态</p>
                                    <div class="status">
                                        <span :class="project.projectStatus.class"><Icon :type="project.projectStatus.icon"></Icon>
                                        {{ details.project_status_name }}</span>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    <Card style="margin-bottom: 20px">
                        <p slot="title" class="card-title">基本信息</p>
                        <div class="project-baseinfo">
                            <Row :gutter="20">
                                <Col span="6">
                                    <div class="baseinfo">
                                        立项时间：
                                        <span>{{ details.create_time }}</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div class="baseinfo">
                                        结项时间：<span>{{ details.end_time }}</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div class="baseinfo">
                                        委托单位：
                                        <span>{{ details.client }}</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div class="baseinfo">
                                        所在镇：
                                        <span>{{ details.town }}</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div class="baseinfo">
                                        地点：
                                        <span>{{ details.place }}</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div class="baseinfo">
                                        联系人：
                                        <span>{{ details.contacts }}</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div class="baseinfo">
                                        联系电话：
                                        <span>{{ details.contacts_phone }}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                    <Card style="margin-bottom: 20px">
                        <p slot="title" class="card-title">项目描述</p>
                        <div class="project-detail">
                            <div>{{ details.description }}</div>
                        </div>
                    </Card>
                    <Card style="margin-bottom: 20px">
                        <p slot="title" class="card-title">备注信息</p>
                        <div class="project-remark">
                            <div>
                                {{ details.remark }}
                            </div>
                        </div>
                    </Card>
                </Card>
            </Col>
            <Col span="24">
                <div v-if="showGrouperFunction" style="margin-top: 10px">
                    <Button type="warning" size="large" @click="editProject">修改项目</Button>
                    <Button v-if="details.tender_status == 0" type="info" size="large" @click="assignJob">分配任务</Button>
                </div>
                <div v-if="showHiddenFunction" style="text-align: right; margin-bottom: 10px">
                    <Button v-if="details.project_status == 0" type="primary" size="large" @click="accept">审批通过</Button>
                    <Button v-if="details.project_status == 0" type="error" size="large" @click="reject">审批驳回</Button>
                </div>
            </Col>
            <Col span="24">
                <Card style="margin-bottom: 20px">
                    <p slot="title" class="card-title">
                        <Icon type="chatbubble"></Icon>
                        项目评论
                    </p>
                    <div>
                        sfsdf
                    </div>
                </Card>
            </Col>
        </Row>
        <Row v-if="showEditProject" class="new-project">
            <edit-project :project-id="project.id"></edit-project>
        </Row>
    </div>
</template>
<script>

import Cookies from 'js-cookie'
import { STATUS_MAP } from '@/libs/util'
import {
  getProjectDetail,
  rejectProject,
  acceptProject} from '@/api/project'
import editProject from './edit-project.vue'

export default {
  name: 'project-detail',
  components: {
    editProject
  },
  data () {
    return {
      details: {},
      project: {
        id: -1,
        projectStatus: {
          icon: '',
          class: ''
        },
        tenderStatus: {
          icon: '',
          class: ''
        },
        contractStatus: {
          icon: '',
          class: ''
        }

      },
      showHiddenFunction: false,
      showEditProject: false,
      showGrouperFunction: false
    }
  },
  mounted () {
    this.loadHiddenFunction()
    this.getProjectId()
    this.getDetail()
  },
  methods: {
    getDetail () {
      getProjectDetail(this.project).then((res) => {
        this.details = res
        const projectStatus = res.project_status_name
        const tenderStatus = res.tender_status_name
        const contractStatus = res.contract_status_name
        this.project.projectStatus = {
          icon: STATUS_MAP[projectStatus].icon,
          class: STATUS_MAP[projectStatus].class
        }
        this.project.tenderStatus = {
          icon: STATUS_MAP[tenderStatus].icon,
          class: STATUS_MAP[tenderStatus].class
        }
        this.project.contractStatus = {
          icon: STATUS_MAP[contractStatus].icon,
          class: STATUS_MAP[contractStatus].class
        }
        // 负责人具备分配工作权限
        if (this.$store.state.user.userId === this.details.manager) {
          this.showGrouperFunction = true
        }
      })
    },
    getProjectId () {
      // 通过缓存当前项目id来保证切换页面后依然能记住上一次访问的项目
      const projectId = this.$route.params.projectId
      if (projectId) {
        this.project.id = projectId
        Cookies.set('current_project_id', this.$route.params.projectId)
      } else {
        this.project.id = Cookies.get('current_project_id') ? Cookies.get('current_project_id') : -1
      }
    },
    // 判断是否有权限进行审批或者驳回操作
    loadHiddenFunction () {
      // 超级管理员和领导具备审批权限
      if (this.$store.state.user.access.indexOf(1) > -1 || this.$store.state.user.access.indexOf('super_admin') > -1) {
        this.showHiddenFunction = true
      }

      console.log(this.$store.state.user.access)
    },
    reject () {
      rejectProject({
        projectId: this.details.id
      }).then((res) => {
        if (res.flag) {
          this.$Notice.success({
            title: '通知',
            desc: '驳回成功！'
          })
          this.getDetail()
        } else {
          this.$Notice.error({
            title: '通知',
            desc: '驳回失败！'
          })
        }
      })
    },
    accept () {
      acceptProject({
        projectId: this.details.id
      }).then((res) => {
        if (res.flag) {
          this.$Notice.success({
            title: '通知',
            desc: '审批成功！'
          })
          this.getDetail()
        } else {
          this.$Notice.error({
            title: '通知',
            desc: '审批失败！'
          })
        }
      })
    },
    editProject () {
      this.showEditProject = true
    },
    backToProjectDetail () {
      this.showEditProject = false
      this.getDetail()
    },
    assignJob () {}
  }
}
</script>
<style lang="less">
    @import '../../components/common/common.less';
</style>
<style>
    .project-title{
        text-align: center;
        padding: 10px;
        font-size: 16px;
    }
    .project-title .title-sub{
        color: #80848f
    }
    .project-status{
        margin-bottom: 20px;
    }
    .project-status .status{
        font-size: 20px;
        text-align: center;
        font-weight: bold
    }
    .project-baseinfo{
        padding: 10px;
    }
    .project-baseinfo .baseinfo{
        margin-top: 10px;
        font-size: 16px;
    }
    .project-detail{
        padding: 10px;
        font-size: 16px;
    }
    .project-remark{
        padding: 10px;
        font-size: 16px;
    }
</style>
