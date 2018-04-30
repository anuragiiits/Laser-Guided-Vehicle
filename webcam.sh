#!/bin/bash

DATE=$(date +"%Y-%m-%d_%H%M")

fswebcam -S 20 -r 1280x720 --no-banner /home/pi/Desktop/Camera/Laser-Guided-Vehicle/$DATE.jpg