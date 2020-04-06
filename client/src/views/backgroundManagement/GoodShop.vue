<template>
  <div class="modelInfo">
    <div class="main-head">
      <Breadcrumb>
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>我的商品
        </BreadcrumbItem>
      </Breadcrumb>
      <div class="main">
        <Button type="primary" class="button" @click="addForm()">新增</Button>
        <div class="input-c">
          <Input
            search
            enter-button="查询"
            placeholder="请输入商品名称"
            @on-enter="searchData"
            @on-search="searchData"
            v-model="oldValue"
          />
          <Button type="primary" class="reset" @click="reset">重置</Button>
        </div>
      </div>

      <div class="tableShow">
        <Table :columns="columns1" :data="data1" :loading="loading" border></Table>
      </div>
      <div class="page-c">
        <Page
          :current="currentPage"
          show-total
          :total="totalRecord"
          show-elevator
          @on-change="searchListData"
          @on-page-size-change="searchListData"
          class="pagecon"
        />
      </div>
    </div>

    <Modal v-model="modelShow" title="新增商品" :closable="true" :mask-closable="false" width="480">
      <div class="model-main">
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
          <FormItem label="商品名称" prop="name">
            <Input v-model="formItem.name" placeholder="请输入商品名称" />
          </FormItem>
          <FormItem label="商品价格" prop="price">
            <Input v-model="formItem.price" placeholder="请输入商品价格" />
          </FormItem>
          <FormItem label="商品数量" prop="num">
            <Input v-model="formItem.num" placeholder="请输入商品数量" />
          </FormItem>
          <FormItem label="商品分类" prop="select">
            <Select v-model="formItem.select" placeholder="选择分类">
              <Option
                :value="item.value"
                v-for="(item,index) in selectList"
                :key="index"
              >{{item.lable}}</Option>
            </Select>
          </FormItem>
          <FormItem label="添加时间">
            <FormItem prop="date">
              <DatePicker type="datetime" placeholder="Select date" v-model="formItem.date"></DatePicker>
            </FormItem>

            <!-- <FormItem prop="time">
              <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
            </FormItem>-->
          </FormItem>
          <FormItem label="商品图片" prop="img" v-if="isEdit">
            <Upload
              ref:upload
              :show-upload-list="true"
              :on-success="handleSuccess"
              accept="image/*"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              type="drag"
              action="http://localhost:8806/upload"
            >
              <i-button icon="ios-cloud-upload-outline">上传文件</i-button>
            </Upload>
            <!-- <Modal title="查看图片" :visible.sync="visible">
              <img
                :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
                v-if="visible"
                style="width: 100%"
              />
            </Modal>-->
          </FormItem>

          <FormItem label="商品详情" prop="商品介绍">
            <Input
              v-model="formItem.textarea"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="Enter something..."
            />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="closeModel('formItem')">取消</Button>
        <Button type="primary" @click="postResetPassword('formItem')" v-if="isEdit">确定</Button>
        <Button type="primary" @click="updateGoods('formItem')" v-else>确定修改</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  data() {
    return {
      formDate: "",
      oldValue: "",
      uploadFile: [],
      multipleshow: true,
      formItem: {
        name: "",
        price: "",
        num: 0,
        select: "",
        time: "",
        textarea: "",
        img: "",
        date: ""
      },
      modelShow: false,
      loading: false,
      currentPage: 1,
      totalRecord: 0,
      pageSize: 10,
      columns1: [
        {
          title: "商品名称",
          key: "name",
           render: (h, params) => {
            var text = "";
            if (params.row.name) {
              text = params.row.name;
            }
            return h("div", [
              h(
                "span",
                {
                  props: {},
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    marginRight: ""
                  },
                  on: {
                    click: () => {
                     
                    }
                  }
                },
                text
              )
            ]);
          }
        },
        {
          title: "商品价格",
          key: "price",
          width: 100
        },
        {
          title: "数量",
          key: "num",
          width: 80
        },
        {
          title: "类别",
          key: "catename"
        },
        {
          title: "商品描述",
          key: "info",
          // width:150,
          render: (h, params) => {
            var text = "";
            if (params.row.info) {
              text = params.row.info;
            }
            return h("div", [
              h(
                "span",
                {
                  props: {
                    alt:text
                  },
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    marginRight: ""
                  },
                  on: {
                    click: () => {}
                  }
                },
                text
              )
            ]);
          }
        },
        {
          title: "添加时间",
          key: "addtimes",
             render: (h, params) => {
            var text = "";
            if (params.row.addtimes) {
              text = this.getFormDate(params.row.addtimes);
            }
            return h("div", [
              h(
                "span",
                {
                  props: {
                  },
                  style: {
                  },
                  on: {
                    click: () => {}
                  }
                },
                text
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          // width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {},
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  props: {},
                  on: {
                    click: () => {
                      this.remove(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [],
      selectList: [],
      ruleValidate: {
        name: [
          {
            required: true,
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true
          }
        ],
        price: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          }
        ],
        num: [
          {
            required: true
          }
        ],
        select: [
          {
            required: true
          }
        ],
        time: [
          {
            required: true
          }
        ],
        textarea: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      },
      isEdit: true,
      formObj: {
        fileArr: []
      },
      fileIsFirst: true
    };
  },
  created() {
    this.getCate();
  },
  mounted() {
    this.loading = true;
    this.searchListData();
  },
  computed: {
    uploadList() {
      return this.$refs.upload ? this.$refs.upload.fileList : [];
    }
  },

  methods: {
    handleSuccess(res, file) {
      console.log(res);
      var arr=this.uploadFile;
      if(arr.length<=5){
          arr.push(res.data.src);
      }else{
        
      }
    
    },
    dealUploadFile(array) {
      var that = this;
      console.log(array.length);
      for (var i = 0; i < array.length; i++) {
        that.formItem.img +=(that.fileIsFirst?'':',')+array[i];
        that.fileIsFirst=false;
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: "文件 " + file.name + " 太大，不能超过 2M。"
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传 5 张图片。"
        });
      }
      return check;
    },
    reset: function() {
      this.oldValue = "";
      this.searchListData();
    },
    searchData: function(value) {
      if (value) {
        this.axios
          .get("/backmanagement/getsearch", {
            params: {
              value: value,
              currentPage: this.currentPage,
              pageSize: this.pageSize
            }
          })
          .then(res => {
            if (res.status === 200) {
              if (res && res.data) {
                this.data1 = res.data;
                this.totalRecord = res.data.length;
              }
            }
          })
          .catch(function() {
            this.$Message.error("搜索数据失败");
          });
      } else {
        this.searchListData();
      }
    },
    closeModel: function(name) {
      this.$refs[name].resetFields();
      this.modelShow = false;
    },
    postResetPassword: function(name) {
      this.dealUploadFile(this.uploadFile);
      var data = this.$refs[name].model;
      console.log(data);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.axios
            .post("backmanagement/goods", data)
            .then(res => {
              console.log(res);
              if (res && res.data) {
                if (res.data.affectedRows) {
                  this.$Message.success("添加成功");
                  this.$refs[name].resetFields();
                  this.modelShow = false;
                  this.reload();
                  this.searchListData();
                }
              }
            })
            .catch(function(err) {});
          console.log(this.$refs[name]);
        } else {
          this.modelShow = false;
          this.$Message.error("表单内无数据");
          this.$refs[name].resetFields();
        }
      });
    },
    getCate: function() {
      var that = this;
      that.axios
        .get("/Cate")
        .then(res => {
          res.data.forEach(element => {
            var data = {};
            data.value = element.cid;
            data.lable = element.catename;
            this.selectList.push(data);
          });
        })
        .catch(function(err) {});
    },
    addForm: function() {
      this.modelShow = true;
    },
    searchListData: function(page) {
      this.getInfo(page);
    },
    getInfo: function(page) {
      this.queryPage(typeof page === "number" ? page : 1);
    },
    queryPage: function(page, option) {
      this.currentPage = page;
      this.getTableListData(this.currentPage, this.pageSize);
    },
    remove: function(row) {
      this.axios
        .post("/backmanagement/del", { gid: row.gid })
        .then(res => {
          if (res.status === 200) {
            if (res && res.data && res.data.affectedRows) {
              this.$Message.success("删除成功");
              this.getTableListData();
            }
          }
        })
        .catch(function(err) {});
    },
     add0(m) {
      return m < 10 ? "0" + m : m;
    },
      getFormDate(date) {
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(date);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        this.add0(m) +
        "-" +
        this.add0(d) +
        " " +
        this.add0(h) +
        ":" +
        this.add0(mm) +
        ":" +
        this.add0(s)
      );
    },
    getTableListData: function(currentPage, pageSize) {
      var that = this;
      this.axios
        .get("/backmanagement/goodslist", {
          params: {
            currentPage: currentPage,
            pageSize: pageSize
          }
        })
        .then(res => {
          if (res && res.data && res.status === 200) {
            var data = res.data;
            this.loading = false;
            this.data1 = data[0];
            this.totalRecord = data[1][0].nums;
            // console.log(res.data)
          }
        })
        .catch(function(err) {
          this.$Message.error("获取数据失败");
        });
    },
    edit: function(row) {
      this.modelShow = true;
      this.isEdit = false;
      this.formItem = {
        gid: row.gid,
        name: row.name,
        price: row.price,
        num: row.num,
        select: row.catename,
        textarea: row.info
      };
    },
    updateGoods: function(name) {
      var data = this.$refs[name].model;
      this.$refs[name].validate(valid => {
        if (true) {
          this.axios
            .post("backmanagement/updategoodsInfo", data)
            .then(res => {
              if (res && res.data) {
                if (res.data.affectedRows) {
                  this.$Message.success("修改成功");
                  this.$refs[name].resetFields();
                  this.modelShow = false;
                  this.isEdit = false;
                  this.searchListData();
                }
              }
            })
            .catch(function(err) {});
          console.log(this.$refs[name]);
        } else {
          this.modelShow = false;
          this.$Message.error("表单内无数据");
          this.$refs[name].resetFields();
        }
      });
    }
  }
};
</script>

<style>
.modelInfo .main {
  display: flex;
  justify-content: space-between;
}
.main {
  margin-top: 12px;
}
.main-head .ivu-breadcrumb {
  line-height: 32px;
  font-size: 18px;
}
.main .button {
  width: 110px;
}
.tableShow {
  margin-top: 12px;
}
.page-c {
  float: right;
  margin: 20px 0px;
}
.ivu-form-item-content {
  display: flex !important;
}
.ivu-table-overflowX {
  overflow: hidden;
}
.ivu-table-tip {
  overflow-x: hidden;
  overflow-y: hidden;
}
.input-c {
  display: flex;
}
.reset {
  margin-left: 10px;
}
</style>