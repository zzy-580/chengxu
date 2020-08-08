<template>
    <div style="border:2px solid #f00" infinite-scroll-distance="20" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy">
        <p v-for="(v,k) of n" :key="k">{{v}}</p>
    </div>
</template>>
<script>
export default {
    data(){
        return{
            n:50,
            busy:false
        }
    },
    methods:{
        loadMore(){
            this.busy=true;
            window.setTimeout(()=>{
                 this.n+=50;
                 this.busy=false;
            },5000)
        }
    }
}
</script>