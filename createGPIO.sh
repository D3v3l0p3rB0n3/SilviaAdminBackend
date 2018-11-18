# Rechte ändern
sudo chmod 222 /sys/class/gpio/export /sys/class/gpio/unexport
echo "17" > /sys/class/gpio/export
echo "out" > /sys/class/gpio/gpio17/direction