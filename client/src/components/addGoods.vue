<template>
  <div>
       <Modal v-model="modelShow" title="新增商品" :closable="true" :mask-closable="false">
      <div class="model-main">
        


      </div>
      <div slot="footer">
        <Button @click="closePasswordModal()">取消</Button>
        <Button
          type="primary"
          @click="postResetPassword()"
        >确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
data () {
    return {
       modelShow 
    }
}
}
</script>

<style>

</style>