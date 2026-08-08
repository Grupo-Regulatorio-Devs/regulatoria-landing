<?php
/**
 * contacto.php — RegulatorIA demo-form receiver.
 * - Emails the lead data to claudio.valdes@gruporegulatorio.cl.
 * - Stores a backup of every request in leads/leads.csv (protected folder).
 * - Responds with JSON so the form can handle it via fetch (no reload).
 *
 * The POST field names (nombre, cargo, empresa, email, website) are the wire
 * contract with the form's FormData in main.js — do not rename them.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

/* Clean a value: strip newlines (prevents header injection) and outer spaces. */
function clean($v) {
    return trim(str_replace(["\r", "\n", "\0"], ' ', (string)$v));
}

/* Neutralize CSV formula injection: prefix cells that a spreadsheet would
   interpret as a formula with a single quote. */
function csvSafe($v) {
    return (isset($v[0]) && strpos("=+-@\t\r", $v[0]) !== false) ? "'" . $v : $v;
}

$name     = clean($_POST['nombre']  ?? '');
$role     = clean($_POST['cargo']   ?? '');
$company  = clean($_POST['empresa'] ?? '');
$email    = clean($_POST['email']   ?? '');
$honeypot = trim($_POST['website']  ?? ''); // anti-spam honeypot (must be empty)

/* Bot detected (filled the hidden honeypot): fake success and do nothing. */
if ($honeypot !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

/* Validate required fields. */
if ($name === '' || $company === '' || mb_strlen($name) > 120 || mb_strlen($company) > 120
    || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'validation']);
    exit;
}

$date = date('Y-m-d H:i:s');
$ip   = $_SERVER['REMOTE_ADDR'] ?? '';

/* ── 1) CSV backup (folder shielded from web access) ── */
$dir = __DIR__ . '/leads';
if (!is_dir($dir)) {
    @mkdir($dir, 0700, true);
    @file_put_contents($dir . '/.htaccess', "Require all denied\nDeny from all\n");
    @file_put_contents($dir . '/index.html', ''); // block directory listing
}
$csv   = $dir . '/leads.csv';
$isNew = !file_exists($csv);
if ($fp = @fopen($csv, 'a')) {
    if ($isNew) {
        @fputcsv($fp, ['fecha', 'nombre', 'cargo', 'empresa', 'email', 'ip']);
    }
    @fputcsv($fp, array_map('csvSafe', [$date, $name, $role, $company, $email, $ip]));
    @fclose($fp);
}

/* ── 2) Email notification ── */
$to      = 'claudio.valdes@gruporegulatorio.cl';
$subject = 'Nueva solicitud de demo - ' . $name . ' (' . $company . ')';
$body    = "Nueva solicitud de demo desde gruporegulatorio.cl\n\n"
         . "Nombre:  $name\n"
         . "Cargo:   $role\n"
         . "Empresa: $company\n"
         . "Email:   $email\n\n"
         . "Fecha:   $date\n"
         . "IP:      $ip\n";

$headers  = "From: RegulatorIA Web <web@gruporegulatorio.cl>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$sent = @mail($to, $encodedSubject, $body, $headers);

echo json_encode(['ok' => true, 'mailed' => (bool)$sent]);
