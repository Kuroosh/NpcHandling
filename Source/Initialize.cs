using System;
using System.Runtime.Loader;
using AltV.Net;
using AltV.Net.Async;
using AltV.Net.Elements.Entities;
using AltV.Net.Native;
using NpcHandling.Core.Instances;

namespace NpcHandling
{
    public class Initialize : Resource
    {
        public override void OnStart()
        {
            Core.Debug.OutputDebugStringColored("~~~~~~ NPC - Handling [Started] ~~~~~~", ConsoleColor.Green);
        }

        public override void OnStop()
        {
            Core.Debug.OutputDebugStringColored("~~~~~~ NPC - Handling [Stopped] ~~~~~~", ConsoleColor.Green);
        }

        public override IEntityFactory<IPlayer> GetPlayerFactory()
        {
            return new PlayerFactory();
        }
    }
}