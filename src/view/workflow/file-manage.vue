<template>
    <div>
        <div style="margin-bottom: 10px; width: 300px">
            <Select  v-model="upload.params.project" placeholder="请选择项目" clearable filterable>
                <Option v-for="(project, idx) in projects" :value="project.value" :key="idx">{{ project.label }}</Option>
            </Select>
        </div>
        <div style="margin-bottom: 10px; width: 300px">
            <Select  v-model="upload.params.category" placeholder="请选择上传文件类型" clearable filterable>
                <Option v-for="(category, idx) in upload.categories" :value="category.value" :key="idx">{{ category.name }}</Option>
            </Select>
        </div>
        <Upload
            multiple
            ref="upload"
            type="drag"
            :action="upload.url"
            :headers="upload.headers"
            :on-success="handleSuccess"
            :on-error="handleError"
            :format="['jpg','jpeg','pdf','png']"
            :max-size="2048000"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :data="upload.params"
            >
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p style="font-size: 14px">点击或拖拽进行文件的上传</p>
            </div>
        </Upload>
    </div>
</template>

<script>
import baseURL from '_conf/url'
import { getToken } from '@/libs/util'
import {
  getProject} from '@/api/project'

export default {
  name: 'file-manage',
  data () {
    return {
      upload: {
        loading: false,
        url: baseURL + '/api/project/projectattachments/upload/',
        headers: {
          'x-access-token': getToken(),
          'Authorization': getToken(),
          'X-URL-PATH': '/'
        },
        params: {
          project: '',
          category: 1
        },
        categories: [{
          'name': '投标文件',
          'value': 1
        }, {
          'name': '合同文件',
          'value': 2
        }, {
          'name': '其他文件',
          'value': 3
        }
        ]
      },
      uploadList: [],
      projects: []
    }
  },
  mounted: function () {
    this.getProjects()
    // this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    getProjects () {
      getProject({
        limit: 1000
      }).then((res) => {
        this.projects = res.results.map((row) => {
          return {
            value: row.id,
            label: row.name
          }
        })
      })
    },
    handleSuccess: function (res, file) {
      if (res.flag) {
        this.$Notice.success({
          title: '上传成功！'
        })
      } else {

      }
    },
    handleBeforeUpload: function (file) {
      // this.uploadList.push(file)
      if (!this.upload.params.project) {
        this.$Notice.warning({
          title: '请先选择项目！'
        })
        return false
      }
      // const check = this.uploadList.length < 5;
      // if (!check) {
      //     this.$Notice.warning({
      //         title: 'Up to five pictures can be uploaded.'
      //     });
      // }
      // return false;
    },
    handleFormatError: function (file) {
      this.$Notice.warning({
        title: '不支持的文件格式！'
      })
    },
    handleMaxSize: function () {
      this.$Notice.warning({
        title: '文件太大了！不要超过1G！'
      })
    },
    handleError: function (err, file) {
      this.$Notice.warning({
        title: '上传失败！',
        desc: err.toString()
      })
    },
    handleRemove (idx) {
      this.uploadList.splice(idx, 1)
      // this.$refs.upload.fileList.splice(idx, 1);
    }
  },
  computed: {
  }

}
</script>

<style>
    .file-list li{
        font-size: 14px;
    }
</style>
