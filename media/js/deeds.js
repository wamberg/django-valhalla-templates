ds = [{"pk": 1, "model": "valhalla.deed", "fields": {"create_date": "2008-11-20 21:00:15", "text": "i know dillbilly, i tried terminal too, it almost killed me", "deed_date": "2008-11-20 21:00:15", "speaker": "wustin", "user": 1, "witness": "wamberg"}}, {"pk": 2, "model": "valhalla.deed", "fields": {"create_date": "2008-11-20 21:00:43", "text": "they like, can't get it through their little ant brain that there's no food for them in my kitchen", "deed_date": "2008-11-20 21:00:43", "speaker": "dillbilly", "user": 1, "witness": "wustin"}}];

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
