$(document).ready(function() {
    $("#formButton").click(function() {
      $("#form1").toggle();
    });
    
    $("#submit").click(function() {
    var username = $( "#username").val(); 
      var password = $( "#password" ).val(); 
         alert("UserName:" +  username + "Password:" + password);
/*
        debugger;
        var filename = "C:\Users\Jameell Adjei\Desktop\newfile.txt";
        var tt = new ActiveXObject("Scripting.FileSystemObject");
        tt.CreateTextFile(filename);
*/

    	let text = $( "#colorChoice option:selected" ).text(); // able to save the color the user makes
     
     
    });    
  });

