<template>
    <div class="container-fluid">
        <div class="row py-2 justify-content-between bg-light">
            <div class="col-auto">
                <span class="user-name">{{ userName }}</span>
            </div>
            <div class="col-auto">
                <button class="btn-exit" @click="logoff()">Sair</button>
            </div>
        </div>
    </div>
</template>

<script>
import Cashback from "@/js/Cashback";
import Storage from '@/js/Utils/Storage';

export default {

    computed: {
        userName() {
            return Storage.get('user', 'nome')
        }
    },

    methods: {
        logoff() {
            Cashback.logoff()
            document.location.reload()
        }
    }

}
</script>

<style lang="scss" scoped>

    .user-name {
        font-weight: 300;
    }

    .btn-exit {
        border: none;
        padding: 0;
        background-color: transparent;
        text-transform: uppercase;
        font-weight: bold;
        color: #787878;
    }

</style>
