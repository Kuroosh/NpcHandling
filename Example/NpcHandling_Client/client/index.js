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
// Variables
var peds = [];
var view;
alt.onServer('NpcHandling:CreatePed', function(json) {
    var data = JSON.parse(json);
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        var _loop = function(_iterator, _step) {
            var npcClass = _step.value;
            /* Load if needed */ if (!game.hasModelLoaded(npcClass.pedModel)) game.requestModel(npcClass.pedModel);
            alt.setTimeout(function() {
                var ped = CreatePed(npcClass.pedModel, [
                    npcClass.posX,
                    npcClass.posY,
                    npcClass.posZ
                ], npcClass.rotZ);
                game.setEntityInvincible(ped, true);
                peds.push({
                    ped: ped,
                    class: npcClass
                });
            }, 1000);
        };
        for(var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop(_iterator, _step);
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
});
alt.everyTick(function() {
    if (!peds.length) return;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = peds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var data = _step.value;
            Draw3DText(data.class.labelText, data.class.posX, data.class.posY, data.class.posZ + 0.2, 0, [
                255,
                255,
                255,
                255
            ], 15, true, true, 0.2);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
});
alt.on('keydown', function(key) {
    if (key != 'E'.charCodeAt(0)) return;
    if (!peds.length || view) return;
    var pos = alt.Player.local.pos;
    var pedId = -1;
    var headerText, windowText, button1, button2;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = peds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var data = _step.value;
            if (game.getDistanceBetweenCoords(pos.x, pos.y, pos.z, data.class.posX, data.class.posY, data.class.posZ, true) <= 10) {
                pedId = data.class.Id;
                headerText = data.class.headerText;
                windowText = data.class.windowText;
                button1 = data.class.button1;
                button2 = data.class.button2;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (pedId == -1) return;
    view = new alt.WebView('http://resource/client/cef/main.html');
    alt.setTimeout(function() {
        view.emit('NpcHandler:Initialize', headerText, windowText, button1, button2);
    }, 250);
    view.focus();
    alt.showCursor(true);
    alt.toggleGameControls(false);
    view.on('npcHandling:ButtonRequest', function(state) {
        if (state) {
            alt.emitServer('npcHandling:ButtonRequest', pedId);
            view.destroy();
            alt.showCursor(false);
            alt.toggleGameControls(true);
            view = null;
        } else {
            view.destroy();
            alt.showCursor(false);
            alt.toggleGameControls(true);
            view = null;
        }
    });
});
alt.on('disconnect', function() {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = peds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var data = _step.value;
            game.deleteEntity(data.ped);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    peds.length = 0;
});
