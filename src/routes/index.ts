import { Router } from "express";
import * as controller from "../controllers/index";

export const index = Router();

index.get("/", controller.index);

index.post("/room", controller.createRoom);
index.get("/room/:roomId", controller.getRoomWithMembers);
index.post("/room/:roomId/member", controller.addMemberToRoom);

index.get("/room/password/:password", controller.getRoomByPassword);


index.post("/distribution", controller.distributeAmount);
