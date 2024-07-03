<template>
    
        <router-view name="view" />
        <router-view name="action" />
        <spinnerPlugin/>
    
</template>
<script>
import spinnerPlugin from "../../../plugins/loader/views/Spinner.vue"
export default{
    name: 'homeComponent',
    components:{spinnerPlugin}
}
</script>
<style scoped>

</style>