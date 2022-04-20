<template>
    <div>
        <top-bar></top-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import TopBar from '@/components/TopBar'

export default {

    components: {
        TopBar
    }

}
</script>

<style>

</style>