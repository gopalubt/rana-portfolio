// footer.js
export default {
  template: `
    <footer class="block">
      <div class="container">
        <div class="row text-center mb-3">
          <div class="col-12">
            <div class="mb-3 w-fit-content footer-logo-box px-3 mx-auto">
              <img src="./assets/images/logo_gsr5.png" class="img-fluid web-logo-footer" alt="Gopal Rana">
            </div>
            <h3 class="fs-xl">RANAGOPAL</h3>
          </div>
          <p class="fs-sm fw-semibold"> &copy;2024. All rights reserved by <span class="fc-primary">RanaGopal</span></p>
        </div>
      </div>
    </footer>`,
  data() {
    return {
      footer: "Ok"
    };
  },
  mounted() {
    console.log(this.footer);
  }
};
