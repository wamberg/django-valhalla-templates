YAHOO.util.Event.addListener(window, "load", function() {
    YAHOO.example.XHR_JSON = function() {
        var myDataSource = new YAHOO.util.DataSource('/valhalla/api/json/deeds/');
        myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSON;
        myDataSource.connXhrMode = "queueRequests";
        myDataSource.responseSchema = {resultsList: 'Results',
				fields: ["fields.speaker", "fields.text", "fields.deed_date"]};
		myDataSource.doBeforeParseData = function (oRequest,
			oFullResponse, oCallback) {
				oFullResponse = {"Results": oFullResponse };
				return oFullResponse;
		};

        var myColumnDefs = [
            {key:"fields.speaker",
				label:"Speaker",
				sortable:true},
            {key:"fields.text",
				label:"Text"},
            {key:"fields.deed_date",
				label:"Date and Time",
				formatter: YAHOO.widget.DataTable.formatDate,
				sortable:true}
        ];

        var myDataTable = new YAHOO.widget.DataTable("json", myColumnDefs,
                myDataSource);

        var mySuccessHandler = function() {
            this.set("sortedBy", null);
            this.onDataReturnAppendRows.apply(this,arguments);
        };
        var myFailureHandler = function() {
            this.showTableMessage(YAHOO.widget.DataTable.MSG_ERROR,
					YAHOO.widget.DataTable.CLASS_ERROR);
            this.onDataReturnAppendRows.apply(this,arguments);
        };
        var callbackObj = {
            success : mySuccessHandler,
            failure : myFailureHandler,
            scope : myDataTable
        };
        return {
            oDS: myDataSource,
            oDT: myDataTable
        };
    }();
});

// POST form
var handleSuccess = function(o) {
	var div = document.getElementById("post_status");
	div.innerHTML = o.responseText;
};

var handleFailure = function(o) {
	var div = document.getElementById("post_status");
	div.innerHTML = o.responseText;
};

var callback = {
	success: handleSuccess,
	failure: handleFailure,
};

var purl = "/valhalla/api/json/deeds/";

var makeRequest = function() {
	var speaker = document.getElementById("speaker");
	var text = document.getElementById("text");
	var datetime = document.getElementById("date");
	var newDeed = [
		{"pk": 1, "model": "valhalla.deed", "fields": {
			"create_date": "2008-11-24 21:22:45",
			"text": text.value,
			"deed_date": datetime.value,
			"speaker": speaker.value,
			"user": 1,
			"witness": "web"}
		}
	];

	var postJson = YAHOO.lang.JSON.stringify(newDeed);
	var request = YAHOO.util.Connect.asyncRequest('POST', purl, callback, postJson);
};
