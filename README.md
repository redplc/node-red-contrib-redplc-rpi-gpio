# node-red-contrib-redplc-rpi-gpio

redPlc module node for Raspberry Pi gpio.<br>

## Install

[redPlc use this module node. Install redPlc.](https://www.npmjs.com/package/node-red-contrib-redplc)

Install with Node-Red Palette Manager or run npm command:
```
cd ~/.node-red
npm install node-red-contrib-redplc-rpi-gpio
```
## Usage
Wire this node to first output of redPlc cpu node.<br>
Global variable I are updated with digital inputs.<br>
Global variable Q sets digital output.<br>
This node works only on Raspberry Pi with Raspberry Pi OS.<br>
For prevent malfunction, check with raspi-config<br> 
if pins set as I2C, SPI or UART.<br>

## GPIO modes<br>
* **--:** Pin is untouched.<br>
* **input:** Floating input.<br>
Must connect to +3.3V or ground.
* **input-pulldown:** Input with pulldown resistor.<br>
True if connected to +3.3V.
* **input-pullup:** Input with pullup resistor.<br>
True if connected to ground.<br>
* **output:** Output.<br>
Is connected to +3.3V on true (source).
* **output-activelow:** Output active low.<br>
Is connected to ground on true (sink).

## I/O Mapping

|Bit|Funct.|Pin|Pin|Funct.|Bit|
|:--|:---- |:-:|:-:|:-----|:--|
||**3V3**|1|2|**5V**||
|2|GPIO02|3|4|**5V**||
|3|GPIO03|5|6|**GND**||
|4|GPIO04|7|8|GPIO14|14|
||**GND**|9|10|GPIO15|15|
|17|GPIO17|11|12|GPIO18|18|
|27|GPIO27|13|14|**GND**||
|22|GPIO22|15|16|GPIO23|23|
||**3V3**|17|18|GPIO24|24|
|10|GPIO10|19|20|**GND**||
|9|GPIO09|21|22|GPIO25|25|
|11|GPIO11|23|24|GPIO08|8|
||**GND**|25|26|GPIO07|7|
|||27|28|||
|5|GPIO05|29|30|**GND**||
|6|GPIO06|31|32|GPIO12|12|
|13|GPIO13|33|34|**GND**||
|19|GPIO19|35|36|GPIO16|15|
|26|GPIO26|37|38|GPIO20|20|
||**GND**|39|40|GPIO21|21|

## Donate
If you like my work please support it with donate:

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZDRCZBQFWV3A6)
