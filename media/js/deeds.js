YAHOO.util.Event.addListener(window, "load", function() {
    YAHOO.example.XHR_JSON = function() {
        var myDataSource = new YAHOO.util.DataSource('/valhalla/api/json/deeds/');
        myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSON;
        myDataSource.connXhrMode = "queueRequests";
        myDataSource.responseSchema = {resultsList: 'Results',
				fields: ["fields.speaker", "fields.text", "fields.deed_date"]};
		myDataSource.doBeforeParseData = function (oRequest, oFullResponse, oCallback) {
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
            this.showTableMessage(YAHOO.widget.DataTable.MSG_ERROR, YAHOO.widget.DataTable.CLASS_ERROR);
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
