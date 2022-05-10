Vue.component('item-sidebar', {
    props: ['name', 'title', 'hash'],
    template: `
        <a :href="'#' + hash" :class="getItemColor()" @click="goPage()">{{title}}</a>
    `,
    data(){
        return {

        }
    },
    computed: {
        page(){
            return this.$store.state.hashpage;
        }
    },
    methods: {
        goPage(){
            this.$store.dispatch('toPage', this.$props.name);
        },
        getItemColor(){
            if(this.$props.name == this.page){
                return "list-group-item list-group-item-action list-group-item-info"
            } else {
                return "list-group-item list-group-item-action"
            }
        }
    },
    created(){

    }
})
if(location.hash.length == 0){
    location.hash = "#common";
}
const store = new Vuex.Store({
    state: {
        customers: [],
        leads: [],
        hashpage: location.hash.substring(1,location.hash.length)
    },
    mutations: {
        updateCustomers(state, payload){
            state.leads = payload.filter(function(customer){
                return customer.type == "LEAD";
            })
            state.customers = payload.filter(function(customer){
                return customer.type == "CUSTOMER";
            })
        },
        toPage(state, payload){
            state.hashpage = payload;
        }
    },
    actions: {
        toPage(context, payload){
            context.commit('toPage', payload);
        },
        getAllCustomersOfSale(context, payload) {
            graphql(`
                query {
                    allCustomers(where: {users_some: {id: "`+ user.id +`"}}){
                        id
                        name
                        code
                        type
                        notes {
                            title
                            content
                        }
                    }
                }
            `, {}).then(data=>{
                context.commit("updateCustomers", data.data.allCustomers);
            })
        }
    }
});

var app = new Vue({
    el: "#app",
    store,
    data: {

    },
    computed: {
        customers(){
            return this.$store.state.customers;
        },
        leads(){
            return this.$store.state.leads;
        }
    },
    methods: {

    },
    created(){
        this.$store.dispatch('getAllCustomersOfSale');
    }
});