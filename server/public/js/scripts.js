(function ($) {
  "use strict";

  // Add active state to sidbar nav links
  var path = window.location.pathname;
  $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function () {
    if (this.href === `http://localhost:5000${path}`) {
      $(this).addClass("active");
    }
  });

  // Toggle the side navigation
  $("#sidebarToggle").on("click", function (e) {
    e.preventDefault();
    $("body").toggleClass("sb-sidenav-toggled");
  });

  // data tables demo
  $(document).ready(function () {
    $("#data-table").DataTable({
      language: {
        sProcessing: "Đang xử lý...",
        sLengthMenu: "Xem _MENU_ mục",
        sZeroRecords: "Không tìm thấy dòng nào phù hợp",
        sInfo: "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
        sInfoEmpty: "Đang xem 0 đến 0 trong tổng số 0 mục",
        sInfoFiltered: "(được lọc từ _MAX_ mục)",
        sInfoPostFix: "",
        sSearch: "Tìm:",
        sUrl: "",
        oPaginate: {
          sFirst: "Đầu",
          sPrevious: "Trước",
          sNext: "Tiếp",
          sLast: "Cuối",
        },
      },
      scrollX: true,
    });

    // Multiselect
    $(`#create-category-select,
       #update-category-select,
       #create-artist-select,
       #update-artist-select,
       #create-song-select,
       #update-song-select,
       #create-area-select,
       #update-area-select`).multiselect({
      templates: {
        filter: `<div class="multiselect-filter d-flex align-items-center m-2">
                  <input class="multiselect-search form-control" />
                 </div>`,
      },
      enableCaseInsensitiveFiltering: true,
      filterPlaceholder: "Tìm...",
      nonSelectedText: "Hãy lựa chọn!",
      nSelectedText: " lựa chọn",
      maxHeight: 400,
      buttonWidth: "100%",
    });

    // Validate
    Validator({
      form: "#create-category-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [Validator.isRequired("#create-name")],
    });
    Validator({
      form: "#update-category-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [Validator.isRequired("#update-name")],
    });
    Validator({
      form: "#create-area-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [Validator.isRequired("#create-name")],
    });
    Validator({
      form: "#update-area-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [Validator.isRequired("#update-name")],
    });
    Validator({
      form: "#create-song-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [
        Validator.isRequired("#create-title"),
        Validator.isRequired("#create-url"),
        Validator.isRequired("#create-image"),
        Validator.isRequired("#create-artist-select"),
        Validator.isRequired("#create-category-select"),
      ],
    });
    Validator({
      form: "#update-song-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [
        Validator.isRequired("#update-title"),
        Validator.isRequired("#update-url"),
        Validator.isRequired("#update-artist-select"),
        Validator.isRequired("#update-category-select"),
      ],
    });
    Validator({
      form: "#create-playlist-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [
        Validator.isRequired("#create-title"),
        Validator.isRequired("#create-image"),
        Validator.isRequired("#create-song-select"),
        Validator.isRequired("#create-area-select"),
      ],
    });
    Validator({
      form: "#update-playlist-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [
        Validator.isRequired("#update-title"),
        Validator.isRequired("#update-song-select"),
        Validator.isRequired("#update-area-select"),
      ],
    });
    Validator({
      form: "#create-artist-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [
        Validator.isRequired("#create-name"),
        Validator.isRequired("#create-image"),
        Validator.isRequired("#create-area-select"),
      ],
    });
    Validator({
      form: "#update-artist-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [
        Validator.isRequired("#update-name"),
        Validator.isRequired("#update-area-select"),
      ],
    });

    // Update
    $("#update").on("show.bs.modal", function (event) {
      var button = $(event.relatedTarget);
      let id = button.data("id");
      let type = button.data("type");
      fetch(`/admin/${type}/detail/${id}`)
        .then((response) => response.json())
        .then((item) => {
          var modal = $(this);
          modal.find('.modal-body input[name="name"]').val(item.name);
          modal.find('.modal-body input[name="title"]').val(item.title);
          modal.find('.modal-body input[name="url"]').val(item.url);
          modal.find('.modal-body textarea[name="lyrics"]').val(item.lyrics);
          if (item.category) {
            if (Array.isArray(item.category)) {
              item.category.map((categoryId) => {
                modal
                  .find(`.modal-body option[value="${categoryId}"]`)
                  .attr("selected", true);
              });
            } else {
              modal
                .find(`.modal-body option[value="${item.category}"]`)
                .attr("selected", true);
            }
          }
          if (item.artist) {
            item.artist.map((artistId) => {
              modal
                .find(`.modal-body option[value="${artistId}"]`)
                .attr("selected", true);
            });
          }
          if (item.song) {
            item.song.map((songId) => {
              modal
                .find(`.modal-body option[value="${songId}"]`)
                .attr("selected", true);
            });
          }
          if (item.area) {
            modal
              .find(`.modal-body option[value="${item.area}"]`)
              .attr("selected", true);
          }
          modal.find("#btn-update").on("click", function () {
            modal
              .find("form")
              .attr("action", `/admin/${type}/${item._id}/update`);
          });
        });
    });

    // Delete confirmation
    $("#delete").on("show.bs.modal", function (event) {
      var button = $(event.relatedTarget);
      let id = button.data("id");
      let type = button.data("type");
      $(this)
        .find("#btn-delete")
        .on("click", function () {
          window.location.href = `/admin/${type}/${id}/delete`;
        });
    });

    // Chart
    const ctx = document.getElementById("userChart");
    fetch(`/admin/chart-user`)
      .then((response) => response.json())
      .then((result) => {
        const months = result.map((item) => item.month);
        const counts = result.map((item) => item.count);
        const myLineChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: months,
            datasets: [
              {
                label: "Số lượng",
                lineTension: 0.3,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: counts,
              },
            ],
          },
          options: {
            scales: {
              xAxes: [
                {
                  time: {
                    unit: "date",
                  },
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    maxTicksLimit: 12,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    max: Math.max(...counts),
                    maxTicksLimit: 5,
                  },
                  gridLines: {
                    color: "rgba(0, 0, 0, .125)",
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
          },
        });
      });
  });
})(jQuery);
