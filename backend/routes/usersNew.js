require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require('../scripts/postgres/users');
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
uuidv4 = require('uuid/v4');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/");
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, uuidv4() + "-" + fileName);
    },
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});



router.post("/register", upload.single("img_url"), validate, async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    try {
        const {

            email,
            password,
            passwordCheck,
            username,
            bio
        } = req.body;



        if (!email || !password || !username || !bio)
            return res.status(400).json({
                msg: "Please fill out all required fields",
            });

        // if (!tos)
        //     return res.status(400).json({
        //         msg: "Cannot register unless Terms of Service is accepted",
        //     });

        if (password.length < 6)
            return res.status(400).json({
                msg: "Password needs to be atleast 6 characters long",
            });
        if (password !== passwordCheck)
            return res.status(400).json({
                msg: "Password and verification do not match",
            });

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await user.create({
            email,
            password: bcryptPassword,
            username,
            bio,
            img_url: url + "/public/" + req.file.filename
        })

        res.json(newUser);
    } catch (err) {
        console.log(err.message)
    }
});

router.post("/login", async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        if (!username || !password)
            return res.status(400).json({
                msg: "Please fill out all required fields",
            });
        const login_user = await user.find(username);

        if (login_user.rows.length === 0) return res.status(401).send("Password or Email is incorrect")

        const validPassword = await bcrypt.compare(password, login_user.rows[0].password);

        if (!validPassword) {
            return res.status(401).send("Password or Email is incorrect");
        }

        const token = jwt.sign({
                user: login_user.rows[0].user_id,
            },
            process.env.jwtSecret
        );

        res.json({
            token,
            user: login_user.rows[0]
        });



    } catch (err) {
        console.log(err.message);
    }
});

router.post("/requests-no-room", async (req, res) => {
    try {
        const {
            eventname,
            eventcity,
            eventstate,
            pref_check_in_date,
            pref_check_out_date,
            max_roommates,
            budget,
            noise,
            schedule,
            other_details,
            user_id
        } = req.body;

        const newRequest = await user.create_request_no_room({
            eventname,
            eventcity,
            eventstate,
            pref_check_in_date,
            pref_check_out_date,
            max_roommates,
            budget,
            noise,
            schedule,
            other_details,
            user_id
        });


        res.json(newRequest);
    } catch (err) {
        console.log(err.message);
    }

});


router.post("/requests-has-room", async (req, res) => {

    try {

        console.log(req.body);
        const {
            eventname,
            eventcity,
            eventstate,
            check_in_date,
            check_out_date,
            price_total,
            accommodation_name,
            address_line_1,
            address_line_2,
            zipcode,
            city,
            state,
            other_details,
            user_id
        } = req.body;

        const newReq = await user.create_request_w_room({
            eventname,
            eventcity,
            eventstate,
            check_in_date,
            check_out_date,
            price_total,
            accommodation_name,
            address_line_1,
            address_line_2,
            zipcode,
            city,
            state,
            other_details,
            user_id
        });

        res.json(newReq);

    } catch (err) {
        console.log(err.message);
    }
});

router.post("/get-requests-has-room", async (req, res) => {
    try {
        const {
            user_id
        } = req.body;
        const foundEvents = await user.find_req_w_room(
            user_id
        );
        res.json(foundEvents.rows);
    } catch (err) {
        console.log(err.message)
    }
});

router.post("/get-requests-no-room", async (req, res) => {
    try {
        const {
            user_id
        } = req.body;
        const foundEvents = await user.find_req_no_room(
            user_id
        );
        res.json(foundEvents.rows);
    } catch (err) {
        console.log(err.message)
    }
})

router.post("/get-requests-no-room-by-id", async (req, res) => {
    try {
        const {
            request_id
        } = req.body;

        const foundEvent = await user.find_req_id_no_room(
            request_id
        )

        res.json(foundEvent.rows[0])
    } catch (err) {
        console.log(err.message)
    }

})
router.post("/get-requests-has-room-by-id", async (req, res) => {
    try {
        const {
            request_id
        } = req.body;

        const foundEvent = await user.find_req_id_w_room(
            request_id
        )

        res.json(foundEvent.rows[0])
    } catch (err) {
        console.log(err.message)
    }

})

router.post("/delete-has-room", async (req, res) => {
    try {
        const {
            request_id
        } = req.body;

        const deletedRequest = await user.delete_has_room(
            request_id
        )
        res.json(deletedRequest);
    } catch (err) {
        console.log(err.message);
    }
})
router.post("/delete-no-room", async (req, res) => {
    try {
        const {
            request_id
        } = req.body;

        const deletedRequest = await user.delete_no_room(
            request_id
        )

        res.json(deletedRequest);
    } catch (err) {
        console.log(err.message);
    }
})

router.post("/update_has_room", async (req, res) => {
    try {
        const {
            eventname,
            eventcity,
            eventstate,
            check_in_date,
            check_out_date,
            price_total,
            accommodation_name,
            address_line_1,
            address_line_2,
            zipcode,
            city,
            state,
            other_details,
            user_id,
            request_id
        } = req.body;
        const updatedReq = await user.update_request_w_room({
            eventname,
            eventcity,
            eventstate,
            check_in_date,
            check_out_date,
            price_total,
            accommodation_name,
            address_line_1,
            address_line_2,
            zipcode,
            city,
            state,
            other_details,
            user_id,
            request_id
        });

        res.json(updatedReq);
    } catch (err) {
        console.log(err.message);
    }
})

router.get("/is-verify", auth, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.log(err.message);
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const foundUser = await user.find_auth(req.user)
        res.json(foundUser.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
})



module.exports = router;