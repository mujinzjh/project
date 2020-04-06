<template>
  <div id="main" style="width: 600px;height: 300px;"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      charts: "",
      data: [],
      opinion: [
        "美妆护肤",
        "服饰潮牌",
        "儿童母婴",
        "超市商品",
        "土货鲜食",
        "爆款推荐",
        "新品上架",
        "促销低价"
      ],
      opinionData: [
        { value: 0, name: "美妆护肤" },
        { value: 0, name: "服饰潮牌" },
        { value: 0, name: "儿童母婴" },
        { value: 0, name: "超市商品" },
        { value: 0, name: "土货鲜食" },
        { value: 0, name: "爆款推荐" },
        { value: 0, name: "新品上架" },
        { value: 0, name: "促销低价" }
      ]
    };
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
          text: "商品类别数量展示",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: this.opinion
        },
        series: [
          {
            name: "商品类别数量",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "blod"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.opinionData
          }
        ]
      });
    },
    getCate() {
      var array = this.opinionData;
      this.axios
        .get("/Cate/getAllCate")
        .then(res => {
          if (res.status === 200) {
            if (res && res.data) {
              var arr = res.data;
              for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                  if (i === j) {
                    array[i].value = arr[j][0].value;
                  }
                }
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  //调用
  // created () {

  // },
  // beforeMount () {
  //    this.getCate();
  // },
  watch: {
    opinionData: {
      handler(newValue, oldValue) {
        this.drawPie("main");
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.drawPie("main");
      this.getCate();
    });
  }
};
</script>

<style>
#main canvas {
  left: 50% !important;
}
</style>