//----------------------------------//
///// VenoX Gaming & Fun 2021 © ///////
//////By Solid_Snake & VnX RL Crew////
//////www.venox-international.com//////
//----------------------------------//


import * as alt from 'alt-client';
import * as game from 'natives';

export function Draw3DText(msg: string, x: number, y: number, z: number, fontType: number, color: number[], range = 20, useOutline = true, useDropShadow = true, CustomScale = 0.4) {
    const [bol, _x, _y] = game.getScreenCoordFromWorldCoord(x, y, z);
    const camCord = game.getFinalRenderedCamCoord();
    const dist = game.getDistanceBetweenCoords(camCord.x, camCord.y, camCord.z, x, y, z, true);

    if (dist > range) return;

    let scale = (4.00001 / dist) * CustomScale
    if (scale > 0.6)
        scale = 0.6;


    const fov = (1 / game.getGameplayCamFov()) * 100;
    scale = scale * fov;

    if (!bol) return;
    game.setTextScale(scale, scale);
    game.setTextFont(fontType);
    game.setTextProportional(true);
    game.setTextColour(color[0], color[1], color[2], color[3]);
    game.setTextDropshadow(0, 0, 0, 0, 255);
    game.setTextEdge(2, 0, 0, 0, 150);
    game.setTextDropShadow();
    game.setTextOutline();
    game.setTextCentre(true);
    game.beginTextCommandDisplayText("STRING");
    game.addTextComponentSubstringPlayerName(msg);
    if (useOutline) game.setTextOutline();
    if (useDropShadow) game.setTextDropShadow();
    game.endTextCommandDisplayText(_x, _y, 0);
}

export function CreatePed(pedHash: number, pos: number[], rot = 0) {
    let Entity = game.createPed(2, pedHash, pos[0], pos[1], pos[2], rot, false, false);
    alt.setTimeout(() => {
        game.freezeEntityPosition(Entity, true);
    }, 3000);
    game.setEntityAsMissionEntity(Entity, true, false); // make sure its not despawned by game engine
    game.setBlockingOfNonTemporaryEvents(Entity, true); // make sure ped doesnt flee etc only do what its told
    game.setPedCanBeTargetted(Entity, false);
    game.setPedCanBeKnockedOffVehicle(Entity, 1);
    game.setPedCanBeDraggedOut(Entity, false);
    game.setPedSuffersCriticalHits(Entity, false);
    game.setPedDropsWeaponsWhenDead(Entity, false);
    game.setPedDiesInstantlyInWater(Entity, false);
    game.setPedCanRagdoll(Entity, false);
    game.setPedDiesWhenInjured(Entity, false);
    game.taskSetBlockingOfNonTemporaryEvents(Entity, true);
    game.setPedFleeAttributes(Entity, 0, false);
    game.setPedConfigFlag(Entity, 32, false); // ped cannot fly thru windscreen
    game.setPedConfigFlag(Entity, 281, true); // ped no writhe
    game.setPedGetOutUpsideDownVehicle(Entity, false);
    game.setPedCanEvasiveDive(Entity, false);
    return Entity;
}
