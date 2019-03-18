<template>
  <div>
      <Row>
          <Col span="24">
              <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-time"></Icon>
                        待审批的项目
                    </p>
                    <Table :data="project.data" :columns="project.columns" stripe></Table>
                    <div style="margin-top: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="project.total" :current="project.current" @on-change="changePage" show-total></Page>
                        </div>
                    </div>
                </Card>
          </Col>
      </Row>
  </div>
</template>

<script>
import {
  getProject} from '@/api/project'
export default {
  name: 'home',
  components: {

  },
  data () {
    return {
      showPendingPorject: false,
      project: {
        data: [],
        columns: [
          {
            title: '项目编号',
            type: 'index',
            width: 120,
            align: 'center'
          },
          {
            title: '项目名称',
            key: 'name',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    let argu = { projectId: params.row.id }
                    this.$router.push({
                      name: 'project-detail',
                      params: argu
                    })
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
            title: '负责人',
            key: 'manager_name'
          },
          {
            title: '操作',
            key: 'name',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    let argu = { projectId: params.row.id }
                    this.$router.push({
                      name: 'project-detail',
                      params: argu
                    })
                  }
                }
              }, '查看')
            }
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
    }
  },
  mounted () {
    console.log(this.$store.state)
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
    changePage () {

    }
  }
}

</script>

<style>

</style>
