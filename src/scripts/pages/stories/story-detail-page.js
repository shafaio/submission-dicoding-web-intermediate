import StoryDetailView from "./story-detail-view";
import StoryModel from "./story-model";
import StoryDetailPresenter from "./story-detail-presenter";

export default class StoryDetailPage {
  async render() {
    return `<div id="story-detail-container">Loading story...</div>`;
  }

  async afterRender(params) {
    const { id } = params;
    const view = new StoryDetailView("story-detail-container");

    const presenter = new StoryDetailPresenter(view, StoryModel);
    await presenter.show(id);
  }
}
