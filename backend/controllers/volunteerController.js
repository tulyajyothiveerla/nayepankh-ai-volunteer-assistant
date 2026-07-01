const pool = require("../config/db");

const getVolunteers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM volunteers ORDER BY id ASC"
        );
        return res.json(result.rows);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error fetching volunteers",
        });
    }
};

const createVolunteer = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            skills,
            interests,
            availability,
        } = req.body;
        const result = await pool.query(
            `INSERT INTO volunteers
                (name, email, phone, skills, interests, availability)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING * `,
            [name, email, phone, skills, interests, availability]
        );

        return res.status(201).json({
            message: "Volunteer Registered Successfully",
            volunteer: result.rows[0],
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error creating volunteer",
        });
    }
};

module.exports = {
    getVolunteers,
    createVolunteer,
};
