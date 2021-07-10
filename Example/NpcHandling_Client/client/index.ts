//----------------------------------//
///// VenoX Gaming & Fun 2021 © ///////
//////By Solid_Snake & VnX RL Crew////
//////www.venox-international.com//////
//----------------------------------//

///<reference types="@altv/types-client" />
///<reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import * as game from 'natives';
import { CreatePed, Draw3DText } from './globals';
import NpcModel from './models/npc-model';



// Variables
const peds = [];
let view;

alt.onServer('NpcHandling:CreatePed', json => {
    const data: NpcModel[] = JSON.parse(json);
    for (const npcClass of data) {
        /* Load if needed */
        if (!game.hasModelLoaded(npcClass.pedModel)) game.requestModel(npcClass.pedModel);
        let ped = CreatePed(npcClass.pedModel, [npcClass.posX, npcClass.posY, npcClass.posZ], npcClass.rotZ);
        game.setEntityInvincible(ped, true);
        peds.push({
            ped: ped,
            class: npcClass
        });
    }
});

alt.everyTick(() => {
    if (!peds.length) return;
    for (const data of peds)
        Draw3DText(data.class.labelText, data.class.posX, data.class.posY, data.class.posZ + 0.2, 0, [255, 255, 255, 255], 15, true, true, 0.2);
});


alt.on('keydown', key => {
    if (key != 'E'.charCodeAt(0)) return;
    if (!peds.length || view) return;

    let pos = alt.Player.local.pos;
    let pedId = -1;
    let headerText: string,
        windowText: string,
        button1: string,
        button2: string;

    for (const data of peds)
        if (game.getDistanceBetweenCoords(pos.x, pos.y, pos.z, data.class.posX, data.class.posY, data.class.posZ, true) <= 10) {
            pedId = data.class.Id;
            headerText = data.class.headerText;
            windowText = data.class.windowText;
            button1 = data.class.button1;
            button2 = data.class.button2;
        }
    if (pedId == -1) return;
    view = new alt.WebView('http://resource/client/cef/main.html');
    view.emit('NpcHandler:Initialize', headerText, windowText, button1, button2);
    view.focus();
    alt.showCursor(true);
    alt.toggleGameControls(false);
    view.on('npcHandling:ButtonRequest', (state: Boolean) => {
        if (state) {
            alt.log('npcHandling:ButtonRequest : ' + pedId);
            alt.emitServer('npcHandling:ButtonRequest', pedId);
        }
        else {
            view.destroy();
            alt.showCursor(false);
            alt.toggleGameControls(true);
            view = null;
        }
    });
});


alt.on('disconnect', () => {
    for (const data of peds)
        game.deleteEntity(data.ped);

    peds.length = 0;
});

