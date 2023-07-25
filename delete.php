<?php
$chamberDirectory = 'CHAMBER/'; // Directory containing the uploaded files

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['fileName'])) {
        $fileName = $data['fileName'];

        // Check if the file exists in the CHAMBER directory
        $filePath = $chamberDirectory . $fileName;
        if (file_exists($filePath)) {
            // Attempt to delete the file
            if (unlink($filePath)) {
                $response = array('message' => 'File deleted successfully!');
                echo json_encode($response);
            } else {
                $response = array('message' => 'Failed to delete the file.');
                echo json_encode($response);
            }
        } else {
            $response = array('message' => 'File not found.');
            echo json_encode($response);
        }
    } else {
        $response = array('message' => 'Invalid request.');
        echo json_encode($response);
    }
} else {
    $response = array('message' => 'Method not allowed.');
    echo json_encode($response);
}
?>
