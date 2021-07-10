using System;
using AltV.Net;
using AltV.Net.Async;
using NpcHandling.Core.Instances;

namespace NpcHandling.Globals
{
    public class ScriptEvents : IScript
    {
        
        [ScriptEvent(ScriptEventType.PlayerConnect)]
        public static void OnPlayerConnect(PlayerInstance player, string reason)
        {
            player?.EmitLocked("NpcHandling:CreatePed", Constants.NpcHandlingJson);
            Core.Debug.OutputDebugStringColored("~~~~~~ NPC - Handling [Created Peds for playerId "+ player.Id +"] ~~~~~~", ConsoleColor.Green);
        }
    }
}