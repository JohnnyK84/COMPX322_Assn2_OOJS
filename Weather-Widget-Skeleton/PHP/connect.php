<?php
//connection script to server
$servername = "localhost";
$username = "root";
$password = "";

//uni - $conn = new PDO('mysql:host=mysql.cms.waikato.ac.nz;dbname=jk220','jk220','my11116800sql');

try {
    $conn = new PDO("mysql:host=$servername;dbname=test", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connected successfully"; 
    }
catch(PDOException $e)
    {
    echo "Connection to database failed: " . $e->getMessage();
    }
?>