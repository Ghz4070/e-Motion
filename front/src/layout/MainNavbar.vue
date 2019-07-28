<template>
    <navbar
            position="fixed"
            type="primary"
            :transparent="transparent"
            :color-on-scroll="colorOnScroll"
            menu-classes="ml-auto"
    >
        <template slot-scope="{ toggle, isToggled }">
            <router-link v-popover:popover1 class="navbar-brand" to="/"><i
                    class="now-ui-icons shopping_delivery-fast"></i> Location Car Concept <i
                    class="now-ui-icons shopping_delivery-fast"></i></router-link>
            <el-popover
                    ref="popover1"
                    popper-class="popover"
                    placement="bottom"
                    width="200"
                    trigger="hover"
            >
                <div class="popover-body">Louer le véhicules de vos rêves.</div>
            </el-popover>
        </template>
        <template slot="navbar-menu">
            <li class="nav-item">
                <router-link class="nav-link" to="/">
                    <a><i class="now-ui-icons shopping_shop"></i>
                        <p>Accueil</p></a>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/landing">
                    <a><i class="now-ui-icons design_bullet-list-67"></i>
                        <p>Les offres</p></a>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/landing">
                    <a><i class="now-ui-icons shopping_delivery-fast"></i>
                        <p>Les véhicules</p></a>
                </router-link>
            </li>
            <li v-if="role[0]" class="nav-item">
                <router-link class="nav-link" to="/landing">
                    <a><i class="now-ui-icons ui-1_calendar-60"></i>
                        <p>Louer un véhicules</p></a>
                </router-link>
            </li>
            <li v-if="!role[0]" class="nav-item">
                <router-link class="nav-link" to="/login">
                    <a><i class="now-ui-icons users_circle-08"></i>
                        <p>Se connecter</p></a>
                </router-link>
            </li>
            <li v-if="!role[0]" class="nav-item">
                <router-link class="nav-link" to="/signup">
                    <a><i class="now-ui-icons users_circle-08"></i>
                        <p>S'inscrire</p></a>
                </router-link>
            </li>
            <drop-down v-if="role[0]" tag="li" title="Mon compte" icon="now-ui-icons users_circle-08" class="nav-item">
                <nav-link to="/profile">
                    <i class="now-ui-icons users_single-02"></i> Profil
                </nav-link>
                <nav-link to="/historic">
                    <i class="now-ui-icons shopping_basket"></i> Historique des commandes
                </nav-link>
                <nav-link to="/logout">
                  <i class="now-ui-icons ui-1_simple-remove"></i> Déconnexion
                </nav-link>
            </drop-down>
            <li v-if="role.includes('ROLE_ADMIN')" class="nav-item">
                <router-link class="nav-link" to="/signup">
                    <a><i class="now-ui-icons users_circle-08"></i>
                        <p>Espace Admin</p></a>
                </router-link>
            </li>
        </template>
    </navbar>
</template>

<script>
    import {DropDown, NavbarToggleButton, Navbar, NavLink} from '@/components';
    import {Popover} from 'element-ui';
    import jwt from 'jsonwebtoken';

    export default {
        name: 'main-navbar',
        data() {
            return {
                role: (jwt.decode(localStorage.getItem("x-access-token"))) ? (jwt.decode(localStorage.getItem("x-access-token")).role) : [],
            }
        },
        props: {
            transparent: Boolean,
            colorOnScroll: Number
        },
        components: {
            DropDown,
            Navbar,
            NavbarToggleButton,
            NavLink,
            [Popover.name]: Popover
        }
    };
</script>

<style scoped>
    .dropdown-menu .dropdown-item.active, .bootstrap-select .dropdown-menu.inner li a.active {
        background-color: #f96332;
        color: black;
    }

    .dropdown-item.active, .dropdown-item:active {
        color: black;
        text-decoration: none;
        background-color: transparent !important;
    }</style>
