<template>
    <div v-if="showCreate">
        <CreateElement @close="toggleCreate" :level="employee.level+1" :lead="employee._id" :position="getLevelCount+1" />
    </div>
    <div v-if="showEdit">
        <UpdateElement @close="toggleEdit" :employee="employee" :numChildren="children.length" />
    </div>
    <li :class="getClassLevel">
        <div class="content">
            <div class="proflle">
                <img src="../assets/blankprofile.jpeg" width="75" height="75" alt="Employee Profile">
            </div>
            <div class="info">
                <h2 @click="toggleEdit" style="cursor: pointer">{{ employee.name }}</h2>
                <p v-if="employee.level > 1 && employee.name != '<Vacant>'">Emp ID: {{ employee.employeeid }}</p>
                <h3 v-if="employee.level == 1" @click="toggleCreate" style="cursor: pointer">{{ employee.title }}</h3>
                <h3 v-else @click="toggleCreate" style="cursor: pointer">{{ employee.title }} - {{ employee.position }}</h3>
            </div>
        </div>
        <ul v-if="children.length">
            <div v-for="child in children" :key="child._id">
                <ChartElement :employee="child" :children="findChildren(child._id)" :staff="staff" />
            </div>
        </ul>
    </li>
</template>

<script>
import CreateElement from '@/components/CreateElement.vue'
import UpdateElement from '@/components/UpdateElement.vue'

export default {
    components: { CreateElement, UpdateElement },
    props: ['employee', 'children', 'staff'],

    data() {
        return {
            showCreate: false,
            showEdit: false
        }
    },

    computed: {
        getClassLevel() {
            if (this.employee.level == 1) {
                return 'root'
            } else if (this.children.length < 1) {
                return 'leaf'
            } else {
                return 'node'
            }
        },
        // generate position number
        getLevelCount() {
            return this.staff.filter(x => x.level == this.employee.level + 1).length
        }
    },

    methods: {
        findChildren(id) {
            return this.staff.filter(x => x.lead == id)
        },

        //modal component handling
        handleClick() {
            this.$refs.name.classList.add('active')
            this.$refs.name.focus()
        },
        toggleCreate() {
            this.showCreate = !this.showCreate
        },
        toggleEdit() {
            this.showEdit = !this.showEdit
        }
    }
}
</script>

<style>

</style>