function widgetAlert(data, setting, more){

	var data_listing = '';  
	var widgetStatus = true;
	console.log(data)
	if(data.error !== null){
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:75%;float:left;'><h6>High severity</h6></div>";
		data_listing += 	"<div style='width:25%;float:right;padding:2.5%;text-align:right;'><a href='#'>" + data.highSeverity + "</a></div>";
		data_listing += "</div>";

		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:75%;float:left;'><h6>Medium severity</h6></div>";
		data_listing += 	"<div style='width:25%;float:right;padding:2.5%;text-align:right;'><a href='#'>" + data.mediumSeverity + "</a></div>";
		data_listing += "</div>";

		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:75%;float:left;'><h6>Low severity</h6></div>";
		data_listing +=     "<div style='width:25%;float:right;padding:2.5%;text-align:right;'><a href='#'>" + data.lowSeverity + "</a></div>";
		data_listing += "</div>";

	  	data_listing +=	"<div>";
		data_listing +=		"<h6>Recent alerts</h6>";
		data_listing += 	"<ul>";
		$.each(data.recentAlerts, function(index, alert){
			data_listing +=			"<li><a href='#'>" + alert.alertName + ". (" + alert.count + ") </a></li>";
		});	
		data_listing += 	"</ul>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";
		data_listing += "</div>";
	}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing +=     "<div style='width:100%;float:right;padding:2.5%;text-align:right;'><a href='#'>" + data.error + "</a></div>";
		data_listing += "</div>";
	  	data_listing +=	"<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";
		data_listing += "</div>";
	}	
	return [data_listing, widgetStatus]

}

function widgetAssets(data, setting, more){
	
	var data_listing = '';
	var val_listing = '';
	var title = '';
	var widgetStatus = true;
	if(data.error !== ''){
		var thresh = setting.productization_latency;
		var title = data.currentNoOfTitles;
		$.each(title, function(idx, cat){
			if(idx !== "error"){
				for(i=0; i < cat.length; i++){			
					val_listing += "<p>" + cat[i].value + " in " + cat[i].type + "</p>";;
				}
			}
		});

		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:75%;float:left;'><h6>Current No Of Titles</h6></div>";
		data_listing +=     "<div style='width:25%;float:right;padding:2.5%;text-align:right;'>" + val_listing + "</div>";
		data_listing += "</div>";

		val_listing = '';
		title = data.currentNoOfProducts;
		$.each(title, function(idx, cat){		
			if(idx !== "error"){			
				for(i=0; i < cat.length; i++){
					val_listing += "<p>" + cat[i].value + " in " + cat[i].type + "</p>";
				}
			}
		});

		data_listing +=      "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing +=        "<div style='width:75%;float:left;'><h6>Current No Of Products</h6></div>";
		data_listing +=        "<div style='width:25%;float:right;padding:2.5%;text-align:right;'>" + val_listing + "</div>";
		data_listing +=      "</div>";

		val_listing = '';
		title = data.currentNoOfDeliverables;
		$.each(title, function(idx, cat){		
			if(idx !== "error"){			
				for(i=0; i < cat.length; i++){							
					val_listing += "<p>" + cat[i].value + " in " + cat[i].type + "</p>";
				}
			}
		});
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:75%;float:left;'><h6>Current No. Of Deliverables</h6></div>";
		data_listing +=     "<div style='width:25%;float:right;padding:2.5%;text-align:right;'>" + val_listing + "</div>";
		data_listing += "</div>";

		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:75%;float:left;'><h6>No. Of Successful Ingests</h6></div>";
		data_listing +=     "<div style='width:25%;float:right;padding:2.5%;text-align:right;'>" + data.noOfSuccessfulIngests.ingest + " " + data.noOfSuccessfulIngests.unit + "</div>";
		data_listing += "</div>";

		data_listing +=      "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing +=        "<div style='width:75%;float:left;'><h6>No. Of failed Ingests</h6></div>";
		data_listing +=        "<div style='width:25%;float:right;padding:2.5%;text-align:right;'>" + data.noOfFailedIngests.ingest + " " + data.noOfFailedIngests.unit +"</div>";
		data_listing +=      "</div>";


		if(thresh > data.pendingProductizationItemCount){		
		widgetStatus = false;
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";	
		}	
		data_listing += 	"<div style='width:75%;float:left;'><h6>Current number of pending productization items</h6></div>";
		data_listing += 	"<div style='width:25%;float:right;padding:2.5%;text-align:right;'>" + data.pendingProductizationItemCount + "</div>";
		data_listing += "</div>";	

		data_listing += "<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";	
		data_listing += "</div>";
	}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing +=     "<div style='width:100%;float:right;padding:2.5%;text-align:right;'><a href='#'>" + data.error + "</a></div>";
		data_listing += "</div>";
	  	data_listing +=	"<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";
		data_listing += "</div>";
	}	
	return [data_listing, widgetStatus]
}

function widgetBGW(data, setting, more){

	var data_listing = '';
	var res_icoms = '';
	var widgetStatus = true;
	if(data.error !== ''){
		var rep_icoms = (data.reportedBillingIcomsRecords < 0) ? null : data.reportedBillingIcomsRecords;
	    var unrep_icoms = (data.unreportedBillingIcomsRecords < 0) ? null : data.unreportedBillingIcomsRecords;
	    if (rep_icoms == null && unrep_icoms == null){
	    	res_icoms = 0
	    }else {
	    	res_icoms = rep_icoms > 0 ? (rep_icoms / (rep_icoms + unrep_icoms)) * 100 : 0;
	    }

		if(setting.tvod_record_count_threshold < data.unreportedBillingRecords){
		widgetStatus = false;	
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		}
		data_listing += 	"<div style='width:75%;float:left;'><h6>Unreported TVOD Records</h6></div>";
		data_listing +=     "<div style='width:25%;float:right;padding:2.5%;text-align:right;'>" + data.unreportedBillingRecords + "</div>";
		data_listing += "</div>";

		if(setting.posting_success_rate_threshold > data.reportedBillingIcomsRecords){
		widgetStatus = false;
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";	
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		}
		data_listing += 	"<div style='width:75%;float:left;'><h6>Posting Success Rate</h6></div>";
		data_listing +=     "<div style='width:25%;float:right;padding:2.5%;text-align:right;'>" + rep_icoms + "</div>";
		data_listing += "</div>";

		var calcET = (data.elapsedTimeFromLastSuccessfulIngest == "-1") ? 0 : data.elapsedTimeFromLastSuccessfulIngest
		var cal_elap = data.elapsedTimeFromLastSuccessfulIngest.split(":");
		var cal_elap_time = (cal_elap[0] + cal_elap[1])/60;
		if(setting.vod_usage_ingest_threshold < cal_elap_time){
		widgetStatus = false;
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";	
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		}
		data_listing += 	"<div style='width:75%;float:left;'><h6>Elapsed Time From Last Successful Ingest</h6></div>";
		data_listing +=     "<div style='width:25%;float:right;padding:2.5%;text-align:right;'>" + calcET  + "</div>";
		data_listing += "</div>";

		data_listing += "<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";	
		data_listing += "</div>";
	}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing +=     "<div style='width:100%;float:right;padding:2.5%;text-align:right;'><a href='#'>" + data.error + "</a></div>";
		data_listing += "</div>";
	  	data_listing +=	"<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";
		data_listing += "</div>";		
	}	
	return [data_listing, widgetStatus]
}

function widgetCD(data, setting, more){
	
	var data_listing = '';
	var val_listing = '';
	var widgetStatus = true;
	val_listing = '';
	if(data.error !== ""){
		title = data.currentNoOfDeliverables;
		$.each(title, function(idx, cat){
			if(idx !== "error"){			
				for(i=0; i < cat.length; i++){											
					val_listing += "<p>" + cat[i].value + " in " + cat[i].type + "</p>";
				}
			}
		});
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:50%;float:left;'><h6>Current No Of Deliverables</h6></div>";
		data_listing +=     "<div style='width:50%;float:right;padding:2.5%;text-align:right;'>" + val_listing + "</div>";
		data_listing += "</div>";

		val_listing = '';
		title = data.failedServiceRequests;
		$.each(title, function(idx, cat){		
			if(idx !== "error"){
				val_listing += "<p>" + cat + " failure " + idx + "</p>";
			}
		});	

		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:65%;float:left;'><h6>Failed Service Requests</h6></div>";
		data_listing +=     "<div style='width:35%;float:right;padding:2.5%;text-align:left;'>" + val_listing + "</div>";
		data_listing += "</div>";

		val_listing = '';
		title = data.averageServiceRequestDuration;
		$.each(title, function(idx, cat){	
			if(idx !== "error"){			
				val_listing += "<p>" + cat + " per " + idx + "</p>";
			}
		});	

		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:65%;float:left;'><h6>Average Service Request Duration</h6></div>";
		data_listing +=     "<div style='width:35%;float:right;padding:2.5%;text-align:left;'>" + val_listing + "</div>";
		data_listing += "</div>";

		data_listing += "<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";	
		data_listing += "</div>";
	}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing +=     "<div style='width:100%;float:right;padding:2.5%;text-align:right;'><a href='#'>" + data.error + "</a></div>";
		data_listing += "</div>";
	  	data_listing +=	"<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";
		data_listing += "</div>";
	}	
	return [data_listing, widgetStatus]
}

function widgetPGW(data, setting, more){

	var transaction_success_rate = '';
	var data_listing = '';
	var widgetStatus = true;
	if(data.error !== ""){
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:75%;float:left;'><h6>Transaction Count</h6></div>";
		data_listing +=     "<div style='width:25%;float:right;padding:2.5%;text-align:right;'>" + data.transactionSuccessCount + "</div>";
		data_listing += "</div>";

		if (data.transactionSuccessCount === null && data.transactionFailedCount == null){
			transaction_success_rate = 0;
		}else{
			if (data.transactionSuccessCount > 0){
				transaction_success_rate = ((data.transactionSuccessCount - data.transactionFailedCount) / data.transactionSuccessCount) * 100;
			}else{
				transaction_success_rate = 100;
			}
		}
		if(setting.transaction_success_rate_threshold > transaction_success_rate){
		widgetStatus = false;
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";	
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		}
		data_listing += 	"<div style='width:75%;float:left;'><h6>Transaction success rate</h6></div>";
		data_listing +=     "<div style='width:25%;float:right;padding:2.5%;text-align:right;'>" + transaction_success_rate + "</div>";
		data_listing += "</div>";

		var elap_time = (data.elapsedTimeFromLastTransaction == "-1") ? nil : data.elapsedTimeFromLastTransaction
		var cal_elap = data.elapsedTimeFromLastTransaction.split(":");
		var cTime = (cal_elap[0] + cal_elap[1])/60;

		if(setting.last_transaction_threshold < cTime){
		widgetStatus = false;
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		}
		data_listing += 	"<div style='width:75%;float:left;'><h6>Elapsed Time from last transaction</h6></div>";
		data_listing +=     "<div style='width:25%;float:right;padding:2.5%;text-align:right;'>" + elap_time + "</div>";
		data_listing += "</div>";		

		data_listing += "<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";	
		data_listing += "</div>";
	}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing +=     "<div style='width:100%;float:right;padding:2.5%;text-align:right;'><a href='#'>" + data.error + "</a></div>";
		data_listing += "</div>";
	  	data_listing +=	"<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";
		data_listing += "</div>";
	}	
	return [data_listing, widgetStatus]
}

function widgetPublisher(data, setting, more){

	var data_listing = '';
	var widgetStatus = true;
	if(data.error !== ""){
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:55%;float:left;'><h6>Average rate of client requests (5F) </h6></div>";
		data_listing +=     "<div style='width:45%;float:right;padding:2.5%;text-align:right;'>" + data.totalRequestRate + " request/sec </div>";
		data_listing += "</div>";


		if(setting.publisher_latency > data.averageRequestDuration){
		widgetStatus = false;
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";	
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";	
		}
		data_listing += 	"<div style='width:60%;float:left;'><h6>Average duration of client requests (5F) </h6></div>";
		data_listing +=     "<div style='width:40%;float:right;padding:2.5%;text-align:right;'>" + data.averageRequestDuration + " seconds</div>";
		data_listing += "</div>";	

		data_listing += "<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";	
		data_listing += "</div>";
	}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing +=     "<div style='width:100%;float:right;padding:2.5%;text-align:right;'><a href='#'>" + data.error + "</a></div>";
		data_listing += "</div>";
	  	data_listing +=	"<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";
		data_listing += "</div>";
	}	
	return [data_listing, widgetStatus]
}

function widgetStreams(data, setting, more){

	var data_listing = '';
	var widgetStatus = true;
	if(data.error !== ""){
		var activeSess = ((data.totalStreams < 0 ) ? 0 : data.totalStreams) + " active session"
		if(data.totalStreams <= 0){
		widgetStatus = false;
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";	
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";	
		}	
		data_listing += 	"<div style='width:50%;float:left;'><h6>Total Streams</h6></div>";
		data_listing +=     "<div style='width:50%;float:right;padding:2.5%;text-align:right;'>" + activeSess + "</div>";
		data_listing += "</div>";

		var succrate = ((data.averageSessionSetupRate < 0) ? 0 : data.averageSessionSetupRate) + " setups / sec";
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:50%;float:left;'><h6>Average session setup rate</h6></div>";
		data_listing +=     "<div style='width:50%;float:right;padding:2.5%;text-align:right;'>" + succrate + "</div>";
		data_listing += "</div>";

		var sessLat = ((data.averageSessionLatency < 0 ) ? 0 : data.averageSessionLatency) + ' milliseconds';
		if(data.averageSessionLatency > setting.avg_latency_threshold){
		widgetStatus = false;
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";		
		}
		data_listing += 	"<div style='width:50%;float:left;'><h6>Average session latency</h6></div>";
		data_listing +=     "<div style='width:50%;float:right;padding:2.5%;text-align:right;'>" + sessLat + "</div>";
		data_listing += "</div>";

		var succRate = ((data.shortTermSuccessRate < 0) ? 0 : data.shortTermSuccessRate) + ' %';
		if(data.shortTermSuccessRate < setting.short_term_success_rate_threshold){
		widgetStatus = false;
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		}
		data_listing += 	"<div style='width:50%;float:left;'><h6>Short-term success rate</h6></div>";
		data_listing +=     "<div style='width:50%;float:right;padding:2.5%;text-align:right;'>" + succRate + "</div>";
		data_listing += "</div>";


		var medRate = ((data.mediumTermSuccessRate < 0) ? 0 : data.mediumTermSuccessRate) + ' %';
		if(data.mediumTermSuccessRate < setting.medium_term_success_rate_threshold){
		widgetStatus = false;	
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";	
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";	
		}	
		data_listing += 	"<div style='width:50%;float:left;'><h6>Medium-term success rate</h6></div>";
		data_listing +=     "<div style='width:50%;float:right;padding:2.5%;text-align:right;'>" + medRate + "</div>";
		data_listing += "</div>";

		var maxPermin = ((data.maximumNoOfSessionsPerMinute < 0 ) ? 0 : data.maximumNoOfSessionsPerMinute) + ' sessions / min';
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing += 	"<div style='width:50%;float:left;'><h6>Maximum number of sessions</h6></div>";
		data_listing +=     "<div style='width:50%;float:right;padding:2.5%;text-align:right;'>" + maxPermin + "</div>";
		data_listing += "</div>";				

		data_listing += "<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";	
		data_listing += "</div>";
	}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing +=     "<div style='width:100%;float:right;padding:2.5%;text-align:right;'><a href='#'>" + data.error + "</a></div>";
		data_listing += "</div>";
	  	data_listing +=	"<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";
		data_listing += "</div>";
	}	
	return [data_listing, widgetStatus]
}

function widgetSystems(data, setting, more){

	var data_listing = '';
	var val_listing = ''
	var Vdown = 0;
	var Sdown = 0;
	var widgetStatus = true;
	console.log(data)
	if(data.error !== null){
		var vms = data.vmnodes;
		$.each(vms, function(idx, cat){
			if(idx === 'down'){
				Vdown = cat;
			}
			val_listing += "<p>" + cat + " " + idx + "</p>";
		});
		if(setting.server_threshold_down < Vdown){
		widgetStatus = false;	
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";		
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";	
		}	
		data_listing +=        "<div style='width:50%;float:left;'><h6>Virtual Machine (VM) nodes</h6></div>";
		data_listing +=        "<div style='width:50%;float:right;padding:2.5%;text-align:right;'>" + val_listing + "</div>";
		data_listing +=      "</div>";

		var serv = data.services
		val_listing = '';
		$.each(serv, function(idx, cat){
			if(idx === 'down'){
				Sdown = cat;
			}
			val_listing += "<p>" + cat + " " + idx + "</p>";
		});
		if(setting.service_threshold_down < Sdown){	
		widgetStatus = false;	
		data_listing += "<div style='width:100%;background:#FAC6C8;border:#ED1C24 solid 1px;float:left; margin:0 .25% 5px 0; padding:1%'>";		
		}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";	
		}	
		data_listing +=        "<div style='width:50%;float:left;'><h6>Services</h6></div>";
		data_listing +=        "<div style='width:50%;float:right;padding:2.5%;text-align:right;'>" + val_listing + "</div>";
		data_listing +=      "</div>";	

		data_listing += "<div>";
		data_listing += 	"<small> Last updated" + data.lastModified + "</small>";	
		data_listing += "</div>";
	}else{
		data_listing += "<div style='width:100%; background:rgba(0,0,0,.1); float:left; margin:0 .25% 5px 0; padding:1%'>";
		data_listing +=     "<div style='width:100%;float:right;padding:2.5%;text-align:right;'><a href='#'>" + data.error + "</a></div>";
		data_listing += "</div>";
	  	data_listing +=	"<div>";
		data_listing += 	"<small> Last updated : " + data.lastModified + "</small>";
		data_listing += "</div>";		
	}	
	return [data_listing, widgetStatus]
}