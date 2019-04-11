/*
 * Constructor function for a WeatherWidget instance.
 * 
 * container_element : a DOM element inside which the widget will place its UI
 *
 */
 
function WeatherWidget(container_element){

	//declare the data properties of the object 
	
	/**
		//declare an inner object literal to represent the widget's UI
		//write a function to create and configure the DOM elements for the UI
		var _createUI = function(container){
		
		}
	*/
	
	
	//add any other methods required for the functionality
	
	 
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
	 
	 