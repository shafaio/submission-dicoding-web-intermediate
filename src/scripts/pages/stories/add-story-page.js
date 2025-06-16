import AddStoryView from "./add-story-view";
import StoryModel from "./story-model";
import AddStoryPresenter from "./add-story-presenter";

export default class AddStoryPage {
  async render() {
    return `<div id="add-story-container">loading</div>`;
  }

  async afterRender() {
    const view = new AddStoryView("add-story-container");
    const presenter = new AddStoryPresenter(view, StoryModel);
    await presenter.show();
  }
}
