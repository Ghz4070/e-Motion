<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="container">
            <div class="row">
                <el-table :data="vehicles"
                stripe
                style="width: 100%">
                    <el-table-column
                    prop="brand"
                    label="Marque"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="model"
                    label="Modèle"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    label="Numéro de série"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="color"
                    label="Couleur"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="licensePlate"
                    label="Plaque de immatriculation"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="nbKm"
                    label="Nombre de km"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="datePurchase"
                    label="Date de réservation"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="price"
                    label="Prix"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="available"
                    label="Valide"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="typeVehicle"
                    label="Titre"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="imgVehicle"
                    label="Image du véhicule"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="offers_idoffers"
                    label="L'id de l'offre"
                    width="180">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {Table, TableColumn} from 'element-ui';

    export default {
        name: 'VehiclesListFromUser',
        components:{
            [Table.name]: Table,
            [TableColumn.name]: TableColumn
        },
        data(){
            return {
                vehicles: [],
            }
        },
        mounted: function() {
            axios({
                method: 'get',
                url:'http://localhost:3000/api/v1/admin/vehicle/vehicleByProprio',
                headers: {'x-access-token': localStorage.getItem('x-access-token'), "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then((result) => {
                this.vehicles= result.data.result
                console.log(result);
            })
            .catch((err) => console.log(err.message))
        },
        
       
    }
</script>

<style scoped>

</style>