function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
//----------------------------------//
///// VenoX Gaming & Fun 2021 © ///////
//////By Solid_Snake & VnX RL Crew////
//////www.venox-international.com//////
//----------------------------------//
import * as alt from 'alt-client';
import * as game from 'natives';
export function Draw3DText(msg, x, y, z, fontType, color, param, param1, param2, param3) {
    var range = param === void 0 ? 20 : param, useOutline = param1 === void 0 ? true : param1, useDropShadow = param2 === void 0 ? true : param2, CustomScale = param3 === void 0 ? 0.4 : param3;
    var ref = _slicedToArray(game.getScreenCoordFromWorldCoord(x, y, z), 3), bol = ref[0], _x = ref[1], _y = ref[2];
    var camCord = game.getFinalRenderedCamCoord();
    var dist = game.getDistanceBetweenCoords(camCord.x, camCord.y, camCord.z, x, y, z, true);
    if (dist > range) return;
    var scale = 4.00001 / dist * CustomScale;
    if (scale > 0.6) scale = 0.6;
    var fov = 1 / game.getGameplayCamFov() * 100;
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
export function CreatePed(pedHash, pos, param) {
    var rot = param === void 0 ? 0 : param;
    var Entity = game.createPed(2, pedHash, pos[0], pos[1], pos[2], rot, false, false);
    alt.setTimeout(function() {
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
