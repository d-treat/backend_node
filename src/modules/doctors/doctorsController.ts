import { Response, Request } from 'express';
import Doctor from '../../models/Doctor';

export const createDoctor = async (req: Request, res: Response) => {
    try {
        const { fullName, email, phoneNumber, organization, bio, cv, specialization, gender, password } = req.body;
        const doctor = await Doctor.create({
            fullName,
            email,
            phoneNumber,
            organization,
            bio,
            cv,
            specialization,
            gender,
            password
    });

        return res.status(201).json({
            success: true,
            message: "Doctor created successfully",
            doctor
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
}


