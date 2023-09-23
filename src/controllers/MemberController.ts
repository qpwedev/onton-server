
import { Request, Response } from 'express';
import db from '../db';


export const addMemberToRoom = async (req: Request, res: Response): Promise<void> => {
    const { roomId } = req.params;
    const { address } = req.body;

    if (!address) {
        res.status(400).json({ error: 'Address is required' });
        return;
    }

    try {
        const room = await db.Room.findByPk(roomId);
        if (!room) {
            res.status(404).json({ error: 'Room not found' });
            return;
        }

        const member = await db.Member.create({ address, roomId });
        res.status(201).json({ member });
    } catch (error) {
        res.status(500).json({ error: 'Error adding member to room' });
    }
};
