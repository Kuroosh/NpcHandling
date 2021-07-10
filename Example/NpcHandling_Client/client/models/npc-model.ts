//----------------------------------//
///// VenoX Gaming & Fun 2021 © ///////
//////By Solid_Snake & VnX RL Crew////
//////www.venox-international.com//////
//----------------------------------//

import { Vector3 } from "alt-client";


export default interface NpcModel {
    id: number,
    pedModel: number;
    labelText: string,
    headerText: string;
    windowText: string;
    posX: number;
    posY: number;
    posZ: number;
    rotX: number;
    rotY: number;
    rotZ: number;
    button1: string,
    button2: string
}