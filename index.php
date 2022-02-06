<!DOCTYPE html>
<html lang="en">
<?php
@include "components/head.php";
?>

<body class="hold-transition lockscreen">
  <!-- Automatic element centering -->
  <div class="lockscreen-wrapper">
    <div class="lockscreen-logo">
      <a href="index2.html"><b>Health</b>IT</a>
    </div>
    <!-- User name -->
    <div class="lockscreen-name">Staff Login</div>

    <!-- START LOCK SCREEN ITEM -->
    <div style="padding: 10px" class="lockscreen-item">
      <!-- lockscreen image -->
      <div class="lockscreen-image">
        <img src="assets/maseno.png" alt="User Image" />
      </div>
      <!-- /.lockscreen-image -->

      <!-- lockscreen credentials (contains the form) -->
      <form id="loginForm" class="lockscreen-credentials">
        <div>
          <div class="input-group">
            <input type="text" id="doctorID" required class="form-control input-custom" placeholder="Doctor ID" />
          </div>
        </div>
        <div>
          <div class="input-group">
            <input type="password" id="doctorpass" required class="form-control input-custom" placeholder="password" />

            <div class="input-group-append">
              <button type="submit" class="btn">
                <i class="fas fa-arrow-right text-muted"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
      <!-- /.lockscreen credentials -->
    </div>
    <!-- /.lockscreen-item -->
    <div class="help-block text-center">
      Enter your password to retrieve your session
    </div>

    <div class="lockscreen-footer text-center">
      Copyright &copy; HealthIT hackathon <br />
    </div>
  </div>
  <!-- /.center -->

  <!-- jQuery -->
  <script src="plugins/jquery/jquery.min.js"></script>
  <!-- Bootstrap 4 -->
  <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>