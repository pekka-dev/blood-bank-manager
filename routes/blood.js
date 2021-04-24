const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');

router.get('/', (req, res) => {
    let { zip, blood, emg } = req.query;
    Hospital.find({ zip: zip })
        .then(hospitals => {
            let requirement = hospitals.filter((h) => {
                let isEmg = emg ? h.availableServices.includes('emergency') : true;
                let isBlood = h.availableServices.includes('blood-bank') ? h.bloodBank.includes(blood) : false;
                return isEmg && isBlood;
            });
            res.send(requirement);
        })
        .catch(e => {
            res.status(500).send(e);
        });
});

module.exports = router;