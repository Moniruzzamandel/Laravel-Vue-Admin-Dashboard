<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card" v-if="$gate.isAdmin()">
                    <div class="card-header">Developer Component</div>

                    <div class="card-body">
                        <passport-clients></passport-clients>
<passport-authorized-clients></passport-authorized-clients>
<passport-personal-access-tokens></passport-personal-access-tokens>
                    </div>
                </div>

                <!-- /.card -->
            <div v-if="!$gate.isAdmin()">
                <div class="card border-danger">
                    <div class="card-header border-danger">Page You are looking for is not found!</div>

                    <div class="card-body">
                        <not-found></not-found>
                    </div>
                </div>
            </div>


            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
