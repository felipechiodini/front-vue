<template>
    <div>
        <div class="row justify-content-center my-4">
            <div class="col-12 col-xl-4">

                <div class="row">
                    <div class="col-12">
                        <h5 class="text-center h">Vouchers</h5>
                    </div>
                </div>

                <div class="row justify-content-center" v-if="!isLoading && !isEmptyTable">
                    <div class="col-12">
                        <table class="table-voucher mb-2 w-100">
                            <tr v-for="(voucher, key) in listVoucher" :key="key">
                                <td class="text-center">{{ voucher.codigo }}</td>
                                <td class="text-center">{{ formaterCurrency(voucher.valor_desconto) }}</td>
                                <td class="text-center">{{ voucher.data_validade }}</td>
                            </tr>
                        </table>
                        <pagination :pageCount="quantidadePaginas" :value="pagination.currentPage" size="sm" align="end" @input="changePage"></pagination>
                    </div>
                </div>

                <div class="row justify-content-center" v-else-if="!isLoading && isEmptyTable">
                    <div class="col-auto">
                        <h6 class="font-weight-light">Nenhum dado encontrado.</h6>
                    </div>
                </div>
            
                <div class="row justify-content-center" v-else>
                    <div class="col-auto justify-content-center">
                        <span><i class="fas fa-circle-notch fa-spin" style="font-size: 25px;"></i></span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Cashback from '@/js/Cashback'
import Pagination from './Pagination.vue'

export default {

    components: {
        Pagination
    },

    props: {
        cpf: {
            required: true,
        }
    },

    data: () => {
        return {
            loading: false,
            voucher: [],
            pagination: {
                currentPage: 1,
            }
        }
    },

    computed: {

        isLoading() {
            return this.loading
        },

        isEmptyTable() {
            return !this.voucher.length
        },

        quantidadePaginas() {
            return Math.ceil(this.voucher.length / 5)
        },

        listVoucher() {
            let inicio = (this.pagination.currentPage * 5) -5
            let count = 0
            return this.voucher.filter((item, index) => {
                if(index >= inicio && count < 5) {
                    count++
                    return item
                }
            })
        }

    },

    mounted() {
        this.getDataVoucher()
    },

    methods: {

        changePage(page) {
            this.pagination.currentPage = page
        },

        setLoading(value) {
            this.loading = value
        },

        getDataVoucher() {
            this.setLoading(true)
            const vm = this
            Cashback.getVoucher(this.cpf).then((result) => {
                vm.voucher = result
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                vm.setLoading(false)
            })
        },

        formaterCurrency(value) {
            return Cashback.formaterCurrency(value)
        },

    }

}
</script>

<style lang="scss" scoped>

    .table-voucher {

        & {
            font-size: 14px;
        }

        & td, th {
            padding: 5px;
        }

        & tr:nth-child(odd) {
            background: repeating-linear-gradient(
                45deg,
                rgb(255, 255, 255) 0%,
                rgb(230, 230, 230) 50%,
                rgb(255, 255, 255) 100%
            );
        }

    }

    .ball-pagination {
        margin: 0px 5px 0px 0px;
        text-align: center;
        font-size: 12px;
        padding: 1px 0px 0px 0px;
        height: 20px;
        width: 20px;
        border: none;
        color: #FFFFFF;
        border-radius: 50%;
        background-color: #707070 !important;

        &.active {
            background-color: #000000 !important;
        }
    }


</style>
