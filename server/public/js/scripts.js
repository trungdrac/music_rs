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

    // Toast message
    const urlParams = new URLSearchParams(window.location.search);
    const success_msg = urlParams.get("s");
    const error_msg = urlParams.get("e");
    if (success_msg) toastr.success(success_msg);
    if (error_msg) toastr.error(error_msg);

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
          if (item.category) {
            item.category.map((categoryId) =>
              modal
                .find(`.modal-body option[value="${categoryId}"]`)
                .attr("selected", "selected")
            );
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
  });
})(jQuery);
