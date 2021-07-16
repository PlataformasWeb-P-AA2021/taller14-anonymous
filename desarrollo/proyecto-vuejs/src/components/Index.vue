<template>
    <div class="pt-5">
        <div v-if="departamentos && departamentos.length">
            <div class="card mb-3" v-for="departamento of departamentos" v-bind:key="departamento.id">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <div class="card-body">
                            <h5 class="card-title">Nombre del propietario: {{ departamento.nombre_prop }}</h5>
                            <h5 class="card-text">Costo del departamento: {{ departamento.costo_depart }}</h5>
                            
                            <br>
                            <router-link :to="{name: 'edit_departamento', params: { id: departamento.id }}" class="btn btn-sm btn-primary">Editar</router-link>
                            <button class="btn btn-danger btn-sm ml-1" v-on:click="deleteDepartamento(departamento)">Eliminar</button>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <p class="card-text">Nro cuartos: {{ departamento.numero_cuartos }}</p>
                            <p class="card-text">Edificio al que pertenece: {{ departamento.edificio_str }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p  v-if="departamentos.length == 0"> Sin Departamentos</p>
    </div>
</template>
<script>

import axios from 'axios';

export default {
    data() {
        return {
            departamentos: []
        }
    },
    created() {
        this.all();
    },
    methods: {
        deleteDepartamento: function(e) {
            if (confirm('Eliminar departamento de ' + e.nombre_prop)) {
                axios.delete(e.url)
                    .then( response => {
                        this.all();
                    });
            }
        },
        all: function () {
            axios.get('http://127.0.0.1:8000/api/departamento/')
            
                .then( response => {
                    console.log(response.data['results']);
                    this.departamentos = response.data['results'];
                });
        }
    },
}
</script>
