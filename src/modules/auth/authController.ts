import Admin from "../../models/Admin";
import Doctor from "../../models/Doctor";

import { Request, Response } from "express";
import { comparePassword } from "../../utils/bcrypt";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all fields",
                missingFields: {
                    email: !email,
                    password: !password
                }
            });
        }

        const admin = await Admin.findOne({ email }).populate("organization");
        const doctor = await Doctor.findOne({ email }).populate("organization");

        if (!admin && !doctor) {
            res.status(404).json({
                message: "User not found"
            });

            return;
        }

        if (admin) {
            // const isMatch = await comparePassword(password, admin.password);
            // if (!isMatch) {
            //     return res.status(400).json({
            //         message: "Invalid credentials"
            //     });
            // }

            return res.status(200).json({
                success: true,
                message: "Login successful",
                admin
            });
        }

        if (doctor) {
            // const isMatch = await comparePassword(password, doctor.password);

            // if (!isMatch) {
            //     return res.status(400).json({
            //         message: "Invalid credentials"
            //     });
            // }

            return res.status(200).json({
                success: true,
                message: "Login successful",
                doctor
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
}