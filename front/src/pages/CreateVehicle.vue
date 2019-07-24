<template>
    <div class="section">
        <div class="container">
            <div class="row">
                <card class="card-signup" header-classes="text-center" color="orange">
                    <template slot="header">
                        <fg-input
                                class="no-border"
                                placeholder="Marque"
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="brand"
                        >
                        </fg-input>
                    </template>
                </card>
            </div>
        </div>
    </div>
</template>
<script>
    import {Card, FormGroupInput, Button} from '@/components';

    export default {
        components: {
            Card,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput
        }
    }
</script>
<style>
</style>
