<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="container">
            <div class="row">
            <el-table
                :data="offers"
                stripe
                style="width: 100%">
                <el-table-column
                prop="title"
                label="Titre"
                width="180">
                </el-table-column>
                <el-table-column
                prop="price"
                label="Prix"
                width="180">
                </el-table-column>
                <el-table-column
                prop="description"
                label="Description"
                width="180">
                </el-table-column>
                <el-table-column
                prop="penality"
                label="Pénalité"
                width="180">
                </el-table-column>
                <el-table-column
                prop="nbkm"
                label="Nombre de km"
                width="180">
                </el-table-column>
                <el-table-column
                prop="pointFidelityOffers"
                label="Point de fidélité de l'offre"
                width="180">
                </el-table-column>
                <el-table-column
                prop="hiddenOffers"
                label="Offre caché"
                width="180">
                </el-table-column>
            </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {Table, TableColumn} from 'element-ui'

    export default {
        name: 'OffersListFromUser',
        components:{
            [Table.name]: Table,
            [TableColumn.name]: TableColumn
        },
        data(){
            return {
                offers: [],
            }
        },
        mounted: function() {
            axios({
                method: 'get',
                url:'http://localhost:3000/api/v1/admin/offer/offersByProprio',
                headers: {'x-access-token': localStorage.getItem('x-access-token'), "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then((result) => {
                this.offers= result.data.result
                console.log(result);
            })
            .catch((err) => console.log(err.message))
        },
        
       
    }
</script>

<style lang="scss" scoped>

</style>