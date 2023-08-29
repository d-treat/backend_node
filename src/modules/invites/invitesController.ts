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
            invitedBy,
            organization: invitedByAdmin.organization
        });

        const organization = await Organization.findById(invitedByAdmin.organization);

        const { error, sent } = await sendEmail({
            to: email,
            subject: "Invitation to join the team",
            html: `
                <h1>Hi ${name}</h1>
                <p>You have been invited to join the team  ${organization?.name}</p>
                <p>Click <a href="${process.env.FRONTEND_URL}/doctor/register?invite=${invite._id}">here</a> to accept the invitation</p>
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



export const getInvite = async (req: Request, res: Response) => {
    try {
        const { inviteId } = req.params;

        if (!inviteId) return res.status(400).json({
            message: "Please provide invite id"
        });

        const invite = await Invite.findById(inviteId).populate("organization");

        if (!invite) return res.status(404).json({
            message: "Invite not found"
        });

        return res.status(200).json({
            message: "Invite fetched successfully",
            invite
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}
