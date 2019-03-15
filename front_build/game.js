/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./front/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./front/main.ts":
/*!***********************!*\
  !*** ./front/main.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mage = __webpack_require__(/*! mage-sdk-js */ "./node_modules/mage-sdk-js/index.js");
mage.setEndpoint('http://localhost:8080');
var State;
(function (State) {
    State[State["Loading"] = 0] = "Loading";
    State[State["Loaded"] = 1] = "Loaded";
    State[State["LoggedIn"] = 2] = "LoggedIn";
})(State || (State = {}));
function adjustVisibility(state) {
    const all = ['loading', 'login', 'game'];
    let toShow = '';
    switch (state) {
        case State.Loading:
            toShow = 'loading';
            break;
        case State.Loaded:
            toShow = 'login';
            break;
        case State.LoggedIn:
            toShow = 'game';
            break;
    }
    for (const id of all) {
        const el = document.getElementById(id);
        if (el && el.id !== toShow) {
            el.style.display = 'none';
        }
    }
    const showElement = document.getElementById(toShow);
    if (showElement) {
        showElement.style.display = 'inherit';
    }
}
adjustVisibility(State.Loading);
const registerButton = document.getElementById('registerButton');
registerButton.onclick = async () => {
    try {
        const usernameInput = document.getElementById('registerUser');
        const passwordInput = document.getElementById('registerPassword');
        if (!usernameInput || !passwordInput) {
            console.error('Missing registerUser or registerPassword');
            return;
        }
        await mage.players.register(usernameInput.value, passwordInput.value);
        adjustVisibility(State.LoggedIn);
    }
    catch (err) {
        console.error(err);
    }
};
mage.configure(async (err) => {
    if (err) {
        console.error(err);
        return;
    }
    await mage.setupModule('session', __webpack_require__(/*! mage-sdk-js.session */ "./node_modules/mage-sdk-js.session/index.js"));
    console.log(mage);
    adjustVisibility(State.Loaded);
});


/***/ }),

/***/ "./node_modules/cachepuncher/index.js":
/*!********************************************!*\
  !*** ./node_modules/cachepuncher/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// State carries the time and bump state at a particular precision (factor)

function State(factor) {
	this.factor = factor || 1;
	this.bump = 0;
	this.time = null;
}


State.prototype.setTime = function (ts) {
	var collides = false;

	if (this.time) {
		// apply the factor and compare the timestamps for collisions

		collides = Math.floor(ts * this.factor) === Math.floor(this.time * this.factor);
	}

	this.time = ts;

	if (collides) {
		this.bump += 1;
	} else {
		this.bump = 1;
	}
};


// The Puncher class exposes the punch method and carries multiple precision states

function Puncher(defaults) {
	this.defaults = defaults;

	this.states = {
		sec: new State(0.001),
		msec: new State()
	};
}


Puncher.prototype.punch = function (options) {
	if (options) {
		if (this.defaults) {
			for (var key in this.defaults) {
				if (this.defaults.hasOwnProperty(key) && !options.hasOwnProperty(key)) {
					options[key] = this.defaults[key];
				}
			}
		}
	} else {
		options = this.defaults || {};
	}

	// pick a state based on our precision

	var state = options.msec ? this.states.msec : this.states.sec;

	// assign the current time to the state

	var now = options.now || new Date();
	var ts = now.getTime();

	state.setTime(ts);

	// generate an output string

	var out = ts;

	if (options.epoch instanceof Date) {
		out -= options.epoch.getTime();
	}

	if (!options.msec) {
		out = Math.floor(out / 1000);
	}

	if (typeof options.base === 'number') {
		out = out.toString(options.base);
	}

	out += '-' + state.bump;

	return out;
};


// Expose the default punch method

var defaultPuncher = new Puncher();

exports.punch = function (options) {
	return defaultPuncher.punch(options);
};


// A factory for new cache punchers

exports.create = function (defaults) {
	var puncher = new Puncher(defaults);

	return function (options) {
		return puncher.punch(options);
	};
};



/***/ }),

/***/ "./node_modules/events.js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/events.js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var EventEmitter = function () {
	this.eventHandlers = {};
};
EventEmitter.EventEmitter = EventEmitter;
module.exports = EventEmitter;

EventEmitter.listenerCount = function (emitter, evt) {
	var eventHandlers = emitter.eventHandlers[evt];
	return eventHandlers ? eventHandlers.length : 0;
};

EventEmitter.prototype.on = function (evt, fn) {
	if (typeof fn !== 'function') {
		console.warn('Tried to register non-function', fn, 'as event handler for event:', evt);
		return this;
	}

	this.emit('newListener', evt, fn);

	var allHandlers = this.eventHandlers;
	var evtHandlers = allHandlers[evt];
	if (evtHandlers === undefined) {
		// first event handler for this event type
		allHandlers[evt] = [fn];
		return this;
	}

	evtHandlers.push(fn);
	return this;
};

EventEmitter.prototype.addListener = EventEmitter.prototype.on;

EventEmitter.prototype.once = function (evt, fn) {
	if (!fn.once) {
		fn.once = 1;
	} else {
		fn.once += 1;
	}

	return this.on(evt, fn);
};

EventEmitter.prototype.setMaxListeners = function () {
	console.warn('Method setMaxListeners not supported, there is no limit to the number of listeners');
};

EventEmitter.prototype.removeListener = function (evt, handler) {
	// like node.js, we only remove a single listener at a time, even if it occurs multiple times

	var handlers = this.eventHandlers[evt];
	if (handlers !== undefined) {
		var index = handlers.indexOf(handler);
		if (index !== -1) {
			handlers.splice(index, 1);
			this.emit('removeListener', evt, handler);
			if (handlers.length === 0) {
				delete this.eventHandlers[evt];
			}
		}
	}
	return this;
};

EventEmitter.prototype.removeAllListeners = function (evt) {
	if (evt) {
		delete this.eventHandlers[evt];
	} else {
		this.eventHandlers = {};
	}
	return this;
};

EventEmitter.prototype.hasListeners = function (evt) {
	return (this.eventHandlers[evt] !== undefined);
};

EventEmitter.prototype.listeners = function (evt) {
	var handlers = this.eventHandlers[evt];
	if (handlers !== undefined) {
		return handlers.slice();
	}

	return [];
};

var slice = Array.prototype.slice;
EventEmitter.prototype.emit = function (evt) {

	var handlers = this.eventHandlers[evt];
	if (handlers === undefined) {
		return false;
	}

	// copy handlers into a new array, so that handler removal doesn't affect array length
	handlers = handlers.slice();

	var hadListener = false;
	var args = slice.call(arguments, 1);
	for (var i = 0, len = handlers.length; i < len; i++) {
		var handler = handlers[i];
		if (handler === undefined) {
			continue;
		}

		handler.apply(this, args);
		hadListener = true;

		if (handler.once) {
			if (handler.once > 1) {
				handler.once--;
			} else {
				delete handler.once;
			}

			this.removeListener(evt, handler);
		}
	}

	return hadListener;
};

/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "./node_modules/mage-sdk-js.session/index.js":
/*!***************************************************!*\
  !*** ./node_modules/mage-sdk-js.session/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events.js */ "./node_modules/events.js/index.js");
var mage = __webpack_require__(/*! mage-sdk-js */ "./node_modules/mage-sdk-js/index.js");

exports = module.exports = new EventEmitter();


var sessionKey;
var actorId;


function commandHook() {
	return { key: sessionKey };
}


// Some day, we'll need to deprecate actorId from this module.
// It's the login system that needs to provide an actor ID, not the session system

exports.getActorId = function () {
	return actorId;
};

exports.setActorId = function (id) {
	actorId = id;
};


exports.getKey = function () {
	return sessionKey;
};

exports.setKey = function (key) {
	if (key === sessionKey) {
		// no change
		return;
	}

	sessionKey = key;

	if (key) {
		mage.commandCenter.registerCommandHook('mage.session', commandHook);
	} else {
		mage.commandCenter.unregisterCommandHook('mage.session');
	}
};


mage.eventManager.on('session.set', function (path, info) {
	exports.setActorId(info.actorId);
	exports.setKey(info.key);
});


mage.eventManager.on('session.unset', function () {
	exports.setActorId(null);
	exports.setKey(null);
});



/***/ }),

/***/ "./node_modules/mage-sdk-js/index.js":
/*!*******************************************!*\
  !*** ./node_modules/mage-sdk-js/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Mage = __webpack_require__(/*! ./lib/Mage */ "./node_modules/mage-sdk-js/lib/Mage.js");

module.exports = new Mage();


/***/ }),

/***/ "./node_modules/mage-sdk-js/lib/CommandCenter/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/mage-sdk-js/lib/CommandCenter/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function CommandCenter(eventManager) {
	var HttpRequest = __webpack_require__(/*! ../HttpRequest */ "./node_modules/mage-sdk-js/lib/HttpRequest.js");

	this.transports = {
		http: HttpRequest
	};

	this.cmdHooks = [];

	this.queryId = 0;
	this.commandSystemStarted = false;
	this.cmdMode = 'free';
	this.simulatedTransportError = null;
	this.simulatedCommandError = null;

	this.eventManager = eventManager;
}

module.exports = CommandCenter;


// transport

CommandCenter.prototype.createTransport = function (type, options) {
	// check transport availability

	var Transport = this.transports[type];
	if (!Transport) {
		throw new Error('No transport type "' + type + '" found.');
	}

	return new Transport({
		noCache: true,
		withCredentials: options && options.cors && options.cors.credentials ? true : false
	});
};

// command center

CommandCenter.prototype.setCmdMode = function (mode) {
	if (mode !== 'free' && mode !== 'blocking') {
		throw new Error('Unrecognized command mode "' + mode + '", use "free" or "blocking".');
	}

	this.cmdMode = mode;
};


CommandCenter.prototype.registerCommandHook = function (name, fn) {
	// replace the old command hook if there is one

	for (var i = 0; i < this.cmdHooks.length; i += 1) {
		var cmdHook = this.cmdHooks[i];

		if (cmdHook.name === name) {
			cmdHook.fn = fn;
			return;
		}
	}

	// else append to the end

	this.cmdHooks.push({ name: name, fn: fn });
};


CommandCenter.prototype.unregisterCommandHook = function (name) {
	for (var i = 0; i < this.cmdHooks.length; i += 1) {
		var cmdHook = this.cmdHooks[i];

		if (cmdHook.name === name) {
			this.cmdHooks.splice(i, 1);
			return;
		}
	}
};


CommandCenter.prototype.sendCommand = function () {
	console.warn('CommandCenter#sendCommand: command system not yet set up.');
};


CommandCenter.prototype.resend = function () {
	console.warn('CommandCenter#resend: command system not yet set up.');
};


CommandCenter.prototype.discard = function () {
	console.warn('CommandCenter#discard: command system not yet set up.');
};


CommandCenter.prototype.queue = function () {
	console.warn('CommandCenter#queue: command system not yet set up.');
};


CommandCenter.prototype.piggyback = function () {
	console.warn('CommandCenter#piggyback: command system not yet set up.');
};


CommandCenter.prototype.simulateTransportError = function (type) {
	this.simulatedTransportError = type;
};

CommandCenter.prototype.simulateCommandError = function (cmdName, error) {
	this.simulatedCommandError = {
		cmdName: cmdName,
		error: error
	};
};

CommandCenter.prototype.setupCommandSystem = function (config) {
	if (this.commandSystemStarted) {
		return;
	}

	var hr = this.createTransport('http', config.httpOptions);

	var that = this;

	// if this timer is active, we're about to send batches.current (which may still grow).
	var timer = null;

	// if "streaming" is true, we will send batches.current the moment the running request returns.
	var streaming = false;

	// placeholder for unlock function, to avoid circular refs and upset jslint
	var unlock;

	var batches = {
		current: [],  // the commands we're building that will be sent _very_ soon
		sending: []   // the commands that are currently being sent
	};

	// "queueing" is true when user commands are to be stored in the current batch, and should be
	// sent off asap (through commandCenter.queue method)
	var queueing = false;

	// "piggybacking" is true when user commands are to be stored in the current batch (through
	// commandCenter.piggyback method)
	var piggybacking = false;

	// "locked" is true for as long as a queryId has not been successfully completed.
	var locked = false;


	function onCommandResponse(transportError, responses) {
		// this is the response to the request that is now in the batches.sending array
		// [
		//   [sysError] or:
		//   [null, userError] or:
		//   [null, null, response obj, events array] // where events may be left out
		// ]

		if (that.simulatedTransportError) {
			transportError = that.simulatedTransportError;
			that.simulatedTransportError = null;
		}

		if (transportError) {
			// "network": network failure (offline or timeout), retry is the only correct option
			// "busy": usually treat quietly

			return that.eventManager.emitEvent('io.error.' + transportError, {
				reason: transportError,
				info: responses
			});
		}

		// unlock the command system for the next user command(s)

		var batch = batches.sending;

		unlock();

		// from here on, handle all responses and drop the queue that we just received answers to

		that.eventManager.emitEvent('io.response');

		// handle the command responses

		for (var i = 0; i < responses.length; i += 1) {
			var response = responses[i];
			var cmd = batch[i];

			if (!cmd) {
				console.warn('No command found for response', response);
				continue;
			}

			var errorCode = response[0];
			var cmdResponse = response[1];
			var events = response[2];

			if (that.simulatedCommandError && that.simulatedCommandError.cmdName === cmd.name) {
				errorCode = that.simulatedCommandError.error;
				cmdResponse = null;
				events = null;
				that.simulatedCommandError = null;
			}

			if (events) {
				that.eventManager.emitEvents(events);
			}

			/*
			cmd = {
			  name: cmdName,
			  params: params,
			  files: files,
			  cb: cb,
			  responsePromise: responsePromise
			};
			*/

			if (!errorCode) {
				that.eventManager.emit('io.' + cmd.name, cmdResponse, cmd.params);
			}

			if (cmd.cb) {
				if (errorCode) {
					cmd.cb(errorCode);
				} else {
					cmd.cb(null, cmdResponse);
				}
			} else if (cmd.responsePromise) {
				if (errorCode) {
					cmd.responsePromise.reject(errorCode);
				} else {
					cmd.responsePromise.resolve(cmdResponse);
				}
			} else {
				throw new Error('Cannot send command response: no callback or promise found');
			}
		}
	}


	var nextFileId = 0;


	function sendBatch(batch) {
		// no need to check for locked here, since that is taken care of by the caller of sendBatch

		locked = true;
		timer = null;

		nextFileId = 0;

		var i, len;

		// prepare data extraction

		len = batch.length;

		var cmdNames = new Array(len);
		var cmdParams = new Array(len);
		var hasCallbacks = false;
		var header = [], data, files;

		for (i = 0; i < len; i += 1) {
			var cmd = batch[i];

			cmdNames[i] = cmd.name;
			cmdParams[i] = cmd.params;

			if (cmd.files) {
				if (!files) {
					files = {};
				}

				for (var fileId in cmd.files) {
					if (cmd.files.hasOwnProperty(fileId)) {
						files[fileId] = cmd.files[fileId];
					}
				}
			}

			if (cmd.cb) {
				hasCallbacks = true;
			}
		}

		data = cmdParams.join('\n');

		// execute all hooks

		for (i = 0, len = that.cmdHooks.length; i < len; i += 1) {
			var hook = that.cmdHooks[i];

			var hookOutput = hook.fn(data);
			if (hookOutput) {
				hookOutput.name = hook.name;

				header.push(hookOutput);
			}
		}

		// emit io.send event with all command names as the argument

		that.eventManager.emitEvent('io.send', cmdNames);

		// create a request

		var url = encodeURI(config.url + '/' + cmdNames.join(','));
		var urlParams = {};

		if (hasCallbacks) {
			urlParams.queryId = that.queryId;
		}

		// prepend the header before the cmd parameter data

		data = JSON.stringify(header) + '\n' + data;

		// send request to server

		if (files) {
			var FormData = window.FormData;

			if (FormData) {
				var form = new FormData();
				form.append('cmddata', data);

				for (var name in files) {
					if (files.hasOwnProperty(name)) {
						form.append(name, files[name]);
					}
				}

				data = form;
			} else {
				console.warn('window.FormData class not available, old browser?');
			}
		}


		hr.send('POST', url, urlParams, data, null, onCommandResponse);
	}


	function sendCurrentBatch() {
		batches.sending = batches.current;
		batches.current = [];

		// set streaming to false, a next user command can turn it on again

		streaming = false;

		sendBatch(batches.sending);
	}


	function scheduleCurrentBatch() {
		// - Set streaming to true, so nothing can pause us
		// - If no timer has been set yet, create a query ID, start a timer and prepare to
		//   send a new batch.

		streaming = true;

		if (locked) {
			// if the current stream is locked, the unlocking will trigger this function to be
			// called again.
			return;
		}

		if (timer === null) {
			that.queryId += 1;
			timer = window.setTimeout(sendCurrentBatch, 0);

			that.eventManager.emitEvent('io.queued', that.queryId);
		}
	}


	function resendBatch() {
		sendBatch(batches.sending);
	}


	unlock = function () {
		// discard the last sent batch

		batches.sending = [];

		locked = false;

		// if there is a batch ready to be sent again, trigger the send

		if (batches.current.length > 0 && streaming) {
			scheduleCurrentBatch();
		}
	};


	// file upload helpers

	var uploads;

	function Upload(file) {
		this.file = file;
	}

	Upload.prototype.toJSON = function () {
		// returns the ID of the file

		var id = '__file' + nextFileId;

		nextFileId += 1;

		if (!uploads) {
			uploads = {};
		}

		uploads[id] = this.file;

		return id;
	};


	var Blob = window.Blob;
	var File = window.File;
	var FileList = window.FileList;


	/**
	 * Use this method to transform a File, Blob or FileList object to an object type that commandCenter
	 * can upload. The result of this function may safely be put in of any parameter of a user
	 * command call.
	 *
	 * @param {File|Blob|FileList} file
	 * @param {boolean} silent          Set to true to suppress errors when the type doesn't match
	 * @returns {Upload|Upload[]}       An Upload instance, or an array of Upload instances
	 */

	this.transformUpload = function (file, silent) {
		if (file instanceof Blob || file instanceof File) {
			return new Upload(file);
		}

		if (file instanceof FileList) {
			var list = [];

			for (var i = 0; i < file.length; i += 1) {
				list.push(new Upload(file[i]));
			}

			return list;
		}

		if (!silent) {
			throw new TypeError('Given argument is not a Blob, File or FileList');
		}
	};


	/**
	 * This will deep-inspect any given object and transform File, Blob or FileList objects using
	 * the transformUpload method.
	 *
	 * @param {Object} obj
	 */

	this.transformEmbeddedUploads = function (obj) {
		var keys = Object.keys(obj || {});

		for (var i = 0; i < keys.length; i += 1) {
			var value = obj[keys[i]];

			if (value && typeof value === 'object') {
				var upload = this.transformUpload(value, true);

				if (upload) {
					obj[keys[i]] = upload;
				} else {
					this.transformEmbeddedUploads(obj[keys[i]]);
				}
			}
		}
	};


	this.sendCommand = function (cmdName, params, cb) {
		if (typeof cmdName !== 'string') {
			throw new TypeError('Command name is not a string: ' + cmdName);
		}

		if (params && typeof params !== 'object') {
			throw new TypeError('Command params is not an object: ' + params);
		}

		if (cb && typeof cb !== 'function') {
			throw new TypeError('Command callback is not a function: ' + cb);
		}

		// cmdName is dot notation "moduleName.commandName"

		// Serialize the params instantly, so that they may be altered right after this call without
		// affecting command execution. The uploads list should be reset before, and after
		// stringification.

		uploads = null;

		params = JSON.stringify(params);

		// If not callback-based, setup promise
		var responsePromise = {};
		var promise = null;
		if (!cb) {
			promise = new Promise(function (resolve, reject) {
				responsePromise.resolve = resolve;
				responsePromise.reject = reject;
			});
		}

		// create the command object

		var cmd = {
			name: cmdName,
			params: params,
			files: uploads,
			cb: cb,
			responsePromise: responsePromise
		};

		uploads = null;


		if (piggybacking) {
			// Add the command to the current queue, but don't start sending anything just yet.
			// The next batch that gets scheduled will take these along.

			batches.current.push(cmd);
		} else if (locked) {
			// We're currently sending, but if the next batch is accessible, we can add the command
			// to it. That way it will be sent when the open request returns.

			if (queueing || that.cmdMode === 'free') {
				// add to current batch and make sure it will be sent off

				batches.current.push(cmd);

				scheduleCurrentBatch();
			} else {
				console.warn('Could not execute user command: busy.', cmd);

				that.eventManager.emitEvent('io.error.busy', {
					reason: 'busy',
					command: cmd,
					blockedBy: batches.sending
				});
			}
		} else {
			// The command can be executed right now, so add to the current batch and make sure it
			// will be sent off

			batches.current.push(cmd);

			scheduleCurrentBatch();
		}

		return promise;
	};


	// the discard function can be called if after a transport error, when do not want to retry
	// it will unlock the command center for the next user command

	this.discard = function () {
		unlock();
		that.eventManager.emitEvent('io.discarded');
	};


	this.resend = function () {
		if (!batches.sending.length) {
			console.warn('No commands to retry. Discarding instead.');
			that.discard();
			return;
		}

		that.eventManager.emitEvent('io.resend');

		resendBatch();
	};


	this.queue = function (fn) {
		queueing = true;
		fn();
		queueing = false;
	};


	this.piggyback = function (fn) {
		piggybacking = true;
		fn();
		piggybacking = false;
	};

	this.commandSystemStarted = true;
};


/***/ }),

/***/ "./node_modules/mage-sdk-js/lib/EventManager.js":
/*!******************************************************!*\
  !*** ./node_modules/mage-sdk-js/lib/EventManager.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events.js */ "./node_modules/events.js/index.js");
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");


function EventManager() {
	EventEmitter.call(this);
}

inherits(EventManager, EventEmitter);

module.exports = EventManager;


function parsePath(path) {
	if (typeof path === 'string') {
		if (path.length === 0) {
			throw new Error('An empty path is not a valid event path');
		}

		return path.split('.');
	}

	if (Array.isArray(path)) {
		if (path.length === 0) {
			throw new Error('An empty path is not a valid event path');
		}

		// make a copy, because we'll be mutating it
		return path.slice();
	}

	throw new TypeError('An event path must be a non-empty array or a string');
}


function createPathFamily(path) {
	// longest paths first

	var family = [];

	path = parsePath(path);

	while (path.length > 0) {
		family.push(path.join('.'));
		path.pop();
	}

	return family;
}


EventManager.prototype.emitEvent = function (fullPath, params) {
	// accepts only a single params object (which may be of any type)

	var paths = createPathFamily(fullPath);

	for (var i = 0; i < paths.length; i += 1) {
		this.emit(paths[i], fullPath, params);
	}
};


EventManager.prototype.emitEvents = function (events) {
	for (var i = 0; i < events.length; i += 1) {
		var evt = events[i];

		if (evt) {
			this.emitEvent(evt[0], evt[1]); // magic array positions: path, params
		}
	}
};


/***/ }),

/***/ "./node_modules/mage-sdk-js/lib/HttpRequest.js":
/*!*****************************************************!*\
  !*** ./node_modules/mage-sdk-js/lib/HttpRequest.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cachepuncher = __webpack_require__(/*! cachepuncher */ "./node_modules/cachepuncher/index.js");
var deepCopy = __webpack_require__(/*! wizcorp-deep-copy.js */ "./node_modules/wizcorp-deep-copy.js/index.js");


function addParamsToUrl(url, params) {
	if (!params) {
		return url;
	}

	var keys = Object.keys(params);
	var count = keys.length;

	if (count === 0) {
		return url;
	}

	var splitter = url.indexOf('?') === -1 ? '?' : '&';

	for (var i = 0; i < count; i += 1) {
		var key = keys[i];

		url += splitter + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);

		splitter = '&';
	}

	return url;
}


// safe XHR data extractors (will not throw)

function getStatusCode(xhr) {
	var status;

	try {
		status = xhr.status;
	} catch (error) {
		return 0;
	}

	// IE CORS compatibility

	if (typeof status !== 'number') {
		status = 200;
	}

	return status;
}


function getResponseText(xhr) {
	var response;

	try {
		response = xhr.responseText;
	} catch (error) {
		// do nothing, we'll return undefined
	}

	return response;
}


function getContentType(xhr) {
	var type;

	try {
		type = xhr.contentType;
	} catch (error) {
		// ignore, we'll try getResponseHeader
	}

	if (!type) {
		try {
			type = xhr.getResponseHeader('content-type');
		} catch (getError) {
			// ignore, we'll return undefined
		}
	}

	return type;
}


function createCORSRequest() {
	var xhr = new XMLHttpRequest();
	if ('withCredentials' in xhr) {
		// XHR for Chrome/Firefox/Opera/Safari.
		return xhr;
	}

	if (window.XDomainRequest) {
		// XDomainRequest for IE.
		return new window.XDomainRequest();
	}

	return xhr;
}

function HttpRequest(options) {
	options = options || {};

	var xhr = createCORSRequest();

	var callback;
	var isSending = false;
	var timer;
	var FormData = window.FormData;


	this.isBusy = function () {
		return isSending;
	};


	this.send = function (method, url, params, data, headers, cb) {
		if (typeof method !== 'string') {
			throw new TypeError('method is not a string: ' + method);
		}

		if (typeof url !== 'string') {
			throw new TypeError('url is not a string: ' + url);
		}

		if (params && typeof params !== 'object') {
			throw new TypeError('params is not an object: ' + params);
		}

		if (headers && typeof headers !== 'object') {
			throw new TypeError('headers is not an object: ' + headers);
		}

		if (isSending) {
			if (cb) {
				cb('busy');
			}

			return false;
		}

		isSending = true;
		callback = cb;

		headers = headers || {};

		var m = url.match(/^[a-z]+:(\/\/)([^:]+:[^:]+)@/i);
		if (m) {
			headers.Authorization = 'Basic ' + window.btoa(m[2]);
		}

		if (params) {
			if (options.noCache) {
				params = deepCopy(params);
				params.rand = cachepuncher.punch();
			}

			url = addParamsToUrl(url, params);
		}

		xhr.open(method, url, true);

		if (options.withCredentials) {
			xhr.withCredentials = true;
		}

		if (data) {
			if (!FormData || !(data instanceof FormData)) {
				if (!headers.hasOwnProperty('content-type')) {
					var contentType;

					if (typeof data === 'string') {
						contentType = 'text/plain; charset=UTF-8';
					} else {
						contentType = 'application/json';
						data = JSON.stringify(data);
					}

					if ('setRequestHeader' in xhr) {
						xhr.setRequestHeader('content-type', contentType);
					}
				}
			}
		} else {
			data = null;
		}

		if ('setRequestHeader' in xhr) {
			for (var key in headers) {
				if (headers.hasOwnProperty(key)) {
					xhr.setRequestHeader(key, headers[key]);
				}
			}
		}

		if (options.timeout) {
			if (options.timeout < 1000) {
				throw new Error('Unreasonable timeout setting for HTTP request: ' + options.timeout + ' msec.');
			}

			timer = setTimeout(function () {
				var cb = callback;
				callback = null;

				console.warn('HTTP request timed out, aborting');

				xhr.abort();

				// in some browsers, oncomplete will now fire due to abort()
				// since callback is now null however, it will not do anything

				isSending = false;

				if (cb) {
					cb('network');
				}
			}, options.timeout);
		}

		xhr.send(data);

		return true;
	};


	this.abort = function () {
		// abort does not call any callbacks
		// useful for long polling

		callback = null;
		isSending = false;

		try {
			xhr.abort();
		} catch (abortError) {
			// ignore
			console.error(abortError);
		}
	};


	function oncomplete() {
		// possible error codes sent back to callback:
		// 'network': connection issue
		// 'maintenance': server is in maintenance

		isSending = false;

		if (!callback) {
			return;
		}

		var cb = callback;
		callback = null;

		// the two variables we'll return in the callback, possibly returned as undefined

		var error, response;

		// extract data from XHR

		var code = getStatusCode(xhr);
		var rawResponse = getResponseText(xhr);
		var contentType = getContentType(xhr);
		var codeCategory = (code / 100) >>> 0;

		// detect errors

		if (codeCategory !== 2) {
			// error situation

			if (code === 503) {
				error = 'maintenance';
			} else {
				error = 'network';
			}

			console.warn('HTTP response code:', code, 'set as error:', error);
		}

		// detect and parse response body

		if (rawResponse && contentType) {
			if (contentType.match(/^[a-z]+\/json/)) {
				try {
					response = JSON.parse(rawResponse);
				} catch (e) {
					console.warn('JSON parse error on HTTP response', e, rawResponse);

					error = error || 'server';
				}
			} else {
				response = rawResponse;
			}
		}

		cb(error, response);
	}

	function onLoad() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}

		setTimeout(function () {
			oncomplete();
		}, 0);
	}

	if ('onload' in xhr) {
		xhr.onload = onLoad;
		xhr.onerror = onLoad;
	} else {
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				onLoad();
			}
		};
	}
}

module.exports = HttpRequest;


/***/ }),

/***/ "./node_modules/mage-sdk-js/lib/Mage.js":
/*!**********************************************!*\
  !*** ./node_modules/mage-sdk-js/lib/Mage.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events.js */ "./node_modules/events.js/index.js");
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
var EventManager = __webpack_require__(/*! ./EventManager */ "./node_modules/mage-sdk-js/lib/EventManager.js");
var CommandCenter = __webpack_require__(/*! ./CommandCenter */ "./node_modules/mage-sdk-js/lib/CommandCenter/index.js");
var MsgServer = __webpack_require__(/*! ./MsgServer */ "./node_modules/mage-sdk-js/lib/MsgServer.js");
var HttpRequest = __webpack_require__(/*! ./HttpRequest */ "./node_modules/mage-sdk-js/lib/HttpRequest.js");


function MageNotConfiguredError() {
	return new Error('Please call mage.configure before calling any method');
}

function MageConfigureError(errMsg) {
	errMsg = errMsg || '';
	return new Error(
		'Failed to configure MAGE: ' + errMsg + '\n' +
		'Please ensure that:\n' +
		'1. You have a MAGE server running at the configured enpoint\n' +
		'2. You activated the config module on your MAGE server'
	);
}

function Mage() {
	EventEmitter.call(this);

	this.eventManager = new EventManager();
	this.msgServer = new MsgServer(this.eventManager);
	this.commandCenter = new CommandCenter(this.eventManager);
}

inherits(Mage, EventEmitter);

module.exports = Mage;

Mage.prototype.batchCommands = function (commands, cb) {
	if (cb && typeof cb !== 'function') {
		throw new TypeError('mage.batchCommands callback is not a function: ' + cb);
	}

	var batch = commands.map(function (command) {
		return command.catch(function (err) {
			return { data: null, error: err };
		}).then(function (res) {
			return { data: res, error: null };
		});
	});
	var promises = Promise.all(batch);

	if (cb) {
		promises.then(function (res) {
			cb(null, res);
		});
	} else {
		return promises;
	}
};

// call config.get usercommand to get client config and init mage SDK with it
//
// the usercommand is called manually because CommandCenter needs the config to setup

Mage.prototype.configure = function (cb) {
	if (!this.endpoint) {
		throw new Error('Please call mage.setEndpoint before calling mage.configure');
	}

	var that = this;
	var hr = new HttpRequest({
		noCache: true,
		withCredentials: false
	});
	var url = this.endpoint + '/' + this.appName + '/config.get';
	var data = {
		baseUrl: this.endpoint,
		appName: this.appName
	};

	data = '[]\n' + JSON.stringify(data);

	hr.send('POST', url, {}, data, null, function (err, res) {
		if (err) {
			return cb(new MageConfigureError(err));
		}

		var resData = res[0];
		var errMsg = resData[0];
		if (errMsg) {
			return cb(new MageConfigureError(errMsg));
		}

		that.setup(resData[1], cb);
	});
};

Mage.prototype.setEndpoint = function (endpoint, appName) {
	if (!appName) {
		appName = 'game';
	}

	this.endpoint = endpoint;
	this.appName = appName;
};

Mage.prototype.getClientHostBaseUrl = function () {
	return this.clientHostBaseUrl;
};


Mage.prototype.getSavvyBaseUrl = function (protocol) {
	var baseUrl = this.savvyBaseUrl;
	if (!baseUrl) {
		baseUrl = '/savvy';
	}

	if (baseUrl[0] === '/') {
		// location.origin is perfect for this, but badly supported

		baseUrl = this.savvyBaseUrl = window.location.protocol + '//' + window.location.host + baseUrl;

		console.warn('No savvy base URL configured, defaulting to:', baseUrl, '(which may not work)');
	}

	if (protocol) {
		// drop any trailing colons and slashes

		protocol = protocol.replace(/:?\/*$/, '');

		return baseUrl.replace(/^.*:\/\//, protocol + '://');
	}

	return baseUrl;
};


// expose configuration set up
// mage.configure registers the configuration and emits 'configure'

Mage.prototype.setup = function (config, cb) {
	if (!config) {
		return cb(new Error('Mage requires a configuration to be instantiated.'));
	}

	this.config = config;

	this.appName = config.appName;
	this.appVersion = config.appVersion;

	// set up server connections

	this.clientHostBaseUrl = config.baseUrl || this.endpoint;

	var server = config.server || {};

	this.savvyBaseUrl = server.savvy ? server.savvy.url : ''; // TODO: what about server.savvy.cors?

	if (server.commandCenter) {
		this.commandCenter.setupCommandSystem(server.commandCenter);
		this.setupCommandsModules(server.commandCenter.commands, function (err) {
			if (err) {
				return cb(err);
			}
		});
	}

	if (this.msgServer.setupMessageStream(server.msgStream)) {
		var that = this;

		if (this.session) {
			// Session module is created, set up the event listeners:

			// When a session key is available or changes, set the key and (re)start the message stream.
			this.eventManager.on('session.set', function (path, session) {
				that.msgServer.setSessionKey(session.key);
				that.msgServer.start();
			});

			// When a session key expires, stop the message stream.
			this.eventManager.on('session.unset', function () {
				that.msgServer.abort();
			});
		}
	}

	return cb(null);
};

Mage.prototype.isDevelopmentMode = function () {
	return this.config.developmentMode;
};


// The MAGE module system

var modules = {};

Mage.prototype.isConfigured = function () {
	return !!this.config;
};

// Call setup function from the given module

Mage.prototype.setupModule = function (name, mod) {
	mod = mod || {};
	var that = this;

	return new Promise(function (resolve, reject) {
		if (!that.isConfigured()) {
			return reject(new MageNotConfiguredError());
		}

		if (!modules.hasOwnProperty(name)) {
			return reject(new Error('Cannot configure module ' + name + '. This module has not been loaded'));
		}

		modules[name] = that[name] = Object.assign(mod, that[name]);

		if (!mod.hasOwnProperty('setup')) {
			that.emit('setup.' + name, mod);
			return resolve(mod);
		}

		mod.setup(function (error) {
			if (error) {
				return reject(error);
			}

			that.emit('setup.' + name, mod);
			return resolve(mod);
		});
	});
};

Mage.prototype.getModule = function (name) {
	return this.modules[name];
};

function createUserCommand(commandCenter, modName, cmdName, params) {
	// function name (camelCase)

	var fnName = modName + cmdName[0].toUpperCase() + cmdName.slice(1);

	// function arguments

	params = params.concat('cb');

	var args = params.join(', ');

	// expected use

	var expected = modName + '.' + cmdName + '(' + args + ')';

	// real use

	// eslint-disable-next-line no-unused-vars
	function serializeActualUse(args) {
		var result = [];

		for (var i = 0; i < args.length; i += 1) {
			var arg = args[i];

			if (typeof arg === 'function') {
				arg = 'Function';
			} else {
				arg = JSON.stringify(arg);
			}

			result.push(arg);
		}

		return modName + '.' + cmdName + '(' + result.join(', ') + ')';
	}

	// function body

	var body = [];

	body.push('fn = function ' + fnName + '(' + args + ') {');
	body.push('\tvar params = {');

	for (var i = 0; i < params.length; i += 1) {
		body.push('\t\t' + params[i] + ': ' + params[i] + (i < params.length - 1 ? ',' : ''));
	}

	body.push('\t};');
	body.push('');
	body.push('\ttry {');
	body.push('\t\treturn commandCenter.sendCommand(' + JSON.stringify(modName + '.' + cmdName) + ', params, cb);');
	body.push('\t} catch (error) {');
	body.push('\t\tconsole.warn(' + JSON.stringify('Expected use: ' + expected) + ');');
	body.push('\t\tconsole.warn("Actual use: " + serializeActualUse(arguments));');
	body.push('\t\tthrow error;');
	body.push('\t};');
	body.push('};');

	body = body.join('\n');

	var fn;

	try {
		// eslint-disable-next-line no-eval
		eval(body);
	} catch (e) {
		console.error('Error generating usercommand:', modName + '.' + cmdName);
		throw e;
	}

	return fn;
}

// Load all commands from a module
//
// It will:
// 1) Add a module object in the Mage instance
// 2) Add a function for each command in the module object
//
// Ex: command list in module player would add mage.player.list

function initModule(mage, name, cb) {
	if (!mage.isConfigured()) {
		return cb(new MageNotConfiguredError());
	} else if (mage[name]) {
		return cb(new Error('Cannot register module "' + name + '". This is a reserved name.'));
	}

	var mod = {};
	modules[name] = mage[name] = mod;

	var commands = mage.config.server.commandCenter.commands[name];

	if (commands && commands.length > 0) {
		for (var j = 0; j < commands.length; j += 1) {
			var cmd = commands[j];

			mod[cmd.name] = createUserCommand(mage.commandCenter, name, cmd.name, cmd.params || []);
		}
	}

	mage.emit('created.' + name, mod);

	return cb(null);
}

// Load all commands from client config

Mage.prototype.setupCommandsModules = function (modules, cb) {
	if (!modules) {
		return;
	}

	var modulesNames = Object.keys(modules);
	for (var i = 0; i < modulesNames.length; i += 1) {
		var moduleName = modulesNames[i];
		if (this[moduleName]) {
			continue;
		}

		initModule(this, moduleName, cb);
	}
};


/***/ }),

/***/ "./node_modules/mage-sdk-js/lib/MsgServer.js":
/*!***************************************************!*\
  !*** ./node_modules/mage-sdk-js/lib/MsgServer.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var msgStream = __webpack_require__(/*! ./messageStream */ "./node_modules/mage-sdk-js/lib/messageStream/index.js");


function MsgServer(eventManager) {
	this.futureLog = {};	// queues up events for soon or immediate emission
	this.expectedMsgId = null;
	this.stream = null;
	this.sessionKey = null;

	this.eventManager = eventManager;
}

module.exports = MsgServer;


/**
 * Queues up messages for later emission
 * @param {Object} messages
 */

MsgServer.prototype.addMessages = function (messages) {
	if (!messages) {
		return;
	}

	if (typeof messages !== 'object') {
		throw new TypeError('Messages passed must be an object');
	}

	var msgIds = Object.keys(messages);

	for (var i = 0; i < msgIds.length; i += 1) {
		var msgId = msgIds[i];
		var msgIdNum = parseInt(msgId, 10);

		// register the message into the futureLog for later emission

		this.futureLog[msgId] = messages[msgId];

		// tell the message stream it may confirm this message as delivered

		if (this.stream && this.stream.confirm) {
			this.stream.confirm(msgId);
		}

		// make sure we are expecting the lowest possible msgId first

		if (msgIdNum !== 0 && (this.expectedMsgId === null || msgIdNum < this.expectedMsgId)) {
			this.expectedMsgId = msgIdNum;
		}
	}
};


/**
 * Forgets about all currently registered messages. Required after a session key change.
 */

MsgServer.prototype.resetFutureLog = function () {
	this.expectedMsgId = null;
	this.futureLog = {};
};


MsgServer.prototype.emitEvents = function (msgId) {
	var messages = this.futureLog[msgId];

	delete this.futureLog[msgId];

	// Emit the events in the message pack.

	if (messages) {
		this.eventManager.emitEvents(messages);
	}
};


/**
 * Emits as many messages as can be emitted without creating gaps in the flow of msgId keys
 */

MsgServer.prototype.emitFutureLog = function () {
	// Keep emitting until we encounter a gap, or futureLog has simply gone empty

	while (this.expectedMsgId && this.futureLog.hasOwnProperty(this.expectedMsgId)) {
		// Early increment expectedMsgId, so that even if an event listener were to throw, the next
		// time we call emitFutureLog, we know that we won't be expecting an old ID.

		var msgId = this.expectedMsgId;

		this.expectedMsgId += 1;

		this.emitEvents(msgId);
	}

	// finally emit any events that don't have an ID and thus don't need confirmation and lack order

	if (this.futureLog.hasOwnProperty('0')) {
		this.emitEvents('0');
	}
};


/**
 * Kills the stream connection. Can be resumed later by calling start().
 */

MsgServer.prototype.abort = function () {
	if (this.stream) {
		this.stream.abort();
	}
};


/**
 * Starts or resumes (after abort() had been called) the stream connection.
 */

MsgServer.prototype.start = function () {
	if (!this.stream) {
		throw new Error('The message stream has not yet been set up');
	}

	this.stream.start();
};


/**
 * Configures the message stream's transport types
 *
 * @param {Object} cfg
 * @return {boolean}       Returns true if succeeded to set up a transport, false otherwise.
 */

MsgServer.prototype.setupMessageStream = function (cfg) {
	if (!cfg) {
		return false;
	}

	var that = this;
	var confirmIds = [];

	// instantiate the event stream if needed

	if (this.stream) {
		confirmIds = this.stream.getUnconfirmed();

		this.stream.destroy();
		this.stream = null;
	}

	var stream = msgStream.create(cfg);
	if (!stream) {
		return false;
	}

	stream.on('error', function (error) {
		console.warn('Error from message stream transport:', error);
	});

	stream.on('delivery', function (messages) {
		try {
			that.addMessages(messages);
			that.emitFutureLog();
		} catch (error) {
			console.error('Error during message stream event emission:', error);
		}
	});

	if (this.sessionKey) {
		stream.setSessionKey(this.sessionKey);
	}

	for (var i = 0; i < confirmIds.length; i += 1) {
		stream.confirm(confirmIds[i]);
	}

	this.stream = stream;

	return true;
};


MsgServer.prototype.setSessionKey = function (sessionKey) {
	if (!this.stream) {
		throw new Error('The message stream has not yet been set up');
	}

	// Make sure any lingering messages are wiped out

	if (sessionKey !== this.sessionKey) {
		this.resetFutureLog();
		this.sessionKey = sessionKey;
	}

	this.stream.setSessionKey(sessionKey);
};



/***/ }),

/***/ "./node_modules/mage-sdk-js/lib/messageStream/http.js":
/*!************************************************************!*\
  !*** ./node_modules/mage-sdk-js/lib/messageStream/http.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var HttpRequest = __webpack_require__(/*! ../HttpRequest */ "./node_modules/mage-sdk-js/lib/HttpRequest.js");
var EventEmitter = __webpack_require__(/*! events.js */ "./node_modules/events.js/index.js");
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");


function HttpPollingClient(style, cfg) {
	EventEmitter.call(this);

	var that = this;

	var hr = new HttpRequest({
		noCache: true,
		withCredentials: cfg.cors && cfg.cors.credentials ? true : false
	});

	var lastError;
	var endpoint = cfg.url;
	var confirmIds = [];
	var sessionKey;

	var afterRequestInterval = cfg.afterRequestInterval || (style === 'shortpolling' ? 5000 : 0);
	var afterErrorInterval = cfg.afterErrorInterval || 5000;

	this.isRunning = false;

	var send;


	function scheduleNext() {
		if (!that.isRunning) {
			// nothing to schedule if we've been aborted
			return;
		}

		if (lastError) {
			setTimeout(send, afterErrorInterval);
		} else {
			setTimeout(send, afterRequestInterval);
		}
	}


	function ondone(error, response) {
		if (error) {
			lastError = error;

			that.emit('error', { error: error, data: response });
		} else {
			confirmIds = [];

			if (response !== null && typeof response === 'object') {
				that.emit('delivery', response);
			}
		}

		scheduleNext();
	}


	send = function () {
		if (!that.isRunning) {
			return;
		}

		lastError = null;

		var params = {
			transport: style
		};

		if (sessionKey) {
			params.sessionKey = sessionKey;
		}

		if (confirmIds.length > 0) {
			params.confirmIds = confirmIds.join(',');
		}

		// send the request

		hr.send('GET', endpoint, params, null, null, ondone);
	};


	this.setSessionKey = function (key) {
		sessionKey = key;
	};


	this.start = function () {
		if (this.isRunning) {
			// restart, since setup has probably changed

			hr.abort();

			setTimeout(function () {
				send();
			}, 0);
		} else {
			this.isRunning = true;

			send();
		}


		return true;
	};


	this.confirm = function (msgId) {
		confirmIds.push(msgId);
	};


	this.getUnconfirmed = function () {
		return confirmIds.slice();
	};


	this.abort = function () {
		hr.abort();
		this.isRunning = false;
	};


	this.destroy = function () {
		this.abort();
		this.removeAllListeners();
	};
}

inherits(HttpPollingClient, EventEmitter);


exports.longpolling = {
	test: function (cfg) {
		return cfg.url ? true : false;
	},
	create: function (cfg) {
		return new HttpPollingClient('longpolling', cfg);
	}
};

exports.shortpolling = {
	test: function (cfg) {
		return cfg.url ? true : false;
	},
	create: function (cfg) {
		return new HttpPollingClient('shortpolling', cfg);
	}
};


/***/ }),

/***/ "./node_modules/mage-sdk-js/lib/messageStream/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/mage-sdk-js/lib/messageStream/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var transports = {
	longpolling: __webpack_require__(/*! ./http */ "./node_modules/mage-sdk-js/lib/messageStream/http.js").longpolling,
	shortpolling: __webpack_require__(/*! ./http */ "./node_modules/mage-sdk-js/lib/messageStream/http.js").shortpolling,
	websocket: __webpack_require__(/*! ./ws */ "./node_modules/mage-sdk-js/lib/messageStream/ws.js")
};


exports.transports = transports;


/**
 * Creates a stream over which we can receive messages asynchronously
 *
 * @param {Object} config     Configuration for the message stream system
 * @returns {Object}          The stream instance, or undefined if none is usable
 */

exports.create = function (config) {
	var detect = config.detect || [];

	for (var i = 0; i < detect.length; i += 1) {
		var type = detect[i];
		var cfg = config.transports[type] || {};

		var transport = transports[type];

		if (!transport) {
			console.log('Unrecognized transport type:', type, '(skipping)');
			continue;
		}

		if (transport.test(cfg)) {
			return transport.create(cfg);
		}
	}

	console.warn('Could not create any transport out of:', detect);
};



/***/ }),

/***/ "./node_modules/mage-sdk-js/lib/messageStream/ws.js":
/*!**********************************************************!*\
  !*** ./node_modules/mage-sdk-js/lib/messageStream/ws.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events.js */ "./node_modules/events.js/index.js");
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");


function normalizeWsUrl(str) {
	if (str.indexOf('http') === -1) {
		// trim left slash from str

		if (str[0] !== '/') {
			str = '/' + str;
		}

		// make a full URL

		var location = window.location;

		str = location.protocol + '//' + location.host + str;  // host includes port
	}

	// switch protocols
	return str.replace(/^http/, 'ws');
}


function WebSocketClient(cfg) {
	EventEmitter.call(this);

	var that = this;
	var ws = null;
	var isOpen = false;
	var confirmIds = [];

	var afterRequestInterval = cfg.afterRequestInterval || 100;
	var afterErrorInterval = cfg.afterErrorInterval || 5000;

	var endpoint = normalizeWsUrl(cfg.url);
	var sessionKey;


	function attemptReconnect(interval) {
		setTimeout(function () {
			that.start();
		}, interval);
	}


	this.setSessionKey = function (key) {
		sessionKey = key;
	};


	this.start = function () {
		// restart, since setup has probably changed

		this.abort();

		try {
			var url = endpoint;
			if (sessionKey) {
				if (url.indexOf('?') === -1) {
					url += '?sessionKey=' + encodeURIComponent(sessionKey);
				} else {
					url += '&sessionKey=' + encodeURIComponent(sessionKey);
				}
			}

			ws = new window.WebSocket(url);
		} catch (error) {
			// see: https://developer.mozilla.org/en-US/docs/WebSockets/Writing_WebSocket_client_applications
			console.error('Possible security violation (aborting):', error);
			return false;
		}

		ws.onopen = function () {
			isOpen = true;
		};

		ws.onmessage = function (evt) {
			var msg = evt.data;

			try {
				msg = JSON.parse(msg);
			} catch (parseError) {
				that.emit('error', parseError, msg);
				return;
			}

			for (var i = 0; i < confirmIds.length; i += 1) {
				var id = confirmIds[i];
				if (msg[id]) {
					delete msg[id];
				}
			}

			that.emit('delivery', msg);
		};

		ws.onclose = function (evt) {
			// https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
			// errors are >=1002

			isOpen = false;
			ws = null;

			if (evt.code && evt.code >= 1002) {
				that.emit('error', { error: evt.code, data: evt.reason });

				attemptReconnect(afterErrorInterval);
			} else {
				attemptReconnect(afterRequestInterval);
			}
		};

		return true;
	};


	this.confirm = function (msgId) {
		confirmIds.push(msgId);

		if (ws && isOpen) {
			ws.send(confirmIds.join(','));
			confirmIds = [];
		}
	};


	this.getUnconfirmed = function () {
		return confirmIds.slice();
	};


	this.abort = function () {
		if (ws) {
			ws.onclose = null;
			ws.close();
			ws = null;
		}

		isOpen = false;
	};


	this.destroy = function () {
		this.abort();
		this.removeAllListeners();
	};
}

inherits(WebSocketClient, EventEmitter);


exports.test = function (cfg) {
	return (cfg.url && window.WebSocket) ? true : false;
};

exports.create = function (cfg) {
	return new WebSocketClient(cfg);
};


/***/ }),

/***/ "./node_modules/wizcorp-deep-copy.js/index.js":
/*!****************************************************!*\
  !*** ./node_modules/wizcorp-deep-copy.js/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function deepCopy(obj) {
	if (!obj) {
		return obj;
	}

	if (obj instanceof Date) {
		return obj;
	}

	obj = obj.valueOf();

	var out;

	if (Array.isArray(obj)) {
		var len = obj.length;

		out = new Array(len);

		for (var i = 0; i < len; i++) {
			out[i] = deepCopy(obj[i]);
		}
	} else if (typeof obj === 'object') {
		out = {};

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				out[key] = deepCopy(obj[key]);
			}
		}
	} else {
		out = obj;
	}

	return out;
}

module.exports = deepCopy;


/***/ })

/******/ });
//# sourceMappingURL=game.js.map