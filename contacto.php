<?php
/**
 * contacto.php — Receptor del formulario de demo de RegulatorIA.
 * - Envía un email a claudio.valdes@gruporegulatorio.cl con los datos del lead.
 * - Guarda un respaldo de cada solicitud en leads/leads.csv (carpeta protegida).
 * - Responde JSON para que el formulario lo maneje con fetch (sin recargar).
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

/* Limpia un valor: quita saltos de línea (evita inyección de cabeceras) y espacios. */
function clean($v) {
    return trim(str_replace(["\r", "\n", "\0"], ' ', (string)$v));
}

$nombre  = clean($_POST['nombre']  ?? '');
$cargo   = clean($_POST['cargo']   ?? '');
$empresa = clean($_POST['empresa'] ?? '');
$email   = clean($_POST['email']   ?? '');
$hp      = trim($_POST['website']  ?? ''); // honeypot anti-spam (debe ir vacío)

/* Bot detectado (rellenó el honeypot oculto): fingimos éxito y no hacemos nada. */
if ($hp !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

/* Validación de campos obligatorios. */
if ($nombre === '' || $empresa === '' || mb_strlen($nombre) > 120 || mb_strlen($empresa) > 120
    || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'validation']);
    exit;
}

$fecha = date('Y-m-d H:i:s');
$ip    = $_SERVER['REMOTE_ADDR'] ?? '';

/* ── 1) Respaldo en CSV (carpeta protegida del acceso web) ── */
$dir = __DIR__ . '/leads';
if (!is_dir($dir)) {
    @mkdir($dir, 0700, true);
    @file_put_contents($dir . '/.htaccess', "Require all denied\nDeny from all\n");
    @file_put_contents($dir . '/index.html', ''); // evita listado de directorio
}
$csv   = $dir . '/leads.csv';
$nuevo = !file_exists($csv);
if ($fp = @fopen($csv, 'a')) {
    if ($nuevo) {
        @fputcsv($fp, ['fecha', 'nombre', 'cargo', 'empresa', 'email', 'ip']);
    }
    @fputcsv($fp, [$fecha, $nombre, $cargo, $empresa, $email, $ip]);
    @fclose($fp);
}

/* ── 2) Envío de email ── */
$to      = 'claudio.valdes@gruporegulatorio.cl';
$subject = 'Nueva solicitud de demo - ' . $nombre . ' (' . $empresa . ')';
$body    = "Nueva solicitud de demo desde gruporegulatorio.cl\n\n"
         . "Nombre:  $nombre\n"
         . "Cargo:   $cargo\n"
         . "Empresa: $empresa\n"
         . "Email:   $email\n\n"
         . "Fecha:   $fecha\n"
         . "IP:      $ip\n";

$headers  = "From: RegulatorIA Web <web@gruporegulatorio.cl>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$sent = @mail($to, $encodedSubject, $body, $headers);

echo json_encode(['ok' => true, 'mailed' => (bool)$sent]);
