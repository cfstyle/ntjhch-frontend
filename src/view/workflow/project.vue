<template>
  <div>
    <Row class="project-list">
        <Col :md="12" :style="{marginBottom: '10px'}">
            <Button v-if="showProjectList" type="primary" size="large" @click="addNewProject">新建项目</Button>
            <Button v-if="showNewProject" type="ghost" size="large" @click="back">
                <Icon type="chevron-left"></Icon>&nbsp;返回
            </Button>
        </Col>
    </Row>
    <Row :gutter="16">
        <div v-if="showProjectList">
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-time"></Icon>
                        最近的项目
                    </p>
                    <Table :data="project.data" :columns="project.columns" stripe></Table>
                    <div style="margin-top: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="project.total" :current="project.current" @on-change="changePage" show-total></Page>
                        </div>
                    </div>
                </Card>
            </Col>
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-apps"></Icon>
                        所有项目
                    </p>
                    <Table :data="project.data" :columns="project.columns" stripe></Table>
                    <div style="margin-top: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="project.total" :current="project.current" @on-change="changePage" show-total></Page>
                        </div>
                    </div>
                </Card>
            </Col>
        </div>
    </Row>
    <Row v-if="showNewProject" class="new-project">
        <new-project></new-project>
    </Row>
  </div>
</template>

<script>
import {
    getProject} from '@/api/project'
import newProject from './new-project.vue'
export default {
    components: {
        newProject
    },
    data () {
        return {
            showProjectList: true,
            showNewProject: false,
            project: {
                data: [],
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '项目',
                        key: 'name',
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        let argu = { projectId: params.row.id };
                                        this.$router.push({
                                            name: 'project-detail',
                                            params: argu
                                        });
                                    }
                                }
                            }, params.row.name)
                        }
                    },
                    {
                        title: '立项时间',
                        key: 'create_time'
                    },
                    {
                        title: '项目状态',
                        key: 'project_status_name'
                    },
                    {
                        title: '投标状态',
                        key: 'tender_status_name'
                    },
                    {
                        title: '合同状态',
                        key: 'contract_status_name'
                    },
                    {
                        title: '负责人',
                        key: 'manager_name'
                    }
                ],
                total: 0,
                current: 1,
                loading: true,
                params: {
                    limit: 10,
                    offset: 0
                }
            }
        };
    },
    mounted () {
        this.getProjects()
    },
    methods: {
        getProjects () {
            getProject(this.project.params).then((res) => {
                this.project.data = res.results
                this.project.total = res.count
                this.project.loading = false
            })
        },
        changePage (page) {
            this.project.current = page
            this.params.offset = page + 1
            this.project.loading = true
        },
        addNewProject: function () {
            this.showNewProject = true
            this.showProjectList = false
        },
        back: function () {
            this.showProjectList = true
            this.showNewProject = false
        }
    }
}
</script>

<style>

</style>
