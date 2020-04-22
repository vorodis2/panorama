/**
 * Считывает файлы
 * @class
 */
function ReaderFile () {
	var self = this;
	this.type = 'ReaderFile';

	/**
     * Cчитывается файл
     * @param {_file}
     * @param {_funOnload} - ф-я которая выполнится после загрузки файла
     * @param {_funError} - ф-я которая выполнится при ошибке загрузки
     */
	this.read = function (_file, _funOnload, _funError) {
		if (_file === undefined) return;

		var reader = new FileReader();
		reader.type = _file.type;

		reader.onload = function (e) {
			if (_funOnload) _funOnload(e);
		};

		reader.onerror = function (e) {
			if (_funError) _funError(e);
		};

		if (_file.type.indexOf('text') === 0) reader.readAsText(_file);
		else if (_file.type.indexOf('image') === 0) reader.readAsDataURL(_file);
		else if (_funError) _funError();
	};
}
