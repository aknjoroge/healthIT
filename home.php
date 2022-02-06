<!DOCTYPE html>
<html lang="en">
<?php
@include "components/head.php";
@include "components/security.php";
?>



<body class="hold-transition sidebar-mini">
  <div class="wrapper">
    <!-- Navbar -->
    <?php
    @include "components/navBar.php";
    @include "components/sideBar.php";
    ?>
    <!-- /.navbar -->

    <span id="homeIdentifier"></span>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Statisctical Data</h1>
            </div>
            <!-- /.col -->

            <!-- /.col -->
          </div>
          <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <div class="content">
        <div class="container-fluid">
          <div class="row">

            <div class="col-md-6">
              <div class="card p-4 text-center bg-info text-light">
                <div class="card-body">
                  <h5 class="card-title">Female Samples</h5>
                  <h2 id="totalfemale" class="card-text">00 </h2>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card p-4 text-center bg-info text-light">
                <div class="card-body">
                  <h5 class="card-title">Male Samples </h5>
                  <h2 id="totalmale" class="card-text">00 </h2>
                </div>
              </div>
            </div>




            <!--Item-->
            <div class="col-lg-6">
              <div class="card">
                <div class="card-header border-0">
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title">Bioline SD Male collection table</h3>

                  </div>
                </div>
                <div class="card-body">
                  <div class="d-flex">
                    <p class="d-flex flex-column">
                      <span id="totalmaleSamples" class="text-bold text-lg">820</span>
                      <span>Total Collected</span>
                      <span>Age / Number</span>
                    </p>
                    <p class="ml-auto d-flex flex-column text-right">
                      <span id="startsmaleNumber" class="text-success">
                        <i class="fas fa-arrow-up"></i> 12.5%
                      </span>
                      <span class="text-muted">Since The start</span>
                    </p>
                  </div>
                  <!-- /.d-flex -->

                  <div>
                    <canvas id="maleTable"></canvas>
                  </div>



                </div>
              </div>
              <!-- /.card -->

              <!-- /.card -->
            </div>
            <!--END Item-->

            <!--Item-->
            <div class="col-lg-6">
              <div class="card">
                <div class="card-header border-0">
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title">Bioline SD FeMale collection table</h3>

                  </div>
                </div>
                <div class="card-body">
                  <div class="d-flex">
                    <p class="d-flex flex-column">
                      <span id="totalfemaleSamples" class="text-bold text-lg">820</span>
                      <span>Total Collected</span>
                      <span>Age / Number</span>
                    </p>
                    <p class="ml-auto d-flex flex-column text-right">
                      <span id="startsfemaleNumber" class="text-success">
                        <i class="fas fa-arrow-up"></i> 12.5%
                      </span>
                      <span class="text-muted">Since The start</span>
                    </p>
                  </div>
                  <!-- /.d-flex -->

                  <div>
                    <canvas id="femaleTable"></canvas>
                  </div>



                </div>
              </div>
              <!-- /.card -->

              <!-- /.card -->
            </div>
            <!--END Item-->



            <!--Item-->
            <div class="col-lg-6">
              <div class="card">
                <div class="card-header border-0">
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title">Bioline SD FeMale positiveSamples table</h3>

                  </div>
                </div>
                <div class="card-body">
                  <div class="d-flex">
                    <p class="d-flex flex-column">
                      <span id="totalpositivefemaleSamples" class="text-bold text-lg">820</span>
                      <span>Total Positive</span>
                      <span>Age / Number</span>
                    </p>
                    <p class="ml-auto d-flex flex-column text-right">
                      <span id="startspositivefemaleNumber" class="text-success">
                        <i class="fas fa-arrow-up"></i> 12.5%
                      </span>
                      <span class="text-muted">Since The start</span>
                    </p>
                  </div>
                  <!-- /.d-flex -->

                  <div>
                    <canvas id="femalepositiveTable"></canvas>
                  </div>



                </div>
              </div>
              <!-- /.card -->

              <!-- /.card -->
            </div>
            <!--END Item-->

            <!--Item-->
            <div class="col-lg-6">
              <div class="card">
                <div class="card-header border-0">
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title">Bioline SD Male positiveSamples table</h3>

                  </div>
                </div>
                <div class="card-body">
                  <div class="d-flex">
                    <p class="d-flex flex-column">
                      <span id="totalpositivemaleSamples" class="text-bold text-lg">820</span>
                      <span>Total Positive</span>
                      <span>Age / Number</span>
                    </p>
                    <p class="ml-auto d-flex flex-column text-right">
                      <span id="startspositivemaleNumber" class="text-success">
                        <i class="fas fa-arrow-up"></i> 12.5%
                      </span>
                      <span class="text-muted">Since The start</span>
                    </p>
                  </div>
                  <!-- /.d-flex -->

                  <div>
                    <canvas id="malepositiveTable"></canvas>
                  </div>



                </div>
              </div>
              <!-- /.card -->

              <!-- /.card -->
            </div>
            <!--END Item-->

            <!--Item-->
            <div class="col-lg-6">
              <div class="card">
                <div class="card-header border-0">
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title">Male Bar Data
                      <br />
                      <span>Number / Age</span>
                    </h3>


                  </div>
                </div>
                <div class="card-body">

                  <!-- /.d-flex -->

                  <div>
                    <canvas id="barOneTable"></canvas>
                  </div>



                </div>
              </div>
              <!-- /.card -->

              <!-- /.card -->
            </div>
            <!--END Item-->
            <!--Item-->
            <div class="col-lg-6">
              <div class="card">
                <div class="card-header border-0">
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title">Female Bar Data
                      <br />
                      <span>Number / Age</span>
                    </h3>


                  </div>
                </div>
                <div class="card-body">

                  <!-- /.d-flex -->

                  <div>
                    <canvas id="barTwoTable"></canvas>
                  </div>



                </div>
              </div>
              <!-- /.card -->

              <!-- /.card -->
            </div>
            <!--END Item-->
            <!--Item-->
            <div class="col-lg-6">
              <div class="card">
                <div class="card-header border-0">
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title"> Male Infection Stats </h3>

                  </div>
                </div>
                <div class="card-body">

                  <!-- /.d-flex -->

                  <div>
                    <canvas id="dognuts"></canvas>
                  </div>



                </div>
              </div>
              <!-- /.card -->

              <!-- /.card -->
            </div>
            <div class="col-lg-6">
              <div class="card">
                <div class="card-header border-0">
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title"> Female Infection Stats </h3>

                  </div>
                </div>
                <div class="card-body">

                  <!-- /.d-flex -->

                  <div>
                    <canvas id="dognutsfemale"></canvas>
                  </div>



                </div>
              </div>
              <!-- /.card -->

              <!-- /.card -->
            </div>
            <!--END Item-->

          </div>
          <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->

    <!-- Main Footer -->
    <?php
    @include "components/footer.php";
    @include "components/modals.php";

    ?>
  </div>
  <!-- ./wrapper -->

  <?php
  @include "components/scripts.php";

  ?>
</body>

</html>