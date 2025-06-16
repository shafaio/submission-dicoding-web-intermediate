import AuthHelper from "../../utils/auth-helper.js";

class AddStoryPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.lat = null;
    this.lon = null;
    this.photoBlob = null;
  }

  async show() {
    if (!AuthHelper.isAuthenticated()) {
      this.view.showLoginAlert();
      this.view.redirectToLogin();
      return;
    }

    this.view.showForm();
    await this.view.initCamera();
    this.view.bindTakePhotoHandler((blob) => {
      this.photoBlob = blob;
    });
    this.view.bindMapClickHandler((lat, lon) => {
      this.lat = lat;
      this.lon = lon;
    });
    this.view.bindSubmitHandler(this.handleSubmit.bind(this));
  }

  async handleSubmit() {
    const description = this.view.getDescriptionValue();

    if (!this.photoBlob || this.lat === null || this.lon === null) {
      this.view.showFormError("Lengkapi semua data terlebih dahulu.");
      return;
    }

    try {
      await this.model.addNewStory({
        description,
        photo: this.photoBlob,
        lat: this.lat,
        lon: this.lon,
      });

      this.view.redirectToStories();
    } catch (err) {
      this.view.showFormError(err.message);
    }
  }
}

export default AddStoryPresenter;
