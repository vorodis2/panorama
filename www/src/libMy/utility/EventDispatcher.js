
/**
 * Обработчик событий
 * Пример добавления в классе
 * @example ClassName.prototype = Object.assign(ClassName.prototype, EventDispatcher.prototype);
*/

function EventDispatcher () {}

Object.assign(EventDispatcher.prototype, {
	/**
	 * Подписка на события
	 * @param {string} type - тип события.
	 * @param {function} listener - функция обработчик события.
	*/
	addEventListener: function (type, listener) {

		if (this._listeners === undefined) this._listeners = {};

		var listeners = this._listeners;

		if (listeners[ type ] === undefined) {

			listeners[ type ] = [];

		}

		if (listeners[ type ].indexOf(listener) === -1) {

			listeners[ type ].push(listener);

		}

	},
	/**
	 * Проверка события
	 * @param {string} type - тип события.
	 * @return {boolean} подпи саны ли мы на конкретное событие.
	*/
	hasEventListener: function (type, listener) {

		if (this._listeners === undefined) return false;

		var listeners = this._listeners;

		return listeners[ type ] !== undefined && listeners[ type ].indexOf(listener) !== -1;

	},
	/**
	 * Отписка от события
	 * @param {string} type - тип события.
	 * @param {function} listener - функция обработчик события.
	*/
	removeEventListener: function (type, listener) {

		if (this._listeners === undefined) return;

		var listeners = this._listeners;
		var listenerArray = listeners[ type ];

		if (listenerArray !== undefined) {

			var index = listenerArray.indexOf(listener);

			if (index !== -1) {

				listenerArray.splice(index, 1);

			}

		}

	},
	/**
	 * Отписка от события
	 * @param {object} event - обьект с типом и параметрами события.
	*/
	dispatchEvent: function (event) {

		if (this._listeners === undefined) return;

		var listeners = this._listeners;
		var listenerArray = listeners[ event.type ];

		if (listenerArray !== undefined) {

			event.target = this;

			var array = listenerArray.slice(0);

			for (var i = 0, l = array.length; i < l; i++) {

				array[ i ].call(this, event);

			}

		}

	}

});
