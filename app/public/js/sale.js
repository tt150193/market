const store = new Vuex.Store({
    state: {
        
    },
    mutations: {
        
    },
    actions: {
        getAllCustomersOfSale(context, payload) {
            graphql(`
                query {
                    allCustomers(where: {users_some: {id: "627a62e20501d70ee97375ba"}}){
                        id
                        name
                        code
                        notes {
                            title
                            content
                        }
                    }
                }
            `, {}).then(data=>{
                console.log(data);
            })
        }
    }
});

var app = new Vue({
    store,
    data: {

    },
    methods: {

    },
    created(){
        this.$store.dispatch('getAllCustomersOfSale');
    }
});