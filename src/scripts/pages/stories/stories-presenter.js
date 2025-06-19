import AuthHelper from "../../utils/auth-helper.js";

class StoriesPresenter {
  constructor(view, model, indexDB) {
    this.view = view;
    this.model = model;
    this.dbModel = indexDB;
  }

  async show() {
    if (!AuthHelper.isAuthenticated()) {
      this.view.showLoginAlert();
      this.view.redirectToLogin();
      return;
    }

    try {
      const stories = await this.model.getAllStories();
      this.view.showStories(stories);
    } catch (error) {
      this.view.showErrorMessage(error.message);
    }
  }

  async clearOfflineStories() {
    await this.model.clearOfflineStories();
    this.view.showSuccessMessage("Offline stories berhasil dihapus.");
  }
}

export default StoriesPresenter;
