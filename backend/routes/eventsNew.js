require("dotenv").config();
const router = require("express").Router();
const event = require('../scripts/postgres/events');

router.post("/add", async (req, res) => {
    try {
        const {
            name,
            description,
            start_date,
            end_date,
            city,
            state
        } = req.body;

        if (Object.entries(req.body).filter(([k, v], i) => !v).length > 0)
            return res.status(400).json({
                msg: "Please fill out all required fields",
            });

        const newEvent = await event.create({
            name,
            description,
            start_date,
            end_date,
            city,
            state
        });

        res.json(newEvent);

    } catch (err) {
        console.log(err);


    }
});

router.post("/get", async (req, res) => {
    try {
        const eventList = await event.get_names({});
        res.json(eventList.rows);
    } catch (err) {
        console.log(err.message);
    }
});
router.post("/", async (req, res) => {
    try {
        const {name} = req.body;
        const eventList = await event.get({name});
        res.json(eventList.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// router.get("/", async (req, res) => {
//     try {
//         const {
//             name
//         } = req.body;
//         const returnedEvent = await event.get({
//             name
//         });
//         res.json(returnedEvent);
//     } catch (err) {
//         console.log(err);
//     }
// })

module.exports = router;