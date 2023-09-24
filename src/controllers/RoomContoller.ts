import { Request, Response } from 'express';
import db from '../db';



// generate a random 6 digit number
const generatePassword = (): number => {
    return Math.floor(100000 + Math.random() * 900000);
};


export const createRoom = async (req: Request, res: Response): Promise<void> => {
    const { name, admin_wallet, members } = req.body;
    if (!name || !admin_wallet) {
        res.status(400).json({ error: "Name, Password, and Admin Wallet are required" });
        return;
    }


    const password = generatePassword();

    do {
        const passwordExists = await db.Room.findOne({ where: { password } });
        if (!passwordExists) {
            break;
        }
    } while (false);


    try {
        const room = await db.Room.create({ name, password, admin_wallet });

        if (members && Array.isArray(members)) {
            const memberPromises = members.map((address: string) =>
                db.Member.create({ address, roomId: room.id }),
            );
            await Promise.all(memberPromises);
        }

        res.status(201).json({ room });
    } catch (error) {
        res.status(500).json({ error: 'Error creating room' });
    }
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

    const { address } = req.body;
    if (!address) {
        res.status(400).json({ error: "Address is required" });
        return;
    }

    if (!password) {
        res.status(400).json({ error: "Password is required" });
        return;
    }

    try {
        const room = await db.Room.findOne({ where: { password }, include: db.Member });
        if (!room) {
            res.status(404).json({ error: "Room not found" });
            return;
        }

        if (room.admin_wallet === address) {
            res.json({ room });
            return;
        }

        await db.Member.findOrCreate({
            where: { address: address, roomId: room.id },
            defaults: { address: address, roomId: room.id },
        });

        const newRoom = await db.Room.findByPk(room.id, { include: db.Member });

        res.json({ room: newRoom });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving room' });
    }
};
