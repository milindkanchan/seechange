function formatUpdatedDate(upDate){
  var strDate = '';
  var strTime = '';
  var splitDate = upDate.split("T");
  strDate = splitDate[0];
  strTime = splitDate[1].split(".")[0];
  return [strDate, strTime];
}

function formatServerIP(sip){
  return sip.replace(/\, 127.0.0.1/g, '');  
}

function getConfigurationDetails(data, setting, more){

	var data_listing = '';  
	var widgetStatus = true;
	var updatedDate = data.lastModified;
	var	val_listing = '';	
	data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
	data_listing += 	"<div style='width:25%;float:left;'><h6>Component</h6></div>";
	data_listing += 	"<div style='width:75%;float:right;padding:2.5%;text-align:right;'>" + data.component_name + "</div>";
	data_listing += "</div>";

	var sName = setting.serverName;
	var sIP = setting.serverIP;	
	data_listing +=	"<div>";
	data_listing +=		"<h6>Assigned Server(s)</h6>";
	if(sName.length > 0){		
		data_listing += 	"<ul>";
		for(i = 0; i < sName.length; i++){
			data_listing +=	  "<li>" + formatServerIP(sIP[i]) + " (" + sName[i] + ") </li>";
		}
		data_listing += 	"</ul>";
		data_listing += 	"<small> Last updated : " + updatedDate + "</small>";		
	}else{
		data_listing += 	"<ul>";
		data_listing +=			"<li>No server(s) assigned</li>";		
		data_listing += 	"</ul>";			
		data_listing += 	"<small> Last updated : " + updatedDate + "</small>";
	}
	data_listing += "</div>";
	return [data_listing, widgetStatus, '']
}