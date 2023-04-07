<template>
  <div>page</div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      list: [1, 3, 3, 3, 3, 3.1, 31, 212, 121, 21],
      bosy: [2, 3, 1, 5, 56]
    })
    return {
      data
    }
  },
  components: {}
}
</script>

<style></style>
