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
        console.error("CREATE VOLUNTEER ERROR:", error);
        
        // Handle duplicate email unique constraint violation
        if (error.code === '23505' && error.constraint === 'volunteers_email_key') {
            return res.status(400).json({
                message: "A volunteer with this email is already registered. Please use a different email."
            });
        }

        return res.status(500).json({
            message: "Error creating volunteer"
        });
    }
};

module.exports = {
    getVolunteers,
    createVolunteer,
};
