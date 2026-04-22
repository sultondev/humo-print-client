<script setup lang="ts">
const appConfig = useAppConfig() // { foo: 'bar' }

const newAppConfig = { foo: 'baz' }

updateAppConfig(newAppConfig)

console.log(appConfig) // { foo: 'baz' }
</script>

<template>
    <div class="">
        <h1 class="text-4xl font-bold">Humo print</h1>
    </div>
</template>