import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/Index.vue';
import Landing from './pages/Landing.vue';
import Login from './pages/Login.vue';
import Vehicule from './pages/Vehicule.vue';
import LocationVehicule from './pages/LocationVehicule.vue';
import Profile from './pages/Profile.vue';
import Signup from './pages/Signup.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';
import CreateVehicle from './pages/CreateVehicule.vue';
import ListOffers from './pages/ListOffers.vue';
import UpdateProfile from './pages/UpdateProfile.vue';
import Logout from './pages/Logout.vue';
import Historic from './pages/Historic.vue';

import OffersCreatedByProprio from './pages/OffersCreatedByProprio.vue';
import VehiclesCreatedByProprio from './pages/VehiclesCreatedByProprio.vue';
import HomeAdmin from './pages/admin/Home.vue';
import VehicleAdmin from './pages/admin/Vehicle.vue';
import OfferAdmin from './pages/admin/Offer.vue';
import UserAdmin from './pages/admin/User.vue';
import LocationAdmin from './pages/admin/Location.vue';

import OfferUpdate from './pages/admin/OfferUpdate.vue';
import LocationUpdate from './pages/admin/LocationUpdate.vue';
import VehicleUpdate from './pages/admin/VehicleUpdate.vue';
import UserUpdate from './pages/admin/UserUpdate.vue';

import jwt from 'jsonwebtoken';
import dontLogin from './layout/dontLogin.vue';

Vue.use(Router);

const router = new Router({
    linkExactActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            components: {
                default: Index,
                header: MainNavbar,
                footer: MainFooter
            },
            props: {
                header: {
                    colorOnScroll: 400
                },
                footer: {
                    backgroundColor: 'black'
                }
            }
        },
        {
            path: '/landing',
            name: 'landing',
            components: { default: Landing, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: 'black' }
            }
        },
        {
            path: '/login',
            name: 'login',
            components: { default: Login, header: '', footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: '/admin/createvehicle',
            name: 'createVehicle',
            components: { default: CreateVehicle, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: 'black' }
            }
        },
        {
            path: '/listOffers',
            name: 'listOffers',
            components: { default: ListOffers, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: 'black' }
            }
        },
        {
            path: '/profile',
            name: 'profile',
            components: { default: Profile, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: 'black' }
            }
        },
        {
            path: '/signup',
            name: 'signup',
            components: { default: Signup, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: '/profile/update',
            name: 'UpdateProfile',
            components: { default: UpdateProfile, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: 'black' }
            }
        },
        {
            path: '/vehicule',
            name: 'vehicule',
            components: { default: Vehicule, header: MainNavbar },
            props: {
                header: { colorOnScroll: 400 },
            }
        },
        {
            path: '/locationVehicule/:id',
            name: 'locationVehicule',
            components: { default: LocationVehicule, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: '/logout',
            name: 'logout',
            components: { default: Logout },

        },
        {
            path: '/historic',
            name: 'historic',
            components: { default: Historic, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: 'black' }
            }
        },
        {
            path: '/Offersbyproprio',
            name: 'Offersbyproprio',
            components: { default: OffersCreatedByProprio, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: 'black' }
            }
        },
        {
            path: '/Vehiclesbyproprio',
            name: 'Vehiclesbyproprio',
            components: { default: VehiclesCreatedByProprio, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: 'black' }
            }
        },
        {
            path: '/admin',
            name: 'HomeAdmin',
            components: { default: HomeAdmin, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },

        {
            path: '/admin/vehicles',
            name: 'VehicleAdmin',
            components: { default: VehicleAdmin, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: '/admin/offers',
            name: 'OfferAdmin',
            components: { default: OfferAdmin, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: '/admin/users',
            name: 'UserAdmin',
            components: { default: UserAdmin, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: '/admin/locations',
            name: 'LocationAdmin',
            components: { default: LocationAdmin, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: '/admin/vehicle/update/:id',
            name: 'VehicleUpdate',
            components: { default: VehicleUpdate, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: '/admin/offers/update/:id',
            name: 'OfferUpdate',
            components: { default: OfferUpdate, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: '/admin/user/update/:id',
            name: 'UserUpdate',
            components: { default: UserUpdate, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: '/admin/location/update/:id',
            name: 'LocationUpdate',
            components: { default: LocationUpdate, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: '/error',
            name: 'dontLogin',
            components: { default: dontLogin, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: '*',
            redirect: '/'
          }
    ],
    scrollBehavior: to => {
        if (to.hash) {
            return { selector: to.hash };
        } else {
            return { x: 0, y: 0 };
        }
    }
})

router.beforeEach((to, from, next) => {
    var token = jwt.decode(localStorage.getItem("x-access-token"));

    if ((to.fullPath).includes('admin') || (to.fullPath==='/profile') || (to.fullPath==='/historic')) {
      if (!token) {
        next('/error');
      }
      else if(token.exp < new Date().getTime() / 1000){
        localStorage.removeItem("x-access-token");
        next('/error');
      }
    }
    next();
  });

  export default router;
