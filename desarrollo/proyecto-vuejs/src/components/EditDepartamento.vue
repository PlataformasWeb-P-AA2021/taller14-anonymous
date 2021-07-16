<template>
    <div class="pt-5">
        <form @submit.prevent="create" method="post">

            <div class="form-group">
                <label for="nombre_prop">Nombre del propietario</label>
                <input
                    type="text"
                    class="form-control"
                    id="departamento"
                    v-model="departamento.nombre_prop"
                    v-validate="'required'"
                    name="departamento"
                    placeholder="Ingrese el nombre del propietario"
                    :class="{'is-invalid': errors.has('departamento.nombre_prop') && submitted}">
                <div class="invalid-feedback">
                    Please provide a valid name.
                </div>
            </div>

            <div class="form-group">
                <label for="costo_depart">Costo del departamento</label>
                <input
                    type="text"
                    class="form-control"
                    id="departamento"
                    v-model="departamento.costo_depart"
                    v-validate="'required'"
                    name="departamento"
                    placeholder="Ingrese el costo del departamento"
                    :class="{'is-invalid': errors.has('departamento.costo_depart') && submitted}">
                <div class="invalid-feedback">
                    Please provide a valid name.
                </div>
            </div>

            <div class="form-group">
                <label for="numero_cuartos">Nro de cuartos</label>
                <input
                    type="text"
                    class="form-control"
                    id="departamento"
                    v-model="departamento.numero_cuartos"
                    v-validate="'required'"
                    name="departamento"
                    placeholder="Ingrese el número de cuartos"
                    :class="{'is-invalid': errors.has('departamento.numero_cuartos') && submitted}">
                <div class="invalid-feedback">
                    Please provide a valid name.
                </div>
            </div>

            <div class="form-group">
              <br>
                <label for="edificio">Edificio</label>
                <select v-model="departamento.edificio">
                            <option v-for="e in edificioList" :key="e.url" :value="e.url">{{ e.nombre }}</option>
                        </select>
            </div>

            <button type="submit" class="btn btn-primary">Crear</button>
        </form>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            departamento: {
                nombre_prop: '',
                costo_depart: '',
                numero_cuartos: '',
                edificio: '',
            },
            edificioList: [],
            submitted: false
        }
    },
    mounted() {
        this.getEdificiosList(),
        axios.get('http://127.0.0.1:8000/api/departamento/' + this.$route.params.id + '/')
            .then( response => {
                console.log(response.data)
                this.departamento = response.data
        });
    },
    methods: {
      getEdificiosList() {
            axios
            .get('http://127.0.0.1:8000/api/edificio/')
            .then(response => {
                this.edificioList = response.data
            })
            .catch(error => {
                console.log(error)
            })

        },
        create: function (e) {
            this.$validator.validate().then(result => {
                this.submitted = true;
                if (!result) {
                    return;
                }
                axios.put(`http://127.0.0.1:8000/api/departamento/${this.departamento.id}/`,
                        this.departamento
                    )
                    .then(response => {
                        this.$router.push('/');
                    })
            });
        }
    },
}
</script>
