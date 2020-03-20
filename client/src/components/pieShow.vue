<template>
  <div>
      <div class="main">
            <schart canvasId="canvas"
            :options="options"
        />

      </div>
  </div>
</template>

<script>
import Schart from 'vue-schart';
export default {
    data() {
        return {
                options: {
                type: "bar",
                    title: {
                        text: "所有商品展示图"
                    },
                    bgColor: "#fbfbfb",
                    labels: ["周一", "周二", "周三", "周四", "周五"],
                    datasets: [
                        {
                            label: "家电",
                            fillColor: "rgba(241, 49, 74, 0.5)",
                            data: [234, 278, 270, 190, 230]
                        },
                        {
                            label: "百货",
                            data: [164, 178, 190, 135, 160]
                        },
                        {
                            label: "食品",
                            data: [144, 198, 150, 235, 120]
                        }
                    ]
            }
        }
    },
    components: {
       Schart 
    }
}
</script>

<style>

</style>