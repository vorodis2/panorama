<?php
/*
  -------------------------------------------------
  php_libmail v 1.6.0 (09.12.2011) webi.ru
  Универсальный PHP класс для отправки почты
  Может отправлять почту через smtp(используя сокеты), либо через стандартную функцию mail()
  http://webi.ru/webi_files/php_libmail.html
  adm@webi.ru
  -----------------------
  Разработку начал Leo West - lwest@free.fr
  продолжил webi.ru
  по всем вопросам пишите на adm@webi.ru
  ________________________________________________

  Что нового:

  Версия 1.6.0 (09.12.2011)
  Добавлена возможность добавлять имена к почтовым ящикам
  Действует в From, To и ReplyTo
  Имя добавляется через разделитель ';' например
  $m->To( "Максим;adm@webi.ru" );

  -------------------------------------------
  Версия 1.5.1 (07.02.2011)
  Модернизация функции проверки email адресов на валидность под php 5.2 и выше.

  -------------------------------------------
  Версия 1.5 (28.02.2010)
  Добавлена поддержка отправки почты с помощью SMTP

  -------------------------------------------
  Версия 1.4 (24.02.2010)

  адаптация к русской кодировке
  кодировку теперь нужно указывать не в теле письма как было раньше, а при инициализации класса например $m= new Mail('windows-1251');
  если не указывать кодировку, по умолчанию будет windows-1251
  --
  изменено прикрепление файлов.
  добавил новый параметр, имя файла.
  теперь прикрепляя файл ему можно дать другое имя. это полезно, когда прикрепляете временные файлы загруженные через upload, так как их имена не соотвествуют реальным.
  пример 	$m->Attach( "/toto.gif", "asd.gif" "image/gif" )
  если не указывать новое имя, берется имя из пути прикрепляемого файла
  --
  добавлена возможность отправлять письма в формате html
  _______________________________________________


  пример

  include "libmail.php";

  $m= new Mail('windows-1251');  // можно сразу указать кодировку, можно ничего не указывать ($m= new Mail;)
  $m->From( "Сергей;asd@asd.com" ); // от кого Можно использовать имя, отделяется точкой с запятой
  $m->ReplyTo( 'Сергей Вадимыч;replay@bk.ru' ); // куда ответить, тоже можно указать имя
  $m->To( "kuda@asd.ru" );   // кому, в этом поле так же разрешено указывать имя
  $m->Subject( "тема сообщения" );
  $m->Body("Сообщение. Текст письма");
  $m->Cc( "kopiya@asd.ru");  // кому отправить копию письма
  $m->Bcc( "skritaya_kopiya@asd.ru"); // кому отправить скрытую копию
  $m->Priority(4) ;	// установка приоритета
  $m->Attach( "/toto.gif", "", "image/gif" ) ;	// прикрепленный файл типа image/gif. типа файла указывать не обязательно
  $m->smtp_on("smtp.asd.com","login","passw", 25, 10); // используя эу команду отправка пойдет через smtp
  $m->Send();	// отправка
  echo "Письмо отправлено, вот исходный текст письма:<br><pre>", $m->Get(), "</pre>";

  Подробные инструкции читайте на сайте http://webi.ru/webi_files/php_libmail.html

 */

/**
 * Универсальный PHP класс для отправки почты.
 * Может отправлять почту через smtp (используя сокеты), либо через стандартную функцию mail().
 * 
 * @link http://lwest.free.fr/doc/php/lib/index.php3?page=mail&lang=en Оригинальная версия
 * @link https://github.com/zoer/php-libmail GitHub
 */
class Mail {
    /**
      @var array Массивы адресов - кому отправить.
     */
    private $sendto = array();

    /**
      @var array
     */
    private $acc = array();

    /**
      @var array
     */
    private $abcc = array();

    /**
      @var array Прикрепляемые файлы
     */
    private $aattach = array();

    /**
      @var array Массив заголовков
     */
    private $xheaders = array();

    /**
      @var array Приоритеты
     */
    private $priorities = array('1 (Highest)', '2 (High)', '3 (Normal)', '4 (Low)', '5 (Lowest)');

    /**
      @var string Кодировка текста по умолчанию
     */
    private $charset = "windows-1251";

    /**
      @var string Кодировка вложений по умолчанию
     */
    private $ctencoding = "8bit";

    /**
      @var int Получить уведомление о прочтении
     */
    private $receipt = 0;

    /**
      @var string Формат письма, по умолчанию текстовый
     */
    private $text_html = "text/plain";

    /**
      @var boolean Отправка через smtp, по умолчанию выключена
     */
    private $smtp_on = false;

    /**
      @var array Имена для email адресов, чтобы делать вид ("сергей" <asd@wer.re>)
     */
    private $names_email = array();

    const TYPE_ATTACH   = "attachment";
    const TYPE_INLINE   = "inline";

    const MIME_JPEG     = "image/jpeg";
    const MIME_GIF      = "image/gif";
    const MIME_PNG      = "image/png";
    const MIME_UNKNOWN  = "application/octet-stream";
    
    private $mime_types = array(
        'jpg'  => Mail::MIME_JPEG,
        'jpeg' => Mail::MIME_JPEG,
        'gif'  => Mail::MIME_GIF,
        'png'  => Mail::MIME_PNG
    );
    
    /**
     * Универсальный PHP класс для отправки почты.
     * @param string $charset Кодировка письма
     */
    function Mail($charset = "") {
        $this->autoCheck(true);
        $this->boundary = "--" . md5(uniqid("myboundary"));

        if ($charset != "") {
            $this->charset = strtolower($charset);
            if ($this->charset == "us-ascii")
                $this->ctencoding = "7bit";
        }
    }

    /**
     * Включение и выключение проверки валидности email.
     * По умолчанию проверка включена.
     * <pre>
     * // проверка влючена
     * $m->autoCheck( true );
     * </pre>
     * @param boolean $bool 
     */
    function autoCheck($bool) {
        if ($bool)
            $this->checkAddress = true;
        else
            $this->checkAddress = false;
    }

    /**
     * Указываем тему письма.
     * @param string $subject Тема письма
     */
    function Subject($subject) {
        $this->xheaders['Subject'] = "=?"
            . $this->charset . "?Q?"
            . str_replace("+", "_", str_replace("%", "=", urlencode(strtr($subject, "\r\n", "  ")))
            )
            . "?=";
    }

    /**
     * Отправитель письма.
     * @param string $from Адрес отправителя
     */
    function From($from) {

        if (!is_string($from)) {
            echo "ошибка, From должен быть строкой";
            exit;
        }
        $temp_mass = explode(';', $from); // разбиваем по разделителю для выделения имени
        if (count($temp_mass) == 2) { // если удалось разбить на два элемента
            $this->names_email['from'] = $temp_mass[0]; // имя первая часть
            $this->xheaders['From'] = $temp_mass[1]; // адрес вторая часть
        } else { // и если имя не определено
            $this->names_email['from'] = '';
            $this->xheaders['From'] = $from;
        }
    }

    /**
     * На какой адрес отвечать.
     * @param string $from Адрес для ответа
     */
    function ReplyTo($address) {

        if (!is_string($address))
            return false;

        $temp_mass = explode(';', $address); // разбиваем по разделителю для выделения имени

        if (count($temp_mass) == 2) { // если удалось разбить на два элемента
            $this->names_email['Reply-To'] = $temp_mass[0]; // имя первая часть
            $this->xheaders['Reply-To'] = $temp_mass[1]; // адрес вторая часть
        } else { // и если имя не определено
            $this->names_email['Reply-To'] = '';
            $this->xheaders['Reply-To'] = $address;
        }
    }

    /**
     * Добавление заголовка для получения уведомления о прочтении. 
     * обратный адрес берется из "From" (или из "ReplyTo" если указан)
     */
    function Receipt() {
        $this->receipt = 1;
    }

    /**
     * Указываем адрес получателя или имя + адрес в формате 
     * "Иван Иванов;ivanov@mail.ru". Может быть указан массив адресов,
     * в таком случае перебираем массив адресов для отправки. 
     *
     * @param string $to Адрес для отправки (может быть указан массив).
     */
    function To($to) {
        if (is_array($to)) {
            foreach ($to as $value) {
                // разбиваем по разделителю для выделения имени
                $temp_mass = explode(';', $value);
                // если удалось разбить на два элемента
                if (count($temp_mass) == 2) {
                    // ключи и значения одинаковые, чтобы исключить дубли адресов
                    $this->smtpsendto[$temp_mass[1]] = $temp_mass[1];
                    // имя первая часть
                    $this->names_email['To'][$temp_mass[1]] = $temp_mass[0];
                    $this->sendto[] = $temp_mass[1];
                }
                // и если имя не определено
                else {
                    // ключи и значения одинаковые, чтобы исключить дубли адресов
                    $this->smtpsendto[$value] = $value;
                    // имя первая часть
                    $this->names_email['To'][$value] = '';
                    $this->sendto[] = $value;
                }
            }
        } else {
            $temp_mass = explode(';', $to);

            if (count($temp_mass) == 2) {
                $this->sendto[] = $temp_mass[1];
                $this->smtpsendto[$temp_mass[1]] = $temp_mass[1];
                $this->names_email['To'][$temp_mass[1]] = $temp_mass[0];
            } else {
                $this->sendto[] = $to;
                $this->smtpsendto[$to] = $to;
                $this->names_email['To'][$to] = '';
            }
        }

        if ($this->checkAddress == true)
            $this->CheckAdresses($this->sendto);
    }

    /**
     * Установка заголовка CC (открытая копия, все получатели будут видеть куда ушла копия).
     * @param string $cc Адреса email, массив или строка
     */
    function Cc($cc) {
        if (is_array($cc)) {
            $this->acc = $cc;

            foreach ($cc as $value) {
                $this->smtpsendto[$value] = $value;
            }
        } else {
            $this->acc[] = $cc;
            $this->smtpsendto[$cc] = $cc;
        }

        if ($this->checkAddress == true)
            $this->CheckAdresses($this->acc);
    }

    /**
     * Установка заголовка Bcc (скрытая копия, не будет помещать заголовок, кому ушло письмо).
     * @param string $bcc Адреса email, массив или строка
     */
    function Bcc($bcc) {
        if (is_array($bcc)) {
            $this->abcc = $bcc;
            foreach ($bcc as $value) {
                $this->smtpsendto[$value] = $value;
            }
        } else {
            $this->abcc[] = $bcc;
            $this->smtpsendto[$bcc] = $bcc; // ключи и значения одинаковые, чтобы исключить дубли адресов
        }

        if ($this->checkAddress == true)
            $this->CheckAdresses($this->abcc);
    }

    /**
     * Установка текста сообщения.
     * @param string $format В каком формате будет письмо, в тексте или html. 
     *      По умолчанию стоит текст
     */
    function Body($body, $format = "") {
        $this->body = $body;

        if ($format == "html")
            $this->text_html = "text/html";
    }

    /**
     * Устанавливает заголовок организации.
     * @param string $org Название организации
     */
    function Organization($org) {
        if (trim($org != ""))
            $this->xheaders['Organization'] = $org;
    }

    /**
     * Устанавливает приоритет сообщения.
     * @param int $priority Число от 1 (высокий приоритет) до 5 (низкий)
     */
    function Priority($priority) {
        if (!intval($priority))
            return false;

        if (!isset($this->priorities[$priority - 1]))
            return false;

        $this->xheaders["X-Priority"] = $this->priorities[$priority - 1];

        return true;
    }

    /**
     * Прикрепление файла.
     * @param string $filepath
     *      Путь к файлу, который надо отправить
     * @param string $filename 
     *      Имя файла для сохранения
     * @param string $disposition 
     *      Инструкция почтовому клиенту, как отображать прикрепленный файл:
     *      как часть письма ("inline") или как прикрепленный файл ("attachment")
     * @param string $filetype 
     *      MIME-тип файла. По умолчанию 'application/octet-stream'
     */
    function Attach($filepath, $filename = "", $disposition = null, $filetype = null) {
        $this->aattach[] = $filepath;
        $this->webi_filename[] = $filename;
        $this->adispo[] = ($disposition !== null) ? $disposition : Mail::TYPE_ATTACH;
        $this->actype[] = ($filetype !== null) ? $filetype : $this->getFileType($filepath);
    }

    /**
     * Определение MIME-типа по расширению. Если тип определить не удаётся,
     * возвращает 'application/octet-stream'.
     * @param string $path Путь к файлу
     * @return string MIME-тип файла
     */
    private function getFileType($path) {
        $fext = pathinfo($path, PATHINFO_EXTENSION);
        
        if(array_key_exists($fext, $this->mime_types)) {
            return $this->mime_types[$fext];
        }
        elseif (function_exists("finfo_open")) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimetype = finfo_file($finfo, $path);
            finfo_close($finfo);
            return $mimetype;
        }
        elseif(function_exists("mime_content_type")){
            return mime_content_type($path);
        }
        else {
            return Mail::MIME_UNKNOWN;
        }
    }
    
    /**
     * Собираем письмо для отправки.
     */
    function BuildMail() {

        $this->headers = "";

        // создание заголовка TO.
        // добавление имен к адресам
        foreach ($this->sendto as $value) {

            if (strlen($this->names_email['To'][$value]))
                $temp_mass[] = "=?" . $this->charset . "?Q?" . str_replace("+", "_", str_replace("%", "=", urlencode(strtr($this->names_email['To'][$value], "\r\n", "  ")))) . "?= <" . $value . ">";
            else
                $temp_mass[] = $value;
        }
        // этот заголовок будет не нужен при отправке через mail()
        $this->xheaders['To'] = implode(", ", $temp_mass);

        if (count($this->acc) > 0)
            $this->xheaders['CC'] = implode(", ", $this->acc);

        // этот заголовок будет не нужен при отправке через smtp
        if (count($this->abcc) > 0)
            $this->xheaders['BCC'] = implode(", ", $this->abcc);


        if ($this->receipt) {
            if (isset($this->xheaders["Reply-To"]))
                $this->xheaders["Disposition-Notification-To"] = $this->xheaders["Reply-To"];
            else
                $this->xheaders["Disposition-Notification-To"] = $this->xheaders['From'];
        }

        if ($this->charset != "") {
            $this->xheaders["Mime-Version"] = "1.0";
            $this->xheaders["Content-Type"] = $this->text_html . "; charset=$this->charset";
            $this->xheaders["Content-Transfer-Encoding"] = $this->ctencoding;
        }

        $this->xheaders["X-Mailer"] = "Php_libMail_v_1.5(webi.ru)";

        // вставаляем файлы
        if (count($this->aattach) > 0) {
            $this->_build_attachement();
        } else {
            $this->fullBody = $this->body;
        }



        // создание заголовков если отправка идет через smtp
        if ($this->smtp_on) {

            // разбиваем (FROM - от кого) на юзера и домен. домен понадобится в заголовке
            $user_domen = explode('@', $this->xheaders['From']);

            $this->headers = "Date: " . date("D, j M Y G:i:s") . " +0700\r\n";
            $this->headers .= "Message-ID: <" . rand() . "." . date("YmjHis") . "@" . $user_domen[1] . ">\r\n";


            reset($this->xheaders);
            while (list( $hdr, $value ) = each($this->xheaders)) {
                if ($hdr == "From" and strlen($this->names_email['from']))
                    $this->headers .= $hdr . ": =?" . $this->charset . "?Q?" . str_replace("+", "_", str_replace("%", "=", urlencode(strtr($this->names_email['from'], "\r\n", "  ")))) . "?= <" . $value . ">\r\n";
                elseif ($hdr == "Reply-To" and strlen($this->names_email['Reply-To']))
                    $this->headers .= $hdr . ": =?" . $this->charset . "?Q?" . str_replace("+", "_", str_replace("%", "=", urlencode(strtr($this->names_email['Reply-To'], "\r\n", "  ")))) . "?= <" . $value . ">\r\n";
                elseif ($hdr != "BCC")
                    $this->headers .= $hdr . ": " . $value . "\r\n"; // пропускаем заголовок для отправки скрытой копии
            }
        }
        // создание заголовоков, если отправка идет через mail()
        else {
            reset($this->xheaders);
            while (list( $hdr, $value ) = each($this->xheaders)) {
                if ($hdr == "From" and strlen($this->names_email['from']))
                    $this->headers .= $hdr . ": =?" . $this->charset . "?Q?" . str_replace("+", "_", str_replace("%", "=", urlencode(strtr($this->names_email['from'], "\r\n", "  ")))) . "?= <" . $value . ">\r\n";
                elseif ($hdr == "Reply-To" and strlen($this->names_email['Reply-To']))
                    $this->headers .= $hdr . ": =?" . $this->charset . "?Q?" . str_replace("+", "_", str_replace("%", "=", urlencode(strtr($this->names_email['Reply-To'], "\r\n", "  ")))) . "?= <" . $value . ">\r\n";
                elseif ($hdr != "Subject" and $hdr != "To")
                    $this->headers .= "$hdr: $value\n"; // пропускаем заголовки кому и тему... они вставятся сами
            }
        }
    }

    /**
     * Включение отправки через smtp используя сокеты,
     * после запуска этой функции отправка через smtp включена.
     * Для отправки через защищенное соединение сервер нужно указывать 
     * с добавлением "ssl://" например так "ssl://smtp.gmail.com"
     * @param type $smtp_serv
     * @param type $login
     * @param type $pass
     * @param type $port
     * @param type $timeout
     */
    function smtp_on($smtp_serv, $login, $pass, $port = 25, $timeout = 5) {
        $this->smtp_on = true; // включаем отправку через smtp

        $this->smtp_serv = $smtp_serv;
        $this->smtp_login = $login;
        $this->smtp_pass = $pass;
        $this->smtp_port = $port;
        $this->smtp_timeout = $timeout;
    }

    function get_data($smtp_conn) {
        $data = "";
        while ($str = fgets($smtp_conn, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) == " ") {
                break;
            }
        }
        return $data;
    }

    /**
     * Отправка письма.
     * @return boolean
     */
    function Send() {
        $this->BuildMail();
        $this->strTo = implode(", ", $this->sendto);

        // если отправка без использования smtp
        if (!$this->smtp_on) {
            $res = @mail($this->strTo, $this->xheaders['Subject'], $this->fullBody, $this->headers);
            if (!$res)
                return false;
            else
                return true;
        }
        else { // если через smtp
            if (!$this->smtp_serv OR !$this->smtp_login OR !$this->smtp_pass OR !$this->smtp_port)
                return false; // если нет хотя бы одного из основных данных для коннекта, выходим с ошибкой




                
// разбиваем (FROM - от кого) на юзера и домен. юзер понадобится в приветсвии с сервом
            $user_domen = explode('@', $this->xheaders['From']);


            $this->smtp_log = '';
            $smtp_conn = fsockopen($this->smtp_serv, $this->smtp_port, $errno, $errstr, $this->smtp_timeout);
            if (!$smtp_conn) {
                $this->smtp_log .= "Соединение с сервером не прошло (ошибка $errno: $errstr)\n\n";
                fclose($smtp_conn);
                return false;
            }

            $this->smtp_log .= $data = $this->get_data($smtp_conn) . "\n";

            fputs($smtp_conn, "EHLO " . $user_domen[0] . "\r\n");
            $this->smtp_log .= "Я: EHLO " . $user_domen[0] . "\n";
            $this->smtp_log .= $data = $this->get_data($smtp_conn) . "\n";
            $code = substr($data, 0, 3); // получаем код ответа

            if ($code != 250) {
                $this->smtp_log .= "ошибка приветсвия EHLO \n";
                fclose($smtp_conn);
                return false;
            }

            fputs($smtp_conn, "AUTH LOGIN\r\n");
            $this->smtp_log .= "Я: AUTH LOGIN\n";
            $this->smtp_log .= $data = $this->get_data($smtp_conn) . "\n";
            $code = substr($data, 0, 3);

            if ($code != 334) {
                $this->smtp_log .= "сервер не разрешил начать авторизацию \n";
                fclose($smtp_conn);
                return false;
            }

            fputs($smtp_conn, base64_encode($this->smtp_login) . "\r\n");
            $this->smtp_log .= "Я: " . base64_encode($this->smtp_login) . "\n";
            $this->smtp_log .= $data = $this->get_data($smtp_conn) . "\n";

            $code = substr($data, 0, 3);
            if ($code != 334) {
                $this->smtp_log .= "ошибка доступа к такому юзеру\n";
                fclose($smtp_conn);
                return false;
            }


            fputs($smtp_conn, base64_encode($this->smtp_pass) . "\r\n");
            //$this->smtp_log .="Я: ". base64_encode($this->smtp_pass)."\n"; // тут пароль закодирован будет виден в логах
            $this->smtp_log .="Я: parol_skryt\n"; // а так пароль скрыт в логах
            $this->smtp_log .= $data = $this->get_data($smtp_conn) . "\n";

            $code = substr($data, 0, 3);
            if ($code != 235) {
                $this->smtp_log .= "не правильный пароль\n";
                fclose($smtp_conn);
                return false;
            }

            fputs($smtp_conn, "MAIL FROM:<" . $this->xheaders['From'] . "> SIZE=" . strlen($this->headers . "\r\n" . $this->fullBody) . "\r\n");
            $this->smtp_log .= "Я: MAIL FROM:<" . $this->xheaders['From'] . "> SIZE=" . strlen($this->headers . "\r\n" . $this->fullBody) . "\n";
            $this->smtp_log .= $data = $this->get_data($smtp_conn) . "\n";

            $code = substr($data, 0, 3);
            if ($code != 250) {
                $this->smtp_log .= "сервер отказал в команде MAIL FROM\n";
                fclose($smtp_conn);
                return false;
            }



            foreach ($this->smtpsendto as $keywebi => $valuewebi) {
                fputs($smtp_conn, "RCPT TO:<" . $valuewebi . ">\r\n");
                $this->smtp_log .= "Я: RCPT TO:<" . $valuewebi . ">\n";
                $this->smtp_log .= $data = $this->get_data($smtp_conn) . "\n";
                $code = substr($data, 0, 3);
                if ($code != 250 AND $code != 251) {
                    $this->smtp_log .= "Сервер не принял команду RCPT TO\n";
                    fclose($smtp_conn);
                    return false;
                }
            }

            fputs($smtp_conn, "DATA\r\n");
            $this->smtp_log .="Я: DATA\n";
            $this->smtp_log .= $data = $this->get_data($smtp_conn) . "\n";

            $code = substr($data, 0, 3);
            if ($code != 354) {
                $this->smtp_log .= "сервер не принял DATA\n";
                fclose($smtp_conn);
                return false;
            }

            fputs($smtp_conn, $this->headers . "\r\n" . $this->fullBody . "\r\n.\r\n");
            $this->smtp_log .= "Я: " . $this->headers . "\r\n" . $this->fullBody . "\r\n.\r\n";

            $this->smtp_log .= $data = $this->get_data($smtp_conn) . "\n";

            $code = substr($data, 0, 3);
            if ($code != 250) {
                $this->smtp_log .= "ошибка отправки письма\n";
                fclose($smtp_conn);
                return false;
            }

            fputs($smtp_conn, "QUIT\r\n");
            $this->smtp_log .="QUIT\r\n";
            $this->smtp_log .= $data = $this->get_data($smtp_conn) . "\n";
            fclose($smtp_conn);
            return true;
        }
    }

    /**
     * Выводит содержимое сообщения.
     * @return string
     */
    function Get() {
        if (isset($this->smtp_log)) {
            if ($this->smtp_log) {
                return $this->smtp_log; // если есть лог отправки smtp выведем его
            }
        }

        $this->BuildMail();
        $mail = $this->headers . "\n\n";
        $mail .= $this->fullBody;
        return $mail;
    }

    /**
     * Проверка корректности адреса email.
     * @param type $address Адрес для проверки
     * @return boolean
     */
    function ValidEmail($address) {
        // если существует современная функция фильтрации данных, 
        // то проверять будем этой функцией. появилась в php 5.2
        if (function_exists('filter_list')) {
            $valid_email = filter_var($address, FILTER_VALIDATE_EMAIL);
            if ($valid_email !== false)
                return true;
            else
                return false;
        }
        // а если php еще старой версии, то проверка валидности пойдет старым способом
        else {
            if (ereg(".*<(.+)>", $address, $regs)) {
                $address = $regs[1];
            }
            if (ereg("^[^@  ]+@([a-zA-Z0-9\-]+\.)+([a-zA-Z0-9\-]{2}|net|com|gov|mil|org|edu|int)\$", $address))
                return true;
            else
                return false;
        }
    }

    /**
     * Проверка массива адресов email.
     * @param array $aad Адреса для проверки
     */
    function CheckAdresses($aad) {
        for ($i = 0; $i < count($aad); $i++) {
            if (!$this->ValidEmail($aad[$i])) {
                echo "ошибка : не верный email " . $aad[$i];
                exit;
            }
        }
    }

    /**
     * Сборка файлов для отправки.
     */
    private function _build_attachement() {
        $this->xheaders["Content-Type"] = "multipart/mixed;\n boundary=\"$this->boundary\"";
        $this->fullBody = "This is a multi-part message in MIME format.\n--$this->boundary\n";
        $this->fullBody .= "Content-Type: " . $this->text_html . "; charset=$this->charset\nContent-Transfer-Encoding: $this->ctencoding\n\n" . $this->body . "\n";

        $sep = chr(13) . chr(10);

        $ata = array();
        $k = 0;

        // перебираем файлы
        for ($i = 0; $i < count($this->aattach); $i++) {
            $filename = $this->aattach[$i];
            // имя файла, которое может приходить в класс, и имеет другое имя файла
            $webi_filename = $this->webi_filename[$i];
            // если есть другое имя файла, то оно будет таким
            if (strlen($webi_filename))
                $basename = basename($webi_filename);
            // а если нет другого имени файла, то имя будет выдернуто из самого загружаемого файла
            else
                $basename = basename($filename);
            // content-type
            $ctype = $this->actype[$i];
            $disposition = $this->adispo[$i];

            if (!file_exists($filename)) {
                echo "ошибка прикрепления файла : файл $filename не существует";
                exit;
            }
            $subhdr = "--$this->boundary\nContent-type: $ctype;\n name=\"$basename\"\nContent-Transfer-Encoding: base64\nContent-Disposition: $disposition;\n  filename=\"$basename\"\n";
            $ata[$k++] = $subhdr;
            // non encoded line length
            $linesz = filesize($filename) + 1;
            $fp = fopen($filename, 'r');
            $ata[$k++] = chunk_split(base64_encode(fread($fp, $linesz)));
            fclose($fp);
        }
        $this->fullBody .= implode($sep, $ata);
    }
    
}

?>
