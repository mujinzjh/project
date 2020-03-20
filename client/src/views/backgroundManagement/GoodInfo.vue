<template>
  <div>
    <div class="main-head">
      <Breadcrumb>
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>所有商品
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="input-c">
      <Button  type="primary" @click="autoUpdate">更新信息</Button>
      <div class="search">
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

    <div class="main-content">
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

 <Modal v-model="modalShow" title="基本信息" class="manage-look-detail-c-max modal-show" 
        width="480" :closable="true" :mask-closable="false">
        <div slot="close">
            <Icon class="ivu-icon-ios-close" @click="onCloseViewClick"></Icon>
        </div>
        <div style="margin:0 8px">
            <div class="base">
              <div class="one-temp">
                <span class="label">商品名称</span>
                <span class="content">{{shopDetail.name}}</span>
              </div>
            </div>
            <div class="base">
              <div class="one-temp">
                <span class="label">商品价格</span>
                <span class="content">{{shopDetail.price}}</span>
              </div>
            </div>
            <div class="base">
              <div class="one-temp">
                <span class="label">商品数量</span>
                <span class="content">{{shopDetail.num}}</span>
              </div>
            </div>
            <div class="base">
              <div class="one-temp">
                <span class="label">商品状态</span>
                <span class="content" :style="{'color':shopDetail.status?'green':'yellow'}">{{shopDetail.statusShow}}</span>
              </div>
            </div>
            <div class="base">
              <div class="one-temp">
                <span class="label">添加商品</span>
                <span class="content">{{shopDetail.time}}</span>
              </div>
            </div>
            <div class="base">
              <div class="one-temp">
                <span class="label">商品详情</span>
                <span class="content info-c" :title="shopDetail.info">{{shopDetail.info}}</span>
              </div>
            </div>
            
            <div class="base">
              <div class="one-temp">
                <span class="label">商品类别</span>
                <span class="content">{{shopDetail.cate}}</span>
              </div>
            </div>
           
          </div>
        <div slot="footer">
            <Button type="primary" @click.native="onCloseViewClick" size="large">确定</Button>
        </div>
    </Modal>







  </div>
</template>

<script>
export default {
  data() {
    return {
      shopDetail:{},
      modalShow:false,
      oldValue: "",
      fileList: [],
      multipleshow: true,
      loading: false,
      currentPage: 1,
      totalRecord: 0,
      pageSize: 10,
      columns1: [
        {
          title: "商品名称",
          key: "name"
        },
        {
          title: "商品价格",
          key: "price",
          width: 80
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
          title: "添加时间",
          key: "addtimes"
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
                      this.show(params)
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      data1:[]
    };
  },
  mounted() {
    this.loading=true;
    this.searchListData();
  },
  methods: {
    onCloseViewClick:function(){
      this.modalShow=false;
    },
    autoUpdate:function(){
      this.searchListData();
    },
    reset: function() {
      this.oldValue='';
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
    show:function(param){
      var that=this;
      that.modalShow=true;
      this.axios.get('/backmanagement/getAll',
      {
        params:{gid:param.row.gid}
      }
      ).then(res=>{
        if(res.status===200){
          if(res&&res.data){
            var data=res.data;
            that.shopDetail={
              name:data.name,
              price:data.price,
              status:data.status,
              statusShow:data.status?"已上架":"未上架",
              num:data.num,
              cate:data.catename,
              info:data.info,
              img:data.img,
              time:data.addtimes
            }
          }
        }
      }).catch(err=>{

      })
    }
  }
};
</script>

<style scoped>
.input-c {
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
}
.search {
  display: flex;
  width: 300px;
}
.reset {
  margin-left: 15px;
}
.page-c{
  float: right;
  margin-top: 20px;
}
.ivu-table-overflowX {
  overflow: hidden;
}
.ivu-table-tip {
  overflow-x: hidden;
  overflow-y: hidden;
}
.modal-show{
  padding: 0 24px;

}
.modal-show .base .label{
  margin-right: 20px;
}
.one-temp{
  font-size: 18px;
  font-family: "楷体";
  margin: 12px 0;
}
.info-c{
  display: inline-block;
  width: 300px;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
</style>