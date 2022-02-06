<?php

session_start();
if (isset($_COOKIE["HealthIT"])) {
    $token = $_COOKIE["HealthIT"];

    if ($token == "") {
        header('Location: http://localhost/Health%20IT/code/healthIT/');
    }

    $url = 'http://localhost:4000/api/v1/users/validate';
    $data = array('token' => $token);
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        )
    );


    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    if ($result === FALSE) { /* Handle error */
        header('Location: http://localhost/Health%20IT/code/healthIT/');
    }


    $resultArray = json_decode($result, true);

    foreach ($resultArray as $key => $item) {
        $status = $item["status"];

        if ($key == "status") {
            if ($item == "authenticated") {
            } else {
                header('Location: http://localhost/Health%20IT/code/healthIT/');
            }
        }
        if ($key == "user") {
            $_SESSION["firstname"] = $item["firstname"];
            $_SESSION["doctorID"]  =  $item["lastName"];
            $_SESSION["doctorID"] =  $item["doctorID"];
        }
    }





    // var_dump($result);
} else {
    header('Location: http://localhost/Health%20IT/code/healthIT/');
}
