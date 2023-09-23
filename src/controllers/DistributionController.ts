import e, { Request, Response } from 'express';
import db from '../db'; // Importing your Database instance

import { withdraw } from '../utils/withdraw';

export const distributeAmount = async (req: Request, res: Response): Promise<void> => {
    const { roomId, amount } = req.body;

    if (!roomId || !amount) {
        res.status(400).json({ error: 'roomId and amount are required' });
        return;
    }

    try {
        const room = await db.Room.findByPk(roomId, { include: db.Member });
        if (!room) {
            res.status(404).json({ error: 'Room not found' });
            return;
        }

        const members = room.Members;
        if (members.length === 0) {
            res.status(400).json({ error: 'No members in the room' });
            return;
        }

        const distribution = {};
        for (const member of members) {
            // @ts-ignore
            if (distribution[member.address]) {
                // @ts-ignore
                distribution[member.address] += (amount / members.length);
            } else {
                // @ts-ignore
                distribution[member.address] = (amount / members.length);
            }
        }


        // distirbution to fixed 2 
        for (const key in distribution) {
            // @ts-ignore
            distribution[key] = distribution[key].toFixed(2);
        }


        const success = await withdraw(distribution, "TON Distribution");

        if (!success) {
            res.status(400).json({ error: 'Distribution failed' });
            return;
        }

        res.json(distribution);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
