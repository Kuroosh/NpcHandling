using System;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using AltV.Net;

namespace NpcHandling.Core
{
    public class Debug : IScript
    {
        private static bool DebugModeEnabled = true;
        public static void CatchExceptions(Exception ex, [CallerMemberName] string functionName = "")
        {
            if (!DebugModeEnabled) return;
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("[EXCEPTION " + functionName + "] " + ex.Message);
            Console.WriteLine("[EXCEPTION " + functionName + "] " + ex.StackTrace);
            Console.WriteLine("[EXCEPTION " + functionName + "] " + ex.InnerException);
            Console.ResetColor();
        }
        
        public static void OutputDebugString(string text)
        {
            if (!DebugModeEnabled) return;
            Console.WriteLine("|" + DateTime.Now.Hour + ":" + DateTime.Now.Minute + "| " + text);
        }
        
        
        public static void OutputDebugStringColored(string message, ConsoleColor color)
        {
            try
            {
                if (!DebugModeEnabled) return;
                string[] text = { "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", "|" + DateTime.Now.Hour + ":" + DateTime.Now.Minute + ":" + DateTime.Now.Second + "| " + message };
                var pieces = Regex.Split(text[1], @"(\[[^\]]*\])");
                foreach (var t in pieces)
                {
                    string piece = t;
                    if (piece.StartsWith("[") && piece.EndsWith("]"))
                    {
                        Console.ForegroundColor = color;
                        piece = piece[1..^1];
                    }
                    Console.Write(piece);
                    Console.ResetColor();
                }
                Console.WriteLine();
            }
            catch(Exception ex){Core.Debug.CatchExceptions(ex);}
        }
    }
}