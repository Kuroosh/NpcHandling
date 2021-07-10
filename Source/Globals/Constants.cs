using System.Collections.Generic;
using System.Numerics;
using System.Text.Json;
using AltV.Net.Enums;
using NpcHandling.Models;

namespace NpcHandling.Globals
{
    public class Constants
    {
        // create the npc's into our list.
        private static readonly List<NpcModel> NpcList = new()
        {
            new NpcModel
            {
                Id = 1,
                PedModel = (uint)PedModel.Dealer01SMY,
                LabelText = "eyyoo... dude... ~r~psst.. ~b~come here!", 
                HeaderText = "Crack?? Where?", 
                WindowText = "Hey man...<br>do you have some crack?", 
                Position = new Vector3(0,0,72), 
                Rotation = new Vector3(0,0,0), 
                Button1 = "Accept [100$ for 1 G]", 
                Button2 = "No thanks.."
            },
            new NpcModel
            {
                Id = 2,
                PedModel = (uint)PedModel.RussianDrunk,
                LabelText = "~r~BLYAT! ~w~Do you have some Vodka?", 
                HeaderText = "Have some Vodka dolbajob?", 
                WindowText = "Ey yo... psst.. dude..<br>You have any Vodka with you?", 
                Position = new Vector3(20,10,71.25f), 
                Rotation = new Vector3(0,0,0), 
                Button1 = "Accept [Give one Vodka]", 
                Button2 = "Cyka Blyat no!"
            }
        };

        // convert dict to json string.
        public static readonly string NpcHandlingJson = System.Text.Json.JsonSerializer.Serialize(NpcList, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
    }
}