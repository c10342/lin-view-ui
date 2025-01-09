<template>
    <div>
        <RouterLink :to="item.path" v-for="item in list" :key="item.name" >
            {{ item.name }}
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const list = computed(() => {
    const routes = router.getRoutes()
    return routes.filter(item => item.name !== 'index')
})
</script>

<style lang="scss" scoped>
// todo</style>