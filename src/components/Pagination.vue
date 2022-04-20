<template>
    <ul class="pagination" :class="align && `justify-content-${align}`">
        <li :class="{active: value === item}" :key="item"
            v-for="item in range(minPage, maxPage)">
            <a class="page-link-cashback pointer" @click="changePage(item)"></a>
        </li>
    </ul>
</template>

<script>
export default {

    name: "pagination",

    props: {
        pageCount: {
            type: Number,
            default: 0,
            description: "Pagination page count. This should be specified in combination with perPage"
        },

        perPage: {
            type: Number,
            default: 10,
            description: "Pagination per page. Should be specified with total or pageCount"
        },

        total: {
            type: Number,
            default: 0,
            description: "Can be specified instead of pageCount. The page count in this case will be total/perPage"
        },

        value: {
            type: Number,
            default: 1,
            description: "Pagination value"
        },

        size: {
            type: String,
            default: "",
            description: "Pagination size"
        },

        align: {
            type: String,
            default: "",
            description: "Pagination alignment (e.g center|start|end)"
        }
    },

    computed: {
        totalPages() {
            if (this.pageCount > 0) return this.pageCount;
            if (this.total > 0) {
                return Math.ceil(this.total / this.perPage);
            }
            return 1;
        },

        pagesToDisplay() {
            if (this.totalPages > 0 && this.totalPages < this.defaultPagesToDisplay) {
                return this.totalPages;
            }
            return this.defaultPagesToDisplay;
        },

        minPage() {
            if (this.value >= this.pagesToDisplay) {
                const pagesToAdd = Math.floor(this.pagesToDisplay / 2);
                const newMaxPage = pagesToAdd + this.value;
                if (newMaxPage > this.totalPages) {
                    return this.totalPages - this.pagesToDisplay + 1;
                }
                return this.value - pagesToAdd;
            } else {
                return 1;
            }
        },

        maxPage() {
            if (this.value >= this.pagesToDisplay) {
                const pagesToAdd = Math.floor(this.pagesToDisplay / 2);
                const newMaxPage = pagesToAdd + this.value;
                if (newMaxPage < this.totalPages) {
                    return newMaxPage;
                } else {
                    return this.totalPages;
                }
            } else {
                return this.pagesToDisplay;
            }
        }

    },

    data() {
        return {
            defaultPagesToDisplay: 5
        };
    },

    methods: {
        range(min, max) {
            let arr = [];
            for (let i = min; i <= max; i++) {
                arr.push(i);
            }
            return arr;
        },
        changePage(item) {
            this.$emit("input", item);
        },
        nextPage() {
            if (this.value < this.totalPages) {
                this.$emit("input", this.value + 1);
            }
        },
        prevPage() {
            if (this.value > 1) {
                this.$emit("input", this.value - 1);
            }
        }
    },

    watch: {
        perPage() {
            this.$emit("input", 1);
        },

        total() {
            this.$emit("input", 1);
        }
    }
}
</script>


<style lang="scss">

    .pagination {

        & .active {
            & a {
                background-color: #303030 !important;
                color: #FFFFFF !important;
            }
        }
    
        & .page-link-cashback {
            border: none;
            border-radius: 50%;
            position: relative;
            display: block;
            margin: 0px 5px 0px 0px;
            line-height: 1.25;
            width: 15px;
            height: 15px;
            color: #000000;
            font-weight: 300;
            background-color: #e8e8e8;

            &:hover {
                color: black;
                text-decoration: none;
            }
        }
    }


</style>