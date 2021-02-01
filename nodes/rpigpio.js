/**
 * Copyright 2021 Ocean (iot.redplc@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
	"use strict";

	const syslib = require('./lib/syslib.js');
	const sysmodule = syslib.LoadModule("rpi_gpio.node");

	const MODE_NOTSET = 0;
	const MODE_INPUT = 1;
	const MODE_INPUT_PULLD = 2;
	const MODE_INPUT_PULLU = 3;
	const MODE_OUTPUT = 4;
	const MODE_OUTPUT_AL = 5;

	RED.nodes.registerType("rpigpio", function (n) {
		var node = this;
		RED.nodes.createNode(node, n);

		node.tagnamedi = "I" + n.addressdi;
		node.tagnamedo = "Q" + n.addressdo;

		node.isdi = false;
		node.isdo = false;

		node.store = node.context().global;
		node.iserror = false;

		if (typeof sysmodule === "undefined")
			node.iserror = syslib.outError(node, "sysmodule", "sysmodule not load");

		if (!node.iserror) {
			sysmodule.initDIO();

			if (n.itemlist.length > 0) {
				for (var pin = 0; pin <= 25; pin++) {
					var mode = parseInt(n.itemlist[pin].init);

					if (mode > MODE_NOTSET) {
						if (sysmodule.inuse(pin)) {
							node.iserror = syslib.outError(node, "pin in use: " + (pin + 2), "pin in use " + (pin + 2));
							break;
						}

						sysmodule.setModeDIO(pin + 2, mode);

						if ((mode >= MODE_INPUT) && (mode <= MODE_INPUT_PULLU))
							node.isdi = true;

						if ((mode >= MODE_OUTPUT) && (mode <= MODE_OUTPUT_AL))
							node.isdo = true;
					}
				}
			}
		}

		node.statustxt = "";

		if (!node.iserror && node.isdi) {
			if (typeof node.store.keys().find(key => key == node.tagnamedi) !== "undefined")
				node.iserror = syslib.outError(node, "duplicate: " + node.tagnamedi, "duplicate address: " + node.tagnamedi);
			else {
				node.store.set(node.tagnamedi, 0);
				node.statustxt = node.tagnamedi;
			}
		}

		if (!node.iserror && node.isdo) {
			if (typeof node.store.keys().find(key => key == node.tagnamedo) !== "undefined")
				node.iserror = syslib.outError(node, "duplicate: " + node.tagnamedo, "duplicate address: " + node.tagnamedo);
			else {
				node.store.set(node.tagnamedo, 0);
				node.statustxt += " " + node.tagnamedo;
			}
		}

		if (!node.iserror)
			syslib.setStatus(node, node.statustxt.trim());

		node.on("input", function (msg) {
			if (!node.iserror) {
				if ((msg.payload === "input") && node.isdi)
					node.store.set(node.tagnamedi, sysmodule.updateDI());

				if ((msg.payload === "output") && node.isdo)
					sysmodule.updateDO(node.store.get(node.tagnamedo));
			}

			node.send(msg);
		});

		node.on('close', function () {
			sysmodule.inuseClear();

			if (node.isdi)
				node.store.set(node.tagnamedi, undefined);

			if (node.isdo)
				node.store.set(node.tagnamedo, undefined);
        });
	});
}
