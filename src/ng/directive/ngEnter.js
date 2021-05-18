'use strict';

/**
 * @ngdoc directive
 * @name ngEnter
 * @restrict AC
 * @priority 450
 * @element ANY
 *
 * @param {expression} ngEnter {@link guide/expression Expression} to eval.
 *
 * @description
 * The `ngEnter` directive executes a command when the keydown / keypress fires for the enter key (code:13)
 *
 *
 */
var ngEnterDirective = ngDirective({
	priority: 450,
	compile: function() {
		return {
			pre: function(scope, element, attrs) {

				function fnEnterPressed(event) {
					if (event.which === 13) {
						scope.$apply(function() {
							scope.$eval(attrs.ngEnter);
						});

						event.preventDefault();
					}
				}

				element.bind('keydown keypress', fnEnterPressed);
			}
		};
	}

});
