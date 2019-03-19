# Rechte ändern
# sudo chmod 222 /sys/class/gpio/export /sys/class/gpio/unexport
echo "18" > /sys/class/gpio/export
echo "17" > /sys/class/gpio/export
echo "23" > /sys/class/gpio/export
echo "24" > /sys/class/gpio/export
sudo echo "out" > /sys/class/gpio/gpio23/direction
sudo echo "out" > /sys/class/gpio/gpio24/direction
sudo echo "out" > /sys/class/gpio/gpio17/direction
sudo echo "in" > /sys/class/gpio/gpio18/direction
