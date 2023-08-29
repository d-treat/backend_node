import Admin from "../../models/Admin";
import Invite from "../../models/Invite";
import Organization from "../../models/Organization";
import { sendEmail } from "../../utils/nodemailer";
import { Request, Response } from "express";

export const createInvite = async (req: Request, res: Response) => {
    const { email, name, invitedBy } = req.body;

    if (!email || !name || !invitedBy) return res.status(400).json({
        message: "Please fill all fields",
        missingFields: {
            email: !email,
            name: !name,
            invitedBy: !invitedBy
        }
    });

    try {
        const invitedByAdmin = await Admin.findById(invitedBy);

        if (!invitedByAdmin) return res.status(404).json({
            message: "Admin not found"
        });

        const invite = await Invite.create({
            email,
            name,
            invitedBy
        });

        const organization = await Organization.findById(invitedByAdmin.organization);

        const { error, sent } = await sendEmail({
            to: email,
            subject: "Invitation to join the team",
            html: `
                <h1>Hi ${name}</h1>
                <p>You have been invited to join the team  ${organization?.name}</p>
                <p>Click <a href="https://www.google.com">here</a> to accept the invitation</p>
                `
        });

        if (error) return res.status(500).json({
            message: "Something went wrong",
            error
        });

        return res.status(201).json({
            success: true,
            message: "Invite created successfully",
            invite
        });


    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
}


