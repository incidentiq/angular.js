'use strict';

var $eventsMinErr = minErr('$events');

/** @this */
function $EventsProvider() {


	this.$get = ['$rootScope', '$q', '$$q', '$exceptionHandler',
       function($rootScope,  $q,   $$q,   $exceptionHandler) {

	var instanceCount = 0;
	var instances = {};

    function createInstance(instanceName) {

		//increase instance count by
		var instanceIndex = ++instanceCount;

		//unique instance id
		// .. used to make sure subscription is uniquely
		instanceName = instanceName || instanceIndex.toString();

		//object with methods / properties
		var e = {

			//properties
			instanceName: instanceName,
			emitter: new EventEmitter(),

			//Private Methods

			//Public Methods
			// .. create a new instance
			$new: function(name) {
				return createInstance(name);
			},

			//destroy current instance or named instance
			$destroy: function(name) {
				delete instances[name || instanceName];
			},

			//get current instance or a named instance
			$get: function(name) {
				return instances[name || instanceName];
			},

			//add event subscribtion
			on: function(e, f) {
				return this.emitter.on(e,f);
			},

			//remove event subscription
			off: function(e, f) {
				return this.emitter.off(e,f);
			},

			//trigger event
			trigger: function(e, d) {
				return this.emitter.trigger(e,[d]);
			}

		};

		//register instance
		instances[instanceName] = e;

		//return instance
		return e;

	}

	//return default instance
	var globalEvents = createInstance('global');
	return globalEvents();

  }];
}
