/*
 * Constructor function for a WeatherWidget instance.
 * container_element : a DOM element inside which the widget will place its UI
 */
 
function WeatherWidget(container_element){
	//declare the data properties of the object 
	
	/**
		//declare an inner object literal to represent the widget's UI
		//write a function to create and configure the DOM elements for the UI
		var _createUI = function(container){
		}
	*/
	
	var _list = [];   //an array of currently downloaded phone listings as PhoneLine objects
	var _request ;    //the XHR request object
	var _currentSortOrder = 1;    //keep track of how the data is sorted, default is 1 = sort by name
	
	var _ui = {     //an inner object literal representing the widget's UI
		
		sortByName  :   null,    //a button to sort by name
		sortById	:   null,    // a button to sort by id
		nameEntry   :   null,    // for entering a name to find
		nameFind    :   null,    //button to find name
		container	:	null,	// the container for all of the UI elements
		titlebar	:	null,	//div to organise UI elements
		toolbar		: 	null,   //div to organise UI elements
		list		: 	null,  //the div area which will hold the PhoneLine object UIs
	};
	                                                         
	//add any other methods required for the functionality
	
	var _createUI = function(){
	
		//create the container for all of the UI elements and set up the titlebar
			_ui.container = container_element;
			_ui.container.className = "monitor";
			_ui.titlebar = document.createElement("div");
			_ui.titlebar.className = "title";
			_ui.titlebar.label = document.createElement("span");
			_ui.titlebar.label.innerHTML = "Contact Details ";
			_ui.titlebar.appendChild(_ui.titlebar.label);
			
			//now create and set up the toolbar elements
			_ui.toolbar = document.createElement("div");
			_ui.nameEntry = document.createElement("input");
			//set any other properties you need for the nameEntry element
			
			_ui.nameFind = document.createElement("button");
			//add things like the button label and onclick behaviour
		
			_ui.sortByName = document.createElement("button");
			//add things like the button label and onclick behaviour
			_ui.sortById = document.createElement("button");
			//add things like the button label and onclick behaviour
			
			_ui.toolbar.appendChild(_ui.nameEntry);
			//append all of the other elements needed to toolbar in the same way
			
			//finally create the div which will hold the PhoneList items
			_ui.list = document.createElement("div");
			
			//add the three components to the _ui container
			_ui.container.appendChild(_ui.titlebar);
			_ui.container.appendChild(_ui.toolbar);
			_ui.container.appendChild(_ui.list);
	
			//end of UI creation function
		}
	 /**
	  * private method to intialise the widget's UI on start up
	  * this method is complete
	  */
	  var _initialise = function(container_element){
	  	_createUI(container_element);
	  	}
	  	
	  	
	/*********************************************************
	* Constructor Function for the inner WLine object to hold the 
	* full weather data for a town
	********************************************************/
	
	var WLine = function(wtown, woutlook, wmin, wmax){
		
		//declare the data properties for the object
		
		//declare an inner object literal to represent the widget's UI


		//write a function to create and configure the DOM elements for the UI
		var _createUI = function(container){
		
		}
		
		//Add any remaining functions you need for the object
	
		//_createUI() method is called when the object is instantiated
		_createUI();


	 
  	};  //this is the end of the constructor function for the WLine object 
	
	
	//  _initialise method is called when a WeatherWidget object is instantiated
	 _initialise(container_element);
}
	 
//end of constructor function for WeatherWidget 	 
	 
	 