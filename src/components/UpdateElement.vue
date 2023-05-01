<template>
    <div class="modal-mask" >
        <div class="modal-wrapper" @click.self="closeUpdate">
            <div class="modal-container">
                <h3>Update Current Position</h3>
                <p @click="toggleVacant" style="cursor: pointer">[Mark Position Vacant]</p>
                <form @submit.stop.prevent="onSubmit" method="PUT">
                    <input type="text" id="name" ref="name" :value="employee.name" required>
                    <input type="text" id="title" ref="title" :value="employee.title" required>
                    <input type="text" id="employeeid" ref="employeeid" :value="employee.employeeid" required>
                    <hr style="width:75%">
                    <button type="submit">Update</button>
                    <button v-if="employee.level > 1 && numChildren == 0" @click="onDelete">Delete</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['employee', 'numChildren'],

    methods: {
        closeUpdate() {
            this.$emit('close')
        },

        toggleVacant() {
            // toggle Vacancy data
            if (this.$refs.name.value != '<Vacant>')
            {
                this.$refs.name.value = '<Vacant>'
                this.$refs.employeeid.value = '<Blank eID>'
            } else {
                this.$refs.name.value = this.employee.name
                this.$refs.employeeid.value = this.employee.employeeid
            }
        },

        async onSubmit() {
            // capture the form data
            const pData = {
                name: this.$refs.name.value,
                title: this.$refs.title.value,
                employeeid: this.$refs.employeeid.value,
                position: this.employee.level,
                level: this.employee.level,
                lead: this.employee.lead
            }
            // send post request to the api server
            try {
                const res = await fetch(process.env.VUE_APP_API_URL + ':' + process.env.VUE_APP_API_PORT + '/staff/' + this.employee._id, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": "token-value"
                    },
                    body: JSON.stringify(pData)
                })
                if (!res.ok)
                { 
                    throw Error('Posting new Staff data failed')
                }
            }
            catch (e) {
                console.log(e.message)
            }
            window.location.reload()
        },

        async onDelete() {
            // send delete request to the api server
            try {
                const res = await fetch(process.env.VUE_APP_API_URL + ':' + process.env.VUE_APP_API_PORT + '/staff/' + this.employee._id, {
                    method: "delete"
                })
                if (!res.ok)
                { 
                    throw Error('Delete Staff data failed')
                }
            }
            catch (e) {
                console.log(e.message)
            }
            window.location.reload()
        }
    }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
  align-items: center;
}

.modal-default-button {
  float: right;
}
</style>