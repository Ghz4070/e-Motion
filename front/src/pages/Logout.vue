<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="container mt-5">
            <div class="content-center">
                <alert type="success">
                    <div class="alert-icon">
                        <i class="now-ui-icons ui-2_like"></i>
                        </div>
                        <strong>Votre déconnexion a bient été prise en compte !</strong> Vous allez être redirectionner sur la page d'accueil dans 5 secondes.
                </alert>
            </div>
        </div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
import {Alert} from '@/components';

    export default {
        name:'Logout',
        components: {
            Alert
        },
        mounted() {
            if(localStorage.getItem('x-access-token')){
                setTimeout(()=> {
                    localStorage.removeItem('x-access-token')
                    this.$router.push('/');
                }, 5000)
            }else{
                alert('Vous netes pas connecter')
                this.$router.push('/');
            }
        }
        }
</script>

<style scoped>

</style>