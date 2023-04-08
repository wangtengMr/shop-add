<template>
  <div>
    {{ store.state.name }}
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const data = reactive({});
    return {};
  },
  components: {}
};
</script>

<style></style>
