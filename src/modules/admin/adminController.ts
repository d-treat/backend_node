import { Request, Response } from "express";
import Admin from "../../models/Admin";

export const setPassword = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { password } = req.body;

        const user = await Admin.findById(id);

        if (!user) return res.status(404).json({
            message: "User not found"
        });

        user.password = password;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password set successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
}