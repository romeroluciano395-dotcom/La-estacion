# Arranca la base de datos PostgreSQL del proyecto (puerto 5433).
# Uso:  powershell -ExecutionPolicy Bypass -File scripts\start-db.ps1
$bin  = "C:\Program Files\PostgreSQL\18\bin"
$data = "C:\Users\rrhh_\pgdata-laestacion"
$log  = "$data\server.log"
$listening = (Get-NetTCPConnection -LocalPort 5433 -State Listen -ErrorAction SilentlyContinue)
if ($listening) {
  Write-Host "La base ya esta corriendo en el puerto 5433." -ForegroundColor Green
} else {
  & "$bin\pg_ctl.exe" -D $data -l $log -o "-p 5433" start
  Write-Host "Base de datos iniciada en el puerto 5433." -ForegroundColor Green
}
