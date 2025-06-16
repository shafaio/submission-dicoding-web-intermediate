import AuthHelper from "../../utils/auth-helper.js";

class StoryDetailPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  async show(id) {
    if (!AuthHelper.isAuthenticated()) {
      this.view.redirectToLogin();
      return;
    }

    try {
      const story = await this.model.getStoryById(id);
      this.view.showDetailStory(story);
    } catch (error) {
      console.log(error.message);
      this.view.showErrorMessage(error.message);
    }
  }
}

export default StoryDetailPresenter;
