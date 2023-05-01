<template>
    <ul class="orgchart">
        <ChartElement :employee="findDirector()" :children="findChildren()" :staff="staff" />
    </ul>
</template>

<script>
import ChartElement from '@/components/ChartElement.vue'

export default {
    components: { ChartElement },
    props: ['staff'],

    methods: {
        findDirector() {
            return this.staff.filter(x => x.level == 1)[0]
        },
        findChildren() {
            return this.staff.filter(x => x.lead == this.findDirector()._id)
        }
    }
}
</script>

<style>
.orgchart {
    display: inline-block;
}

.orgchart, .orgchart ul {
    padding: 0;
    margin: 0;
}

.orgchart ul {
    display: flex;
}

.orgchart li {
    display: flex;
    flex-direction: column;
    position: relative;
}

.orgchart .content {
    align-self: center;
    position: relative;
    margin: 30px 20px;
    border-radius: 25px;
    padding-left: 2%;
    padding-right: 2%;
    min-width: 200px;
    background-color: #00ABE4;
    border-bottom: 5px solid black;
}

</style>