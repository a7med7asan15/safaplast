const BrokerSchema = require('../models/brokerSchema');
const _ = require('lodash');
const { isError } = require('lodash');


const brokerService ={

    // Show Cities 
    show: async (req, res) => {
        let page = 1;
        let limit = 1;

        if (req.query.p) {
            page = parseInt(req.query.p, 10)
        }


        let csrfToken = req.csrfToken();

        try {
            const options = {
                page,
                limit: 10,
            }
            const dataProvided = await BrokerSchema.paginate({}, options);
            return res.render('screens/brokerScreens/addBroker', {
                thisUser: req.user,
                csrfToken,
                dataProvided
            })
        } catch (err) {

            res.send(err);

        }



    },

    // Add Broker 
    add: async (req, res) => {



        const {
            name,
            mobileNo
        } = req.body;


        try {


            const newData = new BrokerSchema({


                name,

                mobileNo


            })


            await newData.save();

            return res.redirect('/dashboard/brokers');

        } catch (err) {

        }





    },

    //Edit Broker
    showOne: async (req, res) => {
        const 
            dataId
         = req.query.id;
        let csrfToken = req.csrfToken();
        
        try {
            const dataToEdit = await BrokerSchema.findById(dataId);
            console.log(dataToEdit);
            return res.render('screens/brokerScreens/editBroker', {
                thisUser: req.user,
                dataProvided: dataToEdit,
                csrfToken
            })
        } catch (err) {
            req.flash('error', 'Something Went wrong');
            console.log(err)
            return res.render('screens/brokerScreens/editBroker', {
                thisUser: req.user,
                dataProvided: {},
                csrfToken
            })
        }

    },

    //Update Broker
    update: async (req, res) => {
        const {
            name,
            mobileNo
        } = req.body
        const 
        dataId
     = req.query.id;
        try {
            const updateData = await BrokerSchema.findById(dataId)
            updateData.name = name,
                updateData.mobileNo = mobileNo,
                await updateData.save();
            req.session.passedData = false
            req.flash('success', 'Broker Updated Succesfully')
            return res.redirect(`/dashboard/brokers`)
        } catch (err) {
            req.flash('error', {
                message: 'Something Went wrong'
            })
            return res.redirect(`/dashboard/brokers`)
        }

    },

    //Delete Broker
    destroy: async (req, res) => {
        const 
            dataId
         = req.query.id;
        try {
            const deleteData = await BrokerSchema.findByIdAndDelete(dataId);

            req.flash('success', `${deleteData.name} Deleted Successfully`)
            return res.redirect(`/dashboard/brokers`)
        } catch (err) {
            req.flash('error', {
                message: 'Something Went wrong'
            })
            return res.redirect(`/dashboard/brokers`)

        }
    },

    searchShow: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await BrokerSchema.find({
                "$or": [
                    { name: { '$regex': table_search, '$options': 'i' } },
                    { mobileNo: { '$regex': table_search, '$options': 'i' } },
                ]
            });
            
            return res.render('screens/brokerScreens/addBroker', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch
            })

        } catch (err) {

            req.flash('error', 'Something Went wrong')
            return res.render('screens/brokerScreens/addBroker', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    },

}

module.exports = brokerService