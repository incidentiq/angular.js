'use strict';

var $eventsMinErr = minErr('$events');

/** @this */
function $EventsProvider() {


	this.$get = ['$rootScope', '$q', '$$q', '$exceptionHandler',
       function($rootScope,  $q,   $$q,   $exceptionHandler) {

	var instanceCount = 0;
	var instances = {};

	function events(instanceName) {

		//increase instance count by
		var instanceIndex = ++instanceCount;

		//unique instance id
		// .. used to make sure subscription is uniquely
		instanceName = instanceName || instanceIndex.toString();

		//is destroyed
		var isDestroyed = false;

		//Emitter Source
		var emitter = new EventEmitter();

		//object with methods / properties
		var e = {

			//properties
			instanceName: instanceName,
			emitter: emitter,

			//Public Methods
			//destroy current instance
			destroy: function() {
				isDestroyed = true;
				delete instances[instanceName];
			},

			//add event subscribtion
			on: function(e, f) {
				return emitter.on(e,f);
			},

			//remove event subscription
			off: function(e, f) {
				return emitter.off(e,f);
			},

			//trigger event
			trigger: function(e, d) {

				if (isDestroyed)
					throw new Error('This event handler has been destroyed');

				return emitter.trigger(e,[d]);
			}

		};

		//register instance
		instances[instanceName] = e;

		//return instance
		return e;

	}

	//return default instance
	var global = events('global');

	//global methods
	// .. create a new instance
	events.$new = function(name) {
		return events(name);
	};

	//destroy current instance or named instance
	events.$destroy = function(name) {
		var o = events.$get(name);
		if(o)
			o.destroy();
	};

	//get current instance or a named instance
	events.$get = function(name) {
		return instances[name];
	};

	events.on = global.on;
	events.off = global.off;
	events.trigger = global.trigger;

	
	return events;

  }];
}
