<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$to = 'info@cantieri.ai';
$subject = isset($input['_subject']) ? $input['_subject'] : 'Nuovo contatto da Cantieri AI';

$nome = htmlspecialchars($input['nome'] ?? '');
$cognome = htmlspecialchars($input['cognome'] ?? '');
$azienda = htmlspecialchars($input['azienda'] ?? 'Non fornita');
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$telefono = htmlspecialchars($input['telefono'] ?? 'Non fornito');
$messaggio = htmlspecialchars($input['messaggio'] ?? 'Nessun messaggio');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email']);
    exit;
}

$body = "
<html>
<body>
<h2>$subject</h2>
<table border='1' cellpadding='8' cellspacing='0' style='border-collapse:collapse;'>
<tr><td><strong>Nome</strong></td><td>$nome</td></tr>
<tr><td><strong>Cognome</strong></td><td>$cognome</td></tr>
<tr><td><strong>Azienda</strong></td><td>$azienda</td></tr>
<tr><td><strong>Email</strong></td><td>$email</td></tr>
<tr><td><strong>Telefono</strong></td><td>$telefono</td></tr>
<tr><td><strong>Messaggio</strong></td><td>$messaggio</td></tr>
</table>
</body>
</html>
";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: noreply@cantieri.ai\r\n";
$headers .= "Reply-To: $email\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Email sent']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
