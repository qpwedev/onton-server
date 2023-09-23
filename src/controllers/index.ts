import { Request, Response } from "express";
import { createRoom, getRoomWithMembers, getRoomByPassword } from "./RoomContoller";
import { addMemberToRoom } from "./MemberController";
import { distributeAmount } from "./DistributionController";



export const index = async (req: Request, res: Response): Promise<void> => {
    res.render("index", { title: "Express" });
};

export { createRoom, getRoomWithMembers, addMemberToRoom, distributeAmount, getRoomByPassword };
