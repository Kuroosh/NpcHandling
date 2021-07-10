using System;
using AltV.Net;
using AltV.Net.Elements.Entities;

namespace NpcHandling.Core.Instances
{
    public class PlayerInstance : Player
    {
        // Datas
        
        public string Username { get; set; }
        // thats it.

        public PlayerInstance(IntPtr nativePointer, ushort id) : base(nativePointer, id)
        {
        }
    }

    public class PlayerFactory : IEntityFactory<IPlayer>
    {
        public IPlayer Create(IntPtr entityPointer, ushort id)
        {
            return new PlayerInstance(entityPointer, id);
        }
    }
}