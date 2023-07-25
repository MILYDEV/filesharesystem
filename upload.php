<?php
$uploadDirectory = 'CHAMBER/'; // Directory to store uploaded files

if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $tempFile = $_FILES['file']['tmp_name'];
    $targetFile = $uploadDirectory . $_FILES['file']['name'];

    // Move the uploaded file to the target directory
    if (move_uploaded_file($tempFile, $targetFile)) {
        $response = array('message' => 'File uploaded successfully!');
        echo json_encode($response);
    } else {
        $response = array('message' => 'Failed to move uploaded file.');
        echo json_encode($response);
    }
} else {
    $response = array('message' => 'Error uploading file.');
    echo json_encode($response);
}
?>
