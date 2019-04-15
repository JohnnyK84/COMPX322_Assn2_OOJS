/*
 * Constructor function for a WeatherWidget instance.
 * 
 * container_element : a DOM element inside which the widget will place its UI
 *
 */
 
function WeatherWidget(container_element){

	//declare the data properties of the object
	var _list = []; //an array of the currently downloaded weather objects 
	var _currentSortOrder = 1;    //keep track of how the data is sorted, default is 1 = sort by maxTemp
	var _ui = {     //an inner object literal representing the widget's UI
		
		container	:	null,	// the container for all of the UI elements
		titlebar	:	null,	//div to organise UI elements
		selectContainer	:	null, //container to hold select town elements
		selecter	:	null, //drop down selecter for selecting a town to view weather
		selectOption	:	null, //selecter own options
		sortContainer	:	null, //container for filter buttons
		sortByTown  :   null,    //a button to sort by town
		sortByTemp	:   null,    // a button to sort by temp
		list		: 	null,  //list to hold weather data
		outputContainer	:	null,	//outputContainer to contain wLines
		headerTable	:	null,	//table to contain row of table headers for data display		
		tableHRow	:	null,	//table row for header elements
		tableH1		:	null,	//header for column 1
		tableH2		:	null,	//header for column 2
		tableH3		:	null,	//header for column 3
		tableH4		:	null,	//header for column 4	
		wLines		:	null,	// div to hold weather output
	};

	//function to create and configure the DOM elements for the UI
	var _createUI = function(){
		//create container for all of the UI elements and set up the title bar
		_ui.container = container_element;
		_ui.container.className = "monitor";
		//titlebar div and label
		_ui.titlebar = document.createElement("div");
		_ui.titlebar.className = "title";
		_ui.titlebar.label = document.createElement("span");
		_ui.titlebar.label.innerHTML = "Weather Widget ";
		_ui.titlebar.appendChild(_ui.titlebar.label);

		//setup container and label for town select UI
		_ui.selectContainer = document.createElement("div");
		_ui.selectContainer.className=("selectContainer");
		_ui.selectContainer.label = document.createElement("label");
		_ui.selectContainer.label.innerHTML = "Select Town: ";
		_ui.selectContainer.appendChild(_ui.selectContainer.label);
		//setup selecter dropdown and insert towns for availiable for selecetion
		_ui.selecter = document.createElement("select");
		_ui.selecter.className = "townSelecter";
		/*instantiating the onchange function caused me painful headache
		_ui.selecter.setAttribute("onchange", "_selectedCity(this.value)");*/
		//declaring this way solved my issue 
		_ui.selecter.onchange = function() {
			_selectedCity(this.value);
		}
		_ui.selectContainer.appendChild(_ui.selecter);
		_ui.selectOption = document.createElement("option");

		//setup sortContainer for filter search elements by town name or max temp
		_ui.sortContainer = document.createElement("div");
		_ui.sortContainer.className = "sortContainer";
		_ui.sortContainer.label = document.createElement("label");
		_ui.sortContainer.label.innerHTML = "Sort By:  ";
		_ui.sortContainer.appendChild(_ui.sortContainer.label);

		//buttons for sortContainer
		_ui.sortByTown = document.createElement("button");
		_ui.sortByTown.innerHTML = "Sort By Town";
		_ui.sortByTown.onclick = function () {_doSort(0);}		
		_ui.sortByTemp = document.createElement("button");
		_ui.sortByTemp.innerHTML = "Sort By Temp";
		_ui.sortByTemp.onclick = function () {_doSort(1);}
		_ui.sortContainer.appendChild(_ui.sortByTown);
		_ui.sortContainer.appendChild(_ui.sortByTemp);	

		//container for weather data and table with headers for output data
		_ui.outputContainer = document.createElement("div");
		_ui.outputContainer.className = "outputContainer";
		_ui.outputContainer.label = document.createElement("label");
		_ui.outputContainer.appendChild(_ui.outputContainer.label);
		_ui.outputContainer.label.innerHTML = "Weather Information:"
		_ui.headerTable = document.createElement("table");
		_ui.tableHRow = document.createElement("tr");
		_ui.headerTable.appendChild(_ui.tableHRow);
		_ui.tableH1 = document.createElement("th");
		_ui.tableHRow.appendChild(_ui.tableH1);
		_ui.tableH1.innerHTML= "Town";
		_ui.tableH2 = document.createElement("th");
		_ui.tableHRow.appendChild(_ui.tableH2);
		_ui.tableH2.innerHTML = "Outlook";
		_ui.tableH3 = document.createElement("th");
		_ui.tableHRow.appendChild(_ui.tableH3);
		_ui.tableH3.innerHTML = "Min Temp";
		_ui.tableH4 = document.createElement("th");
		_ui.tableHRow.appendChild(_ui.tableH4);
		_ui.tableH4.innerHTML = "Max Temp";
		_ui.outputContainer.appendChild(_ui.headerTable);

		//inner container for weather data
		_ui.wLines = document.createElement("div");
		_ui.outputContainer.appendChild(_ui.wLines)

		//add the components to the _ui container
		_ui.container.appendChild(_ui.titlebar);
		_ui.container.appendChild(_ui.selectContainer);
		_ui.container.appendChild(_ui.selectContainer);
		_ui.container.appendChild(_ui.sortContainer);
		_ui.container.appendChild(_ui.outputContainer);				
	};
	
	//add any other methods required for the functionality
	
	//query database to get all weather data
	var _getCities = function () {
		let url = "php/weather.php";
		ajaxRequest("POST", url, true, "", _populateSelecters);		
	};
	
	//create local list of weather data and fill html select <option> elements
	var _populateSelecters = function(response) {
		list = JSON.parse(response);
		//iterate over list of weather data and populate selecter options with values		
		for (var i = 0; i < list.length; i++) {				
			selectedTown = list[i].town;
			_ui.selecter.innerHTML += "<option id=selectedCity value="+selectedTown+">"+selectedTown+"</option>";			
		}					
	};

	//function called when city is seleceted from dropdown list
	var _selectedCity = function (value) {
		//alert('Selected City: '+value);
		//iterate over list of weather data and get all values of selected town
		for (var i=0; i < list.length; i++) {
			if (list[i].town == value) {
				wtown = list[i].town;
				woutlook = list[i].outlook;
				wmin = list[i].min_temp;
				wmax = list[i].max_temp;			
			}
		};		

		//use data collected above and pass into new instance of _weatherLine object
		var _weatherLine = new WLine(wtown, woutlook, wmin, wmax);
		//push object to _list of objects to be displayed in output ui		
		_list.push(_weatherLine);		

		//call _refreshList method to update ui display
		_refreshWeatherList();
	};

	var _refreshWeatherList = function() {
		//first remove all child nodes of the current _ui.wLines div
		if(_ui.wLines == null)			
			return;
		while(_ui.wLines.hasChildNodes()){
			_ui.wLines.removeChild(_ui.wLines.lastChild);			
		}

		//make sure the data is correctly sorted, 1 by default
	   if(_currentSortOrder == 1){
			_list.sort(_maxTempSort);
		} else {
			_list.sort(_townSort);
		};
		
		//add all items back to the UI
		for(var i = 0; i < _list.length; i++){
			var wLine = _list[i];
			_ui.wLines.appendChild(wLine.getDomElement());
		}		
	};

	//onclick function to set sort method then recall _refreshWeatherList to update display
	var _doSort = function(sortBy){
		if(sortBy == 1){
			_currentSortOrder = 1;	 	
		}
		else{
			_currentSortOrder = 0;
		}
		_refreshWeatherList();
	};

	//function to sort weather data by Max Temp highest to lowest
	var _maxTempSort = function (a,b) {
		return b.getMaxTemp()-a.getMaxTemp();
	};

	//function to sort weather data by town name
	var _townSort = function(a, b){
		if(a.getTown() > b.getTown())
			return 1;
		else if (a.getTown() < b.getTown())
			return -1;
		else
			return 0;
		}

	//general ajax function
	function ajaxRequest(method, url, async, data, callback){

	var request = new XMLHttpRequest();
	request.open(method,url,async);
	
	if(method == "POST"){
		request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	}
	
	request.onreadystatechange = function(){
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseText;
				callback(response);
			} else {
				alert(request.statusText);
			}
		}
    }

	request.send(data);
	};
	 
	/**
	 * private method to intialise the widget's UI on start up
	 * this method is complete
	 */
	var _initialise = function(container_element){
		_getCities(); //added _getCities to populate Seleecters		  	  		 
		_createUI(container_element);
	};

	//  _initialise method is called when a WeatherWidget object is instantiated
	_initialise(container_element);

	/*********************************************************
	* Constructor Function for the inner WLine object to hold the 
	* full weather data for a town
	********************************************************/
	var WLine = function(wtown, woutlook, wmin, wmax){
		
		//declare the data properties for the object
		var _town = wtown;
		var _outlook = woutlook;
		var _minTemp = wmin;
		var _maxTemp = wmax;		

		//declare an inner object literal to represent the widget's UI
		var _ui = {
			table		:	null,	//html table to hold data output
			tableRow	:	null,	//table row
			tableCell	:	null,	//html table cell to contain output parameters					
		}

		//write a function to create and configure the DOM elements for the UI
		var _createUI = function (){
			//create html table to hold weather data
			_ui.table = document.createElement("table");
			_ui.tableRow = document.createElement("tr");
			_ui.table.appendChild(_ui.tableRow);

			_ui.tableCell = document.createElement("td");
			_ui.tableCell.innerHTML = _town;			
			_ui.tableRow.appendChild(_ui.tableCell);

			_ui.tableCell = document.createElement("td");
			_ui.tableCell.innerHTML = _outlook;			
			_ui.tableRow.appendChild(_ui.tableCell);
			
			_ui.tableCell = document.createElement("td");
			_ui.tableCell.innerHTML = _minTemp;			
			_ui.tableRow.appendChild(_ui.tableCell);

			_ui.tableCell = document.createElement("td");
			_ui.tableCell.innerHTML = _maxTemp;			
			_ui.tableRow.appendChild(_ui.tableCell);														
		};						
		
		//public methods to return the Dom element so the PhoneWidget can add it to its own UI
		this.getDomElement = function(){
			return _ui.table;
		}
		//public method to return maxTemp to display in ui
		this.getMaxTemp = function(){
			return _maxTemp;
		}	
		//public method to return _town to display in ui
		this.getTown = function(){
			return _town;
		}	
		//not used
		this.getMinTemp = function(){
			return _minTemp;
		}		
		//_createUI() method is called when the object is instantiated
		_createUI();
	  };  //this is the end of the constructor function for the WLine object 	  
};	 
//end of constructor function for WeatherWidget 	 	 