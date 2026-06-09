@echo off
echo === MySQL Setup Script ===

echo Step 1: Creating data directory...
if not exist "C:\MySQLData" mkdir "C:\MySQLData"

echo Step 2: Initializing MySQL...
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" --initialize-insecure --basedir="C:\Program Files\MySQL\MySQL Server 8.4" --datadir="C:\MySQLData" --console

echo Step 3: Installing MySQL service...
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" --install MySQL --basedir="C:\Program Files\MySQL\MySQL Server 8.4" --datadir="C:\MySQLData"

echo Step 4: Starting MySQL service...
net start MySQL

echo Step 5: Setting root password...
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u root --skip-password -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';"

echo === DONE! MySQL is ready ===
pause
