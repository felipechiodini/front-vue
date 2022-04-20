<template>
    <div class="py-1">
        <div class="row justify-content-center text-center" v-for="(error, key) in errors" :key="key">
            <span class="mr-1"><i class="fas fa-exclamation-triangle text-danger"></i></span>
            <span>{{ error }}</span>
        </div>
    </div>
</template>

<script>
export default {

    name: "error",

    props: {
        errors: {
            require: true,
            type: Array
        }
    }

}
</script>

<style>

</style>