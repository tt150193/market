var kiot = require("./adapter/kiot");
module.exports = (keystone) => {
    var router = require("express").Router(); 
    router.get("/", async (req, res)=>{
        if(req.query.code){

        } else {
            return res.send({
                status: "ERROR",
                message: "Cannot found code"
            });
        }
        var a = await kiot.getKiotViet("https://public.kiotapi.com/customers/code/" + req.query.code);
        if(a.id){
            var customer;
            // Neu co du lieu
            var QUERY_CUSTOMER_CODE = `
                query {
                    allCustomers (where: {code: "` + req.query.code + `"}){
                        id
                        name 
                    }
                }
            `
            var c = await keystone.executeGraphQL({
                context: keystone.createContext({skipAccessControl: true}),
                query: QUERY_CUSTOMER_CODE
            });
            if(c.data.allCustomers.length == 0){
                // Khach hang chua co tren he thong
                var CREATE_CUSTOMER = `
                    # Write your query or mutation here
                    mutation createCustomer($name: String, $code: String, $phone: String, $type: String) {
                        createCustomer(data: {name: $name, code: $code, phone: $phone, type: $type}){
                            id
                            name
                            phone 
                            code 
                            type
                        }
                    }
                `
                var c1 = await keystone.executeGraphQL({
                    context: keystone.createContext({skipAccessControl: true}),
                    query: CREATE_CUSTOMER,
                    variables: {
                        name: a.name,
                        code: a.code,
                        phone: a.contactNumber,
                        type: "CUSTOMER" // Day la mac dinh neu da co don tren KIOTVIET
                    }
                });
                customer = c1.data.createCustomer;

            } else {
                // Da tim thay 
                customer = c.data.allCustomers[0];
            }
            // Tim note KIOTVIET_UPDATE
            var QUERY_NOTE = `
                query {
                    allNotes(where: {title: "KIOTVIET_UPDATE", customers_some: {id: "` + customer.id + `"} }){
                        id
                        content
                        title
                    }
                }
            `
            var c2 = await keystone.executeGraphQL({
                context: keystone.createContext({skipAccessControl: true}),
                query: QUERY_NOTE
            });
            if(c2.data.allNotes.length == 0){
                // Tao moi
                var CREATE_NOTE_UPDATE_KIOT = `
                    # Write your query or mutation here
                    mutation ($content: String){
                        createNote(data: {
                            title: "KIOTVIET_UPDATE", 
                            content: $content, 
                            state: "NORMAL",
                            customers: {
                                connect: {id: "` + customer.id + `"}
                            }
                        }){
                            id
                            title 
                            content
                        }
                      }
                `
                var c3 = await keystone.executeGraphQL({
                    context: keystone.createContext({skipAccessControl: true}),
                    query: CREATE_NOTE_UPDATE_KIOT,
                    variables: {
                        content: JSON.stringify(a)
                    }
                });
            } else {
                var note = c2.data.allNotes[0];
                // Cap nhat moi nhat
                var UPDATE_NOTE_UPDATE_KIOT = `
                    mutation ($content: String){
                        updateNote(id: "` + note.id + `", data: {content: $content}){
                            id
                            content
                        }
                  }
                `
                var c3 = await keystone.executeGraphQL({
                    context: keystone.createContext({skipAccessControl: true}),
                    query: UPDATE_NOTE_UPDATE_KIOT,
                    variables: {
                        content: JSON.stringify(a)
                    }
                });
            }

        } else {
            return res.send({
                status: "ERROR",
                message: "Cannot found customer form KIOTVIET with CODE: " + req.query.code
            });
        }
        return res.send({
            status: "OK",
            message: "",
            kiot: a,
            crm: c,
            note: c3
        });
    })
    return router;
}