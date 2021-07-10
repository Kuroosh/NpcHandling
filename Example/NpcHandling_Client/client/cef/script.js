if ('alt' in window) {
    alt.on('NpcHandler:Initialize', function(headerText, windowText, button1, button2) {
        return Initialize(headerText, windowText, button1, button2);
    });
}
function Initialize(headerText, windowText, button1, button2) {
    $('.NpcHandling_HeaderText').html(headerText);
    $('.NpcHandling_WindowText').html(windowText);
    $('.NpcHandling_Button1').html(button1);
    $('.NpcHandling_Button2').html(button2);
} // debug : 
 //Initialize('Crack?? Where?', 'Ey yo... psst.. dude..<br>You have any drugs with you?<br>I will pay you 100$ for 1 G of good weed man... <br><br>Will you accept?', 'Accept [100$ for 1 G]', 'No go away dude..');
