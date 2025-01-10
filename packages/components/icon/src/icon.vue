<template>
    <span :class="[bem.b()]">
        icon
    </span>
</template>

<script setup lang="ts">
import { createNamespace } from '@packages/utils';
import { iconProps } from './icon';

defineOptions({
    name: "ZIcon"
})

defineProps(iconProps)

const bem = createNamespace('icon')
</script>
