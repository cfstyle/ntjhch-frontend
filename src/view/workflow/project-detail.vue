<template>
    <div>
        <Row>
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
                                        <span :class="project.tenderStatus.class"><Icon :type="project.tenderStatus.icon"></Icon> {{ details.tender_status_name }}</span>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="8">
                                <Card>
                                    <p slot="title" class="card-title">合同状态</p>
                                    <div class="status">
                                        <span :class="project.contractStatus.class"><Icon :type="project.contractStatus.icon"></Icon> {{ details.contract_status_name }}</span>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="8">
                                <Card>
                                    <p slot="title" class="card-title">项目状态</p>
                                    <div class="status">
                                        <span :class="project.projectStatus.class"><Icon :type="project.projectStatus.icon"></Icon> {{ details.project_status_name }}</span>
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
        </Row>
    </div>
</template>
<script>
import {
    getProjectDetail
} from '@/api/project'
import Cookies from 'js-cookie'
import { STATUS_MAP } from '@/libs/util'
export default {
    components: {
    },
    data () {
        return {
            details: {},
            project: {
                id: 0,
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
            }
        }
    },
    mounted () {
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
            })
        },
        getProjectId () {
            // 通过缓存当前项目id来保证切换页面后依然能记住上一次访问的项目
            const projectId = this.$route.params.projectId
            if (projectId) {
                this.project.id = projectId
                Cookies.set('current_project_id', this.$route.params.projectId)
            } else {
                this.project.id = Cookies.get('current_project_id') ? Cookies.get('current_project_id') : 1
            }
        }
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
