# Rechte ändern
# sudo chmod 222 /sys/class/gpio/export /sys/class/gpio/unexport
echo "23" > /sys/class/gpio/export
echo "24" > /sys/class/gpio/export
echo "out" > /sys/class/gpio/gpio23/direction
echo "out" > /sys/class/gpio/gpio24/direction