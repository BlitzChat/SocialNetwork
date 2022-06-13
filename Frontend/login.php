<html>
<body>

<?php echo $_POST["username"];
  php echo $_POST["password"]; ?>

<?php
if (isset($_POST['submit'])) {
$request = 'localhost:5000/api/blitzchat/auth/login';
$response  = file_get_contents($request);
$jsonobj  = json_decode($response);
echo($response);                
}
?>


</body>
</html>