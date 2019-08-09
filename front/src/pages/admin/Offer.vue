<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div class="container">
        <h3 class="title">Admin</h3>
        <h1 class="title">Gérer les offres</h1>
        <ul></ul>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h3 class="title">Liste des offres</h3>
        <hr />
        <div>
          <div>
            <fg-input
              type="text"
              id="myInput"
              v-on:keyup="myFunction"
              placeholder="Rechercher par nom de l'offre.."
            ></fg-input>
          </div>
          <table id="customers">
            <tr>
              <th>NUM. Offre</th>
              <th>Titre</th>
              <th>Prix</th>
              <th>Description</th>
              <th>Pénalité</th>
              <th>Nombre km.</th>
              <th>Point Fidelité</th>
              <th>Visible</th>
              <th>Créée par</th>
              <th>Action</th>
            </tr>
            <tr v-for="offer in offers" :key="offer.idoffers">
              <td>{{ offer.idoffers }}</td>
              <td>{{ offer.title }}</td>
              <td>{{ offer.price }}</td>
              <td>{{ offer.description }}</td>
              <td>{{ offer.penality }}</td>
              <td>{{ offer.nbKm }}</td>
              <td>{{ offer.pointFidelityOffers }}</td>
              <td>{{ offer.hiddenOffers }}</td>
              <td>{{ offer.createdBy }}</td>
              <td>
                <drop-down class="btn-group">
                  <template slot="title">
                    <button type="button" class="btn btn-default">
                      <i class="now-ui-icons ui-1_settings-gear-63"></i>
                    </button>
                  </template>
                  <router-link class="stl" :to="{path: '/admin/offers/update/'+(offer.idoffers) }">
                    <a class="dropdown-item" href="#">
                      <b>
                        <i class="now-ui-icons ui-2_settings-90"></i> Modifier
                      </b>
                    </a>
                  </router-link>
                  <a class="dropdown-item" href="#" v-on:click="hiddeOffer(offer.idoffers)">
                    <b>
                      <i class="now-ui-icons design-2_ruler-pencil"></i> Changer visibilité
                    </b>
                  </a>
                  <a class="dropdown-item" v-on:click="removeOffer(offer.idoffers)">
                    <b>
                      <i class="now-ui-icons ui-1_simple-remove"></i> Supprimer
                    </b>
                  </a>
                </drop-down>
              </td>
            </tr>
          </table>
        </div>
        <div class="text-center"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Tabs,
  TabPane,
  Button,
  Modal,
  FormGroupInput as FgInput,
  DropDown
} from "@/components";
import axios from "axios";
import jwt from "jsonwebtoken";
import dontLogin from "@/layout/dontLogin.vue";

export default {
  name: "OfferAdmin",
  props: {},
  components: {
    dontLogin,
    Tabs,
    TabPane,
    [Button.name]: Button,
    Modal,
    FgInput,
    DropDown
  },
  data() {
    return {
      offers: "",
      idOffer: "",
      token: jwt.decode(localStorage.getItem("x-access-token")),
      checkToken: false
    };
  },
  mounted() {
    this.requestInfo();
  },
  methods: {
    requestInfo: function() {
      axios({
        url: "http://localhost:3000/api/v1/offer",
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": localStorage.getItem("x-access-token")
        }
      }).then(response => (this.offers = response.data.result));
    },
    myFunction: function() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("customers");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },
    removeOffer: function(idOffer) {
      axios({
        url: "http://localhost:3000/api/v1/admin/offer/" + idOffer,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token")
        }
      }).then(response => console.log(response));
    },
    hiddeOffer: function(theid) {
      axios({
        url: "http://localhost:3000/api/v1/admin/offer/cancel",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token")
        },
        data: {
          id: theid
        }
      }).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style>
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: slategray;
  color: white;
}

.stl {
  color: black;
}
</style>