<?php
$chamberDirectory = 'CHAMBER/'; // Directory containing the uploaded files

$files = array();

if (is_dir($chamberDirectory)) {
    if ($dh = opendir($chamberDirectory)) {
        while (($file = readdir($dh)) !== false) {
            if ($file != '.' && $file != '..') {
                $filePath = $chamberDirectory . $file;
                $fileInfo = array(
                    'name' => $file,
                    'type' => mime_content_type($filePath),
                    'lastModified' => filemtime($filePath),
                    'size' => filesize($filePath)
                );
                $files[] = $fileInfo;
            }
        }
        closedir($dh);
    }
}

// Sort files by last modified time (newest first)
usort($files, function ($a, $b) {
    return $b['lastModified'] - $a['lastModified'];
});

// Send the file data as JSON response
header('Content-Type: application/json');
echo json_encode($files);
?>
