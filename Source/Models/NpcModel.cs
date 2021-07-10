using System.Numerics;
using AltV.Net;
using AltV.Net.Enums;

namespace NpcHandling.Models
{
    public class NpcModel
    {
        public uint Id { get; init; }
        public uint PedModel { get; init; }
        public string LabelText { get; init; }
        public string HeaderText { get; init; }
        public string WindowText { get; init; }
        
        /* Position */
        public float posX { get; init; }
        public float posY { get; init; }
        public float posZ { get; init; }
        public Vector3 Position
        {
            get => new Vector3(posX, posY, posZ);
            init
            {
                posX = value.X;
                posY = value.Y;
                posZ = value.Z;
            }
        }
        
        /* Rotation */
        public float rotX { get; init; }
        public float rotY { get; init; }
        public float rotZ { get; init; }
        public Vector3 Rotation
        {
            get => new Vector3(rotX, rotY, rotZ);
            init
            {
                rotX = value.X;
                rotY = value.Y;
                rotZ = value.Z;
            }
        }
        
        public string Button1 { get; init; }
        public string Button2 { get; init; }
        
    }
}