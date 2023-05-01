<template>
    <div class="modal-mask" >
        <div class="modal-wrapper" @click.self="closeCreate">
            <div class="modal-container">
                <h3>Create New Position</h3>
                <form @submit.stop.prevent="onSubmit" method="POST">
                    <input type="text" id="name" ref="name" value="<Vacant>" required>
                    <input type="text" id="title" ref="title" :value="classLevel[level]" required>
                    <input type="text" id="employeeid" ref="employeeid" value="<Blank eID>" required>
                    <hr style="width:75%">
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['level', 'lead', 'position'],

    data() {
        return {
            classLevel: {
                '1': 'Director',
                '2': 'Senior Manager',
                '3': 'Manager',
                '4': 'Senior Developer',
                '5': 'Junior Developer',
            },
        }
    },

    methods: {
        closeCreate() {
            this.$emit('close')
        },

        async onSubmit() {
            // capture the form data
            const pData = {
                name: this.$refs.name.value,
                title: this.$refs.title.value,
                employeeid: this.$refs.employeeid.value,
                position: this.position,
                level: this.level,
                lead: this.lead
            }
            // send post request to the api server
            try {
                const res = await fetch(process.env.VUE_APP_API_URL + ':' + process.env.VUE_APP_API_PORT + '/staff', {
                    method: "post",
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