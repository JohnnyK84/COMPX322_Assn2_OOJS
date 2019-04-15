<?php  require_once('connect.php');

	/**************************
	 * Query database for all information for weather table to populate select options
	 */
    $query = "SELECT * FROM weather";
    $result = $conn->query($query);
    
    //iterate over all rows in table and add each town name to array
    while ($row = $result->fetch()) {
        $arr[] = array (
            "town" => $row['town'],
            "outlook" =>$row['outlook'],
            "min_temp" =>$row['min_temp'],
            "max_temp" =>$row['max_temp'],
        );
    }
    
    //convert to JSON array
    $json = json_encode($arr);
    
    echo $json;        			
   
   
	


