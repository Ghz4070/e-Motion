<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div class="content">
            <div class="container">
                <div class="col-md-5 ml-auto mr-auto">
                    <card type="login" plain>
                        <div slot="header" class="logo-container">
                            <img v-lazy="'img/now-logo.png'" alt=""/>
                        </div>

                        <fg-input
                                class="no-border input-lg"
                                addon-left-icon="now-ui-icons users_circle-08"
                                placeholder="Identifiant"
                                v-model="username"
                                required
                        >
                        </fg-input>

                        <fg-input
                                class="no-border input-lg"
                                addon-left-icon="now-ui-icons text_caps-small"
                                placeholder="Mot de passe"
                                type="password"
                                v-model="password"
                                required
                        >
                        </fg-input>

                        <template>
                            <div class="card-footer text-center">
                                <n-button type="neutral" round size="lg" v-on:click="connect">Connectez-vous
                                </n-button>
                            </div>
                            <div class="pull-left">
                                <h6>
                                    <a href="#pablo" class="link footer-link">Create Account</a>
                                </h6>
                            </div>
                            <div class="pull-right">
                                <h6>
                                    <a href="#pablo" class="link footer-link">Need Help?</a>
                                </h6>
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>