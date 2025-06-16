import StoriesView from "./stories-view";
import StoryModel from "./story-model";
import StoriesPresenter from "./stories-presenter";

export default class StoriesPage {
  async render() {
    return `<div id="stories-container" class="container">Loading stories...</div>`;
  }

  async afterRender() {
    const view = new StoriesView("stories-container");
    const presenter = new StoriesPresenter(view, StoryModel);

    view.onClearOffline = () => presenter.clearOfflineStories();

    await presenter.show();
  }
}
