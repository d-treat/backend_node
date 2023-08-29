import { Request, Response } from "express";
import PartnershipRequest from "../../models/PartnershipRequest";
import Organization from "../../models/Organization";
import Admin from "../../models/Admin";
import { sendEmail } from "../../utils/nodemailer";


export const createRequest = async (req: Request, res: Response) => {

    try {
        const { fileId, fullNames, email, phoneNumber, address, organization, message } = req.body;

        if (!fileId || !fullNames || !email || !phoneNumber || !address || !organization || !message) return res.status(400).json({
            message: "Please fill all fields",
            missingFields: {
                fileId: !fileId,
                fullName: !fullNames,
                email: !email,
                phoneNumber: !phoneNumber,
                address: !address,
                organization: !organization,
                message: !message,
            }
        });

        const request = await PartnershipRequest.create({
            proofOfOwnership: fileId,
            fullName: fullNames,
            email,
            phoneNumber,
            address,
            organization,
            message
        });

        return res.status(201).json({
            success: true,
            message: "Request created successfully",
            request
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
}

export const getAllRequests = async (req: Request, res: Response) => {
    try {
        const requests = await PartnershipRequest.find({ status: "pending" }).populate("proofOfOwnership");
        return res.status(200).json({
            message: "Requests fetched successfully",
            requests
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
}

export const approveRequest = async (req: Request, res: Response) => {
    try {
        const { requestId } = req.params;

        if (!requestId) return res.status(400).json({
            message: "Please provide request id"
        });

        const request = await PartnershipRequest.findById(requestId);

        if (!request) return res.status(404).json({
            message: "Request not found"
        });

        request.status = "accepted";
        await request.save();

        const organization = await Organization.create({
            name: request.organization
        });

        await Admin.create({
            fullName: request.fullName,
            email: request.email,
            phoneNumber: request.phoneNumber,
            address: request.address,
            proofOfOwnership: request.proofOfOwnership,
            organization: organization._id
        });

        await sendEmail({
            to: request.email,
            subject: "Partnership Request Approved",
            html: `
                <p>Dear ${request.fullName},</p>
                <p>Your partnership request has been approved. You can now login to your account and start using our services.</p>
                <p>Thank you for choosing us.</p>
            `
        });

        return res.status(200).json({
            success: true,
            message: "Request approved successfully",
            request
        });

    } catch (error) {
        return res.status(500).json({
            success: true,
            message: "Something went wrong",
            error
        });
    }
}

export const rejectRequest = async (req: Request, res: Response) => {
    try {
        const { requestId } = req.params;

        if (!requestId) return res.status(400).json({
            message: "Please provide request id"
        });

        const request = await PartnershipRequest.findById(requestId);

        if (!request) return res.status(404).json({
            message: "Request not found"
        });

        request.status = "rejected";
        await request.save();

        return res.status(200).json({
            message: "Request rejected successfully",
            request
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
}