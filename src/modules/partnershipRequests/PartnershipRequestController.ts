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

        const emailContent = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #2B4360;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #EAEAEA;
                background-color: #F7F7F7;
            }
            .logo {
                width: 105px;
                height: 106px;
                margin-bottom: 20px;
            }
            .header {
                text-align: center;
                color: #218D82;
                font-size: 24px;
                margin-bottom: 20px;
            }
            .message {
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 20px;
            }
            .signature {
                text-align: center;
                font-style: italic;
                color: #888888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
            <svg width="105" height="106" viewBox="0 0 109 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_dd_656_499)">
                <ellipse cx="54.4569" cy="41.0808" rx="26.1483" ry="26.637" fill="#218D82" />
            </g>
            <ellipse cx="3.66565" cy="3.91002" rx="3.66565" ry="3.91002" transform="matrix(1 0 0 -1 36.1285 31.0614)" fill="#2B4360" fill-opacity="0.25" />
            <ellipse cx="2.93252" cy="3.17689" rx="2.93252" ry="3.17689" transform="matrix(1 0 0 -1 50.3029 21.2863)" fill="#2B4360" fill-opacity="0.25" />
            <circle cx="0.977506" cy="0.977506" r="0.977506" transform="matrix(1 0 0 -1 50.3029 24.2188)" fill="#E29578" fill-opacity="0.25" />
            <circle cx="0.977506" cy="0.977506" r="0.977506" transform="matrix(1 0 0 -1 57.1453 60.8753)" fill="#E29578" fill-opacity="0.25" />
            <circle cx="0.488753" cy="0.488753" r="0.488753" transform="matrix(1 0 0 -1 43.9489 23.2413)" fill="#E29578" fill-opacity="0.25" />
            <circle cx="1.95501" cy="1.95501" r="1.95501" transform="matrix(1 0 0 -1 31.73 15.91)" fill="#2B4360" fill-opacity="0.25" />
            <circle cx="5.62066" cy="5.62066" r="5.62066" transform="matrix(1 0 0 -1 46.8815 59.8978)" fill="#2B4360" fill-opacity="0.25" />
            <ellipse cx="1.95501" cy="1.71063" rx="1.95501" ry="1.71063" transform="matrix(1 0 0 -1 41.0162 62.3416)" fill="#2B4360" fill-opacity="0.25" />
            <circle cx="0.488753" cy="0.488753" r="0.488753" transform="matrix(1 0 0 -1 32.7075 20.3088)" fill="#E29578" fill-opacity="0.25" />
            <ellipse cx="3.66565" cy="3.91002" rx="3.66565" ry="3.91002" transform="matrix(1 0 0 -1 20.9775 29.1064)" fill="#2B4360" fill-opacity="0.25" />
            <ellipse cx="3.42127" cy="3.17689" rx="3.42127" ry="3.17689" transform="matrix(1 0 0 -1 46.8815 41.8139)" fill="#2B4360" fill-opacity="0.25" />
            <circle cx="0.977506" cy="0.977506" r="0.977506" transform="matrix(1 0 0 -1 23.4214 33.0164)" fill="#2B4360" fill-opacity="0.25" />
            <circle cx="0.488753" cy="0.488753" r="0.488753" transform="matrix(1 0 0 -1 53.2355 42.3027)" fill="#E29578" fill-opacity="0.25" />
            <circle cx="0.488753" cy="0.488753" r="0.488753" transform="matrix(1 0 0 -1 20 30.0838)" fill="#E29578" fill-opacity="0.25" />
            <circle cx="0.977506" cy="0.977506" r="0.977506" transform="matrix(1 0 0 -1 32.2188 48.6564)" fill="#E29578" fill-opacity="0.25" />
            <line x1="90.5" y1="12.0009" x2="90.3916" y2="74.0801" stroke="#2B4360" />
            <defs>
                <filter id="filter0_dd_656_499" x="0.308594" y="0.443726" width="108.297" height="109.274" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="10" />
                    <feGaussianBlur stdDeviation="5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0.552941 0 0 0 0 0.509804 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_656_499" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="14" />
                    <feGaussianBlur stdDeviation="14" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0.552941 0 0 0 0 0.509804 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow_656_499" result="effect2_dropShadow_656_499" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_656_499" result="shape" />
                </filter>
            </defs>
        </svg>
            </div>
            <div class="header">Partnership Approved</div>
            <p>Dear <span class="brand-color">${request.fullName}</span>,</p>
            <p class="message">Your partnership request has been approved. You can now login to your account and start using our services.</p>
            <p class="message">Thank you for choosing <span class="brand-color">d-treat</span>.</p>
            <p class="signature">Best regards,<br/>The d-treat Team</p>
        </div>
    </body>
    </html>
`;

        const { error, sent } = await sendEmail({
            to: request.email,
            subject: "Partnership Request Approved",
            html: emailContent
        });

        if (error) return res.status(500).json({
            message: "Something went wrong",
            error
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