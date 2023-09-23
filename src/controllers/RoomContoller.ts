import { Request, Response } from 'express';
import db from '../db';




export const createRoom = async (req: Request, res: Response): Promise<void> => {

    console.log(req);
    const { name, password, admin_wallet, members } = req.body;
    if (!name || !password || !admin_wallet) {
        res.status(400).json({ error: "Name, Password, and Admin Wallet are required" });
        return;
    }

    // try {
    const room = await db.Room.create({ name, password, admin_wallet });

    // If members are provided, add them to the room
    if (members && Array.isArray(members)) {
        const memberPromises = members.map((address: string) =>
            db.Member.create({ address, roomId: room.id }),
        );
        await Promise.all(memberPromises);
    }

    res.status(201).json({ room });
    // } catch (error) {
    //     res.status(500).json({ error: 'Error creating room' });
    // }
};

export const getRoomWithMembers = async (req: Request, res: Response): Promise<void> => {
    const { roomId } = req.params;
    try {
        const room = await db.Room.findByPk(roomId, { include: db.Member });
        if (!room) {
            res.status(404).json({ error: "Room not found" });
            return;
        }
        res.json({ room });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving room' });
    }
};

export const getRoomByPassword = async (req: Request, res: Response): Promise<void> => {
    const { password } = req.params;
    try {
        const room = await db.Room.findOne({ where: { password }, include: db.Member });
        if (!room) {
            res.status(404).json({ error: "Room not found" });
            return;
        }
        res.json({ room });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving room' });
    }
};
