<template>
  <div class="list">
    <van-nav-bar title="地址列表">
      <van-icon name="arrow-left" slot="left" @click="goBack" />
    </van-nav-bar>

    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        // {
        //   id: "1",
        //   name: "张三",
        //   tel: "13000000000",
        //   address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        // },
        // {
        //   id: "2",
        //   name: "李四",
        //   tel: "1310000000",
        //   address: "浙江省杭州市拱墅区莫干山路 50 号"
        // }
      ],
      disabledList: [
        // {
        //   id: "3",
        //   name: "王五",
        //   tel: "1320000000",
        //   address: "浙江省杭州市滨江区江南大道 15 号"
        // }
      ]
    };
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onAdd() {
      this.$router.push({ path: "/Address" });
    },

    onEdit(item, index) {
      this.$toast("暂不能编辑");
    },
    onSelect(item, index) {
      console.log(item, index);
      this.$router.push({ path: "/order", query: { aid: item.id } });
    }
  },
  created() {
    this.axios
      .get("./Address/getAll")
      .then(response => {
        console.log(response);
        let data = JSON.parse(
          JSON.stringify(response.data).replace(/aid/g, "id")
        );
        // this.list = response.data;
        this.list = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>